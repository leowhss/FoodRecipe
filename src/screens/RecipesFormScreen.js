import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [recipeName, setTitle] = useState(recipeToEdit ? recipeToEdit.recipeName : "");
  const [recipeImage, setImage] = useState(recipeToEdit ? recipeToEdit.recipeImage : "");
  const [recipeDescription, setDescription] = useState(recipeToEdit ? recipeToEdit.recipeDescription : "");

  const [recipeIngredients, setIngredients] = useState(recipeToEdit ? recipeToEdit.recipeIngredients : "");
  const [recipeInstructions, setInstructions] = useState(recipeToEdit ? recipeToEdit.recipeInstructions : "");

  const saverecipe = async () => {
    try {
      //New recipe object
      const newrecipe = { recipeName, recipeImage, recipeDescription, idFood: recipeToEdit?.idFood || Date.now().toString() };

      //Getting the custom recipes from storage
      const storedData = await AsyncStorage.getItem("customrecipes");
      
      //If stored data exist then saves it into recipes as an object, otherwise, it saves an empty array
      let recipes = storedData ? JSON.parse(storedData) : [];

      //If there is a recipe coming from the prop it triggers the update
      if (recipeToEdit) {
        
        const index = recipes.findIndex(recipe => recipe.recipeName === recipeToEdit.recipeName);

        // console.log("recipeIndex >")
        // console.log(recipeToEdit.idFood);
        // console.log(index);

        // console.log("save_recipe >>");
        // console.log({recipeToEdit})

        recipeToEdit.recipeName = recipeName;
        recipeToEdit.recipeImage = recipeImage;
        recipeToEdit.recipeDescription = recipeDescription;
        recipeToEdit.recipeIngredients = recipeIngredients;
        recipeToEdit.recipeInstructions = recipeInstructions;

        recipes[index] = recipeToEdit;

        console.log("Edited recipes");
        console.log(recipes);

        //else it pushes a new one in the array  
      } else {
        recipes.push(newrecipe);
      }
      //Saves recipes in storage
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));

      navigation.goBack();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  console.log("view_recipe >>");
  console.log(recipeToEdit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <TextInput
        placeholder="Title"
        value={recipeName}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.title}>Image</Text>
      <TextInput
        placeholder="Image URL"
        value={recipeImage}
        onChangeText={setImage}
        style={styles.input}
      />

      {recipeImage ? (
          <Image source={{ uri: recipeImage }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
        )}

      <Text style={styles.title}>Description</Text>
      <TextInput
        placeholder="Description"
        value={recipeDescription}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />

      <Text style={styles.title}>Ingredients List</Text>
      <TextInput
        placeholder="Ingredients"
        value={recipeIngredients}
        onChangeText={setIngredients}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]} 
      />        

      <Text style={styles.title}>Step-by-step Instructions</Text>
      <TextInput
        placeholder="Instructions"
        value={recipeInstructions}
        onChangeText={setInstructions}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]} 
      />     

      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  title: {
    fontWeight: "bold",
  },
  input: {
    // marginTop: hp(4),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
