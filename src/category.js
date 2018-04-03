import React, { Component } from "react";
import { HashRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCategory, createProduct } from "./store";
const Category = ({
  category,
  products,
  matchingProducts,
  deleteCategory,
  createProduct,
  history
}) => {
  return (
    <div>
      <h1>{category ? category.name : null}</h1>
      <button
        onClick={() => {
          deleteCategory(category.id);
          history.push("/");
        }}
      >
        Delete domain
      </button>
      <button onClick={() => createProduct(category.id)}>Create user</button>
      <br />
      <br />
      {category ? matchingProducts(products) : null}
    </div>
  );
};

const mapStateToProps = (
  { categories, products },
  category,
  matchingProducts
) => {
  const id = location.hash.slice(location.hash.lastIndexOf("/") + 1);
  category = categories.find(category => category.id === id * 1);

  matchingProducts = products =>
    products.map(product => {
      if (product.categoryId === category.id) {
        return <li key={product.id}>{product.name}</li>;
      }
    });

  return {
    categories,
    products,
    category,
    matchingProducts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: id => {
      dispatch(deleteCategory(id));
    },
    createProduct: id => {
      dispatch(createProduct(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
