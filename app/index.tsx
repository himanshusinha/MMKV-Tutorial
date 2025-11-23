import React, { useEffect } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { createMMKV, useMMKVNumber, useMMKVString } from "react-native-mmkv";

type User = {
  username: string;
  age: number;
};

const storage = createMMKV({
  id: "custom-storage",
});

export default function Index() {
  const [name, setName] = useMMKVString("user.name");
  const [age, setAge] = useMMKVNumber("user.age");
  useEffect(() => {
    const user: User = { username: "Marc", age: 21 };
    storage.set("user", JSON.stringify(user));
  }, []);

  const addData = (): void => {
    console.log("Data added");

    const newUser: User = { username: "Bob", age: 33 };
    storage.set("user", JSON.stringify(newUser));

    setName("Bob");
    setAge(33);
  };

  const getData = (): void => {
    const jsonUser = storage.getString("user");
    console.log("JSON User =", jsonUser);

    if (!jsonUser) {
      Alert.alert("Error", "No user found in storage");
      return;
    }

    // Keys
    const containsNameKey = storage.contains("user.name");
    const keys = storage.getAllKeys();

    console.log("All Keys =", keys);
    console.log("Contains user.name =", containsNameKey);
    console.log("MMKV state values =", name, age);

    // Parse object
    const userObj: User = JSON.parse(jsonUser);
    console.log("Parsed object =", userObj);

    // Remove specific key
    storage.remove("user.name");
    console.log("Removed key: user.name");

    Alert.alert(
      "Data from storage",
      `JSON: ${jsonUser}\nUser: ${userObj.username} (${userObj.age})`
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Add Data" onPress={addData} />
      <Button title="Get Data" onPress={getData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
