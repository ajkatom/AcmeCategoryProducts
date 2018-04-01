import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Products from "./Products";
import Categories from "./categories";
import { createCategory } from "./store";

const Nav = ({ products, category, categories, createCategory }) => {
  return (
    <div>
      <ul>
        <li>
          <button onClick={() => createCategory()}>Create Category</button>
        </li>
        <li>
          <NavLink to="./api/products">
            total products({products.length})
          </NavLink>
        </li>
        {category(categories)}
      </ul>
    </div>
  );
};
const mapStateToProps = ({ products, categories }) => {
  const category = categories =>
    categories.map(category => {
      let counter = products.filter(product => {
        return product.categoryId === category.id;
      });

      return (
        <li key={category.id}>
          <NavLink to={`api/categories/${category.id}`}>
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
