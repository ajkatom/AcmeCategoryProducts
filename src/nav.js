import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createCategory } from "./store";

const Nav = ({ products, category, categories, createCategory }) => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to={"/"}>
            <h1>Home</h1>
          </NavLink>
        </li>
        <li>
          <button onClick={() => createCategory()}>Create Domain</button>
        </li>

        <li>
          <NavLink to={"/api/products"}>
            total domains({products.length})
          </NavLink>
        </li>
        {category(categories, products)}
      </ul>
    </div>
  );
};
const mapStateToProps = ({ products, categories }) => {
  const category = () =>
    categories.map(category => {
      let counter = products.filter(product => {
        return product.categoryId === category.id;
      });
      return (
        <li key={category.id}>
          <NavLink to={`/api/categories/${category.id}`}>
            {category.name}({counter.length})
          </NavLink>
        </li>
      );
    });

  return {
    products,
    categories,
    category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: () => {
      dispatch(createCategory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
