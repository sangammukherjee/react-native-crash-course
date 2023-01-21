import { useContext, useEffect, useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet, View } from "react-native";
import ProductItem from "../../components/productitem";
import { useNavigation } from '@react-navigation/native';
import { Context } from "../../context";

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Products() {
  const navigation = useNavigation()
  const {loading,products} = useContext(Context)

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size={"large"} color="red" />
    );
  }

  function onPressProductTileView(getId) {
    navigation.navigate("productDetails", {
      productId: getId,
    })
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            onPress={() => onPressProductTileView(itemData.item.id)}
            title={itemData.item.title}
            bgColor = {getRandomColor()}
          />
        )}
        keyExtractor={(itemData) => itemData.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
