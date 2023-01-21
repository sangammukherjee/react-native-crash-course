import { useContext } from "react";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { Context } from "../../context";

function FavoriteItem({ title, reason , id, removeToFavorites}) {
  return (
    <View style={styles.favoriteItemContainer}>
      <Pressable onPress={()=>removeToFavorites(id)}>
        <Text style={styles.favoriteItemText}>{title}</Text>
        <Text style={styles.favoriteItemText}>{reason}</Text>
      </Pressable>
    </View>
  );
}

export default function Favorites() {
  const {removeToFavorites, favorites } = useContext(Context);

  console.log(favorites.length, "hello");

  if (!favorites.length) {
    return (
      <View style={styles.noFavorites}>
        <Text style={styles.noFavoritesText}>No Favorites Added !</Text>
      </View>
    );
  }

  return (
    <View style={styles.favoriteContainer}>
      <FlatList
        data={favorites}
        renderItem={(itemData) => (
          <FavoriteItem
            title={itemData.item.title}
            reason={itemData.item.reason}
            id={itemData.item.id}
            removeToFavorites={removeToFavorites}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteContainer: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  noFavorites: {
    padding: 20,
    alignItems: "center",
  },
  favoriteItemContainer: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#0f0782",
    marginBottom: 10,
  },
  favoriteItemText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  noFavoritesText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
