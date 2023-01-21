import { createContext, Fragment, useEffect, useState } from "react";

export const Context = createContext(null);

const initialState = {
  favoriteProducts: [],
};

const ProductContext = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getProducts() {
      const apiRes = await fetch("https://dummyjson.com/products");
      const finalProducts = await apiRes.json();

      if (finalProducts) {
        setLoading(false);
        setProducts(finalProducts.products);
      }
    }

    getProducts();
  }, []);

  const addToFavorites = (getProductId, reason) => {
    let cpyFavorites = [...favorites];
    const index = favorites.findIndex((item) => item.id === getProductId);

    console.log(index);

    if (index === -1) {
      const filteredItem = products.find((item) => item.id === getProductId);
      cpyFavorites.push({
        title: filteredItem.title,
        reason,
        id : getProductId
      });
    } else {
      cpyFavorites[index] = {
        ...cpyFavorites[index],
        reason
      }
    }

    setFavorites(cpyFavorites);
  };

  const removeToFavorites = (getCurrentId)=>{
    let updateFavorites = [...favorites]

    updateFavorites = updateFavorites.filter(favoriteItem=>favoriteItem.id !== getCurrentId)
    setFavorites(updateFavorites)
  }

  return (
    <Context.Provider
      value={{ favorites, addToFavorites, removeToFavorites, favorites, products, loading }}
    >
      {children}
    </Context.Provider>
  );
};

export default ProductContext;
