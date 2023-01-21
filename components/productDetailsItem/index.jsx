import { View,StyleSheet ,Text} from "react-native";

export default function ProductDetailsItem({ productDetails }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productDetails.title}</Text>
      <Text style={styles.title}>{productDetails.description}</Text>
      <Text style={styles.title}>{productDetails.price}</Text>
      <Text style={styles.title}>{productDetails.rating}</Text>
      <Text style={styles.title}>{productDetails.category}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container : {
        padding: 30,
        paddingHorizontal :  15,
        borderWidth : 1,
        margin: 10,
        borderColor : '#88da9e'
    },
    title : {
        color : '#ffffff',
        fontSize : 20,
        paddingBottom : 10
    }
})
