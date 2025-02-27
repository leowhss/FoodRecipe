// HomeScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Import your Recipes component
import Recipes from "../components/recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Chicken");

  // Two extra categories to display at the front
  const [extraCategories] = useState([
    {
      idCategory: "0",
      strCategory: "My Food",
      strCategoryThumb:
        "https://images.unsplash.com/photo-1611057224146-fb2b6b61f07f?q=80&w=600&auto=format&fit=crop",
    },
    {
      idCategory: "0.1",
      strCategory: "My Favorites",
      strCategoryThumb:
        "https://cdn-icons-png.flaticon.com/512/2107/2107952.png",
    },
  ]);

  // Your existing categories
  const [categories, setCategories] = useState([
    {
      idCategory: "1",
      strCategory: "Beef",
      strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
    },
    {
      idCategory: "2",
      strCategory: "Chicken",
      strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png",
    },
    {
      idCategory: "3",
      strCategory: "Dessert",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/dessert.png",
    },
    {
      idCategory: "4",
      strCategory: "Lamb",
      strCategoryThumb: "https://www.themealdb.com/images/category/lamb.png",
    },
    {
      idCategory: "5",
      strCategory: "Miscellaneous",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/miscellaneous.png",
    },
    {
      idCategory: "6",
      strCategory: "Pasta",
      strCategoryThumb: "https://www.themealdb.com/images/category/pasta.png",
    },
    {
      idCategory: "7",
      strCategory: "Pork",
      strCategoryThumb: "https://www.themealdb.com/images/category/pork.png",
    },
    {
      idCategory: "8",
      strCategory: "Seafood",
      strCategoryThumb: "https://www.themealdb.com/images/category/seafood.png",
    },
    {
      idCategory: "9",
      strCategory: "Side",
      strCategoryThumb: "https://www.themealdb.com/images/category/side.png",
    },
    {
      idCategory: "10",
      strCategory: "Starter",
      strCategoryThumb: "https://www.themealdb.com/images/category/starter.png",
    },
    {
      idCategory: "11",
      strCategory: "Vegan",
      strCategoryThumb: "https://www.themealdb.com/images/category/vegan.png",
    },
    {
      idCategory: "12",
      strCategory: "Vegetarian",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/vegetarian.png",
    },
    {
      idCategory: "13",
      strCategory: "Breakfast",
      strCategoryThumb:
        "https://www.themealdb.com/images/category/breakfast.png",
    },
    {
      idCategory: "14",
      strCategory: "Goat",
      strCategoryThumb:
        "https://images.unsplash.com/photo-1619711667542-c049700dd9e0?q=80&w=1888&auto=format&fit=crop",
    },
  ]);

  // Combine the two arrays: My Food, My Favorites, then all categories
  const combinedCategories = [...extraCategories, ...categories];

  // All your food data
  const [allFood, setAllFood] = useState([
    {
      category: "Beef",
      idFood: "1",
      idCategory: "1",
      recipeName: "Beef and Mustard Pie",
      recipeInstructions:
        "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef ... etc.",
      recipeImage:
        "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?q=80&w=1887&auto=format&fit=crop",
      recipeId: "beef_01",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "British",
      cookingDescription:
        "Preheat the oven to 150C/300F/Gas 2. Toss the beef ...",
      recipeTags: "Meat,Pie",
      ingredients: [
        { ingredientName: "Beef", measure: "1kg" },
        { ingredientName: "Plain Flour", measure: "2 tbs" },
        { ingredientName: "Rapeseed Oil", measure: "2 tbs" },
        // ... more ingredients ...
      ],
    },
    {
      category: "Beef",
      idFood: "2",
      idCategory: "1",
      recipeInstructions: "Add'l ingredients: mayonnaise, siracha...",
      recipeName:
        "Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber",
      recipeImage:
        "https://images.unsplash.com/photo-1676300185292-e23bb3db50fa?q=80&w=2070&auto=format&fit=crop",
      recipeId: "beef_02",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "Vietnamese",
      cookingDescription:
        "In a medium bowl, toss cucumber with vinegar ...",
      recipeTags: "Rice,Bowl",
      ingredients: [
        { ingredientName: "Ground Beef", measure: "500g" },
        { ingredientName: "Rice", measure: "200g" },
        // ... more ingredients ...
      ],
    },
    // ... more beef items ...
    {
      category: "Chicken",
      idFood: "7",
      idCategory: "2",
      recipeInstructions: "To make Chicken Curry, heat 2 tablespoons of oil ...",
      recipeName: "Chicken Curry",
      recipeImage:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop",
      recipeId: "chicken_01",
      recipeCategory: "Chicken",
      recipeOrigin: "Indian",
      cookingDescription: "Cook chicken with spices, tomatoes, and onions ...",
      recipeTags: "Spicy,Curry",
      ingredients: [
        { ingredientName: "Chicken", measure: "500g" },
        { ingredientName: "Onions", measure: "2 chopped" },
        // ... more ingredients ...
      ],
    },
    // ... more chicken items ...
  ]);

  // Filter foods by the active category
  const filteredFoods = allFood.filter(
    (food) => food.category === activeCategory
  );

  // Handle category selection
  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        testID="scrollContainer"
      >
        {/* Header with avatar and greeting */}
        <View style={styles.headerContainer} testID="headerContainer">
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
            }}
            style={styles.avatar}
          />
          <Text style={styles.greetingText}>Hello, User!</Text>
        </View>

        {/* Title text */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Make your own food,</Text>
          <Text style={styles.subtitle}>
            stay at <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        {/* Horizontal Category List */}
        <View testID="categoryList" style={styles.categoryScrollContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {combinedCategories.map((cat) => {
              const isActive = cat.strCategory === activeCategory;
              return (
                <TouchableOpacity
                  key={cat.idCategory}
                  onPress={() => handleChangeCategory(cat.strCategory)}
                  style={styles.categoryItem}
                >
                  <View
                    style={[
                      styles.categoryImageWrapper,
                      isActive && styles.categoryImageWrapperActive,
                    ]}
                  >
                    <Image
                      source={{ uri: cat.strCategoryThumb }}
                      style={styles.categoryImage}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryName,
                      isActive && styles.categoryNameActive,
                    ]}
                  >
                    {cat.strCategory}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Pass the filtered foods and categories to the Recipes component */}
        <View testID="foodList" style={styles.foodList}>
          <Recipes foods={filteredFoods} categories={combinedCategories} />
        </View>
      </ScrollView>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // white
  },
  scrollContainer: {
    paddingBottom: 50,
    paddingTop: hp(14), // pt-14
  },
  headerContainer: {
    marginHorizontal: wp(4), // mx-4
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  greetingText: {
    fontSize: hp(1.7),
    color: "#52525B", // neutral-600
    fontWeight: "600", // font-semibold
    backgroundColor: "#F3F4F6", // gray-100
    paddingHorizontal: wp(2), // px-2
    paddingVertical: hp(0.5), // py-1
    borderRadius: 9999, // full rounded
    textAlign: "center",
  },
  titleContainer: {
    marginHorizontal: wp(4), // mx-4
    marginBottom: hp(2), // mb-2
  },
  title: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  highlight: {
    color: "#F59E0B", // amber-400
  },

  // Horizontal category scroll
  categoryScrollContainer: {
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  categoryItem: {
    alignItems: "center",
    marginRight: wp(4),
  },
  categoryImageWrapper: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    backgroundColor: "#F3F4F6", // gray-100
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB", // gray-200
  },
  categoryImageWrapperActive: {
    borderColor: "#F59E0B",
    borderWidth: 2,
  },
  categoryImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  categoryName: {
    marginTop: hp(0.5),
    fontSize: hp(1.7),
    color: "#52525B",
  },
  categoryNameActive: {
    color: "#F59E0B",
    fontWeight: "600",
  },

  // Food list container
  foodList: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
});
