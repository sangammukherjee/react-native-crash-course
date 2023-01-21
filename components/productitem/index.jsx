import { Pressable, Text, View, StyleSheet } from "react-native";

export default function ProductItem({ title, onPress, bgColor }) {
  return (
    <View style={styles.productItemContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ced474" }}
        style={{ ...styles.pressableView, backgroundColor: bgColor }}
      >
        <View style={styles.productInnerContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  productItemContainer: {
    flex: 1,
    margin: 16,
    height: 160,
    borderRadius: 8,
    elevation: 5,
  },
  pressableView: {
    flex: 1,
  },
  productInnerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color : "#000"
  },
});
