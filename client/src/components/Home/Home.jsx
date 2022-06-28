import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar";
import SignIn from "../user/Login";
import SignUp from "../user/Register";
import Cart from "../Cart/Cart";
import ItemListContainer from "../Items/ItemListContainer";
import ItemDetailContainer from "../Items/ItemDetailContainer";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Typography variant="h1" component="div" align="center" gutterBottom>
              ECODERCE
            </Typography>
          }
        />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/products" element={<ItemListContainer />} />
        <Route path="/products/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Home;
