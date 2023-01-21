import { useEffect, useState, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Button,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Context } from "../../context";
import ProductDetailsItem from "../../components/productDetailsItem";

export default function ProductDetails() {
  const { addToFavorites, favorites } = useContext(Context);
  const route = useRoute();
  const navigation = useNavigation();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState({});
  const productId = route.params.productId;

  const isItemAlreadyAddedInFavorites =
    favorites && favorites.length > 0
      ? favorites.filter((item) => item.id === productId)
      : false;

  useEffect(() => {
    setLoading(true);
    async function getProducts() {
      const apiRes = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await apiRes.json();

      if (data) {
        setLoading(false);
        setProductDetails(data);
      }
    }

    getProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            color={"#000"}
            onPress={() => setModalVisible(true)}
            title={
              isItemAlreadyAddedInFavorites &&
              isItemAlreadyAddedInFavorites.length > 0
                ? "Update favorite"
                : "Add favorite"
            }
          />
        );
      },
    });
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size={"large"} color="red" />
    );
  }

  function handleAddReason(enteredText) {
    setReason(enteredText);
  }

  return (
    <View>
      <ProductDetailsItem productDetails={productDetails} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              value={reason}
              placeholder="Why You Like This Product ?"
              onChangeText={handleAddReason}
              style={styles.input}
            />
            <View style={styles.btnWrapper}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  addToFavorites(productId, reason);
                  setModalVisible(!modalVisible);
                }}
                disabled={reason === ""}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 1,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: 300,
    height: 300,
    justifyContent: "center",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 1,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#000",
    marginRight: 5,
  },
  buttonClose: {
    backgroundColor: "#f32136",
    marginLeft: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderRadius: 1,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
