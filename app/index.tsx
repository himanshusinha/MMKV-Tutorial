import React from "react";
import { Alert, Button, View } from "react-native";
import { createMMKV, useMMKVNumber, useMMKVString } from "react-native-mmkv";

type User = {
  username: string;
  age: number;
};

export default function Index() {
  const [name, setName] = useMMKVString("user.name");
  const [age, setAge] = useMMKVNumber("user.age");

  const storage = createMMKV({
    id: "custom-storage",
  });

  const user: User = {
    username: "Marc",
    age: 21,
  };
  storage.set("user", JSON.stringify(user));
  const addData = (): void => {
    console.log("Data added");

    const newUser: User = { username: "Bob", age: 33 };
    storage.set("user", JSON.stringify(newUser));

    setName("Bob");
    setAge(33);
  };

  const getData = (): void => {
    const jsonUser = storage.getString("user");
    console.log(jsonUser, "JSON User");
    console.log(name, age);
    if (!jsonUser) {
      Alert.alert("Error", "No user found in storage");
      return;
    }

    const userObj: User = JSON.parse(jsonUser);
    console.log(userObj, "Parse userObj");

    Alert.alert(
      "Data from storage",
      `User JSON: ${jsonUser}\nParsed User: ${userObj.username}, Age: ${userObj.age}`
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Add Data" onPress={addData} />
      <Button title="Get Data" onPress={getData} />
    </View>
  );
}
