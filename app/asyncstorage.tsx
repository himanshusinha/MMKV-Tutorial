import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// save data as Object
let names: { name: string; age: number } = {
  name: "Himanshu Sinha",
  age: 24,
};

const AsyncStorageScreen: React.FC = () => {
  const [data, setData] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("data", JSON.stringify(names));
      console.log("Saved");
    } catch (e) {
      console.log(e, "Error save data");
    }
  };

  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("data");

      if (storedData) {
        const obj = JSON.parse(storedData);

        // Forced ordered logs
        console.log("name:", obj.name);
        console.log("age:", obj.age);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log(error, "Error get data");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        value={data}
        onChangeText={(value) => setData(value)}
        placeholder="Enter your data"
      />

      <TouchableOpacity style={styles.buttonStyle} onPress={saveData}>
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle} onPress={getData}>
        <Text style={styles.buttonText}>Get Data</Text>
      </TouchableOpacity>

      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    width: "80%",
    backgroundColor: "green",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    width: "80%",
  },
});

export default AsyncStorageScreen;
