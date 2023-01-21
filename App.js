import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import Products from "./screens/products";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "./screens/productDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Favorites from "./screens/favorites";
import ProductContext from "./context";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="productList"
        options={{
          title: "Product List",
        }}
        component={Products}
      />
      <Tab.Screen name="favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#fff",
              },
              contentStyle: {
                backgroundColor: "#220577dd",
              },
            }}
          >
            <Stack.Screen
              name="allProducts"
              component={Tabs}
              options={{ headerShown: false, title: "All Products" }}
            />
            <Stack.Screen
              options={{
                title: "Product Details"
              }}
              name="productDetails"
              component={ProductDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ProductContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
