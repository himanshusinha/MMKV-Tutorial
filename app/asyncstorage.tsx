import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AsyncStorageScreen: React.FC = () => {
  const [data, setData] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("name", "himanshu");
      console.log("Saved");
    } catch (e) {
      console.log(e, "Error save data");
    }
  };

  const getData = async () => {
    try {
      const values = await AsyncStorage.getItem("name");
      const obj = JSON.stringify(values);
      console.log(obj);
    } catch (error) {
      console.log(error, "Error get data");
    }
  };

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem("name");
      setData("");
      console.log("remove data");
    } catch (error) {}
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
      <TouchableOpacity style={styles.buttonStyle} onPress={deleteData}>
        <Text style={styles.buttonText}>Delete Data</Text>
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
