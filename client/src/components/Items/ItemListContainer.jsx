import React from "react";
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import Loader from "../utils/Loader";
import axios from "axios";

// const URL = "http://localhost:8080/graphql";
const API_URL = "http://localhost:8080/api/products";
// const FAKE_API = "https://fakestoreapi.com/products"

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
      
  // API
useEffect(() => {
  setIsLoading(true)
  axios.get(`${API_URL}`)
    .then(({data}) => {
        setItems(data);
        setIsLoading(false)
      }
    )
  }, []);

  // GRAPHQL
  // useEffect(() => {

  //   axios
  //     .post(
  //       URL,
  //       {
  //         query: `
  //           query {
  //             getAllProducts {
  //               id,
  //               title,
  //               price,
  //               thumbnail
  //             }
  //           }
  //         `
  //       },
  //       { headers: { "Content-Type": "application/json" } }
  //     )
  //     .then(({ data }) => {
  //       const products = data.data.getAllProducts;
  //       setItems(products);   
  //       console.log(products)         
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // console.log(items)

  if (isLoading) {
    return <Loader />
  }

  if (!isLoading) {
    return <ItemList items={items} isLoading={isLoading} />
  }
};

export default ItemListContainer;


      


    // // Fakestore
    //   useEffect(() => {
    //     axios.get(FAKE_API)
    //       .then(({data}) => {
    //         setItems(data);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }, []);