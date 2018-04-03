import React from "react";
import { connect } from "react-redux";
import { deleteProduct } from "./store";

const Products = ({ products, categories, deleteProduct }) => {
  return (
    <div>
      <ul>
        {products.map(product => {
          const category = categories.filter(
            category => category.id === product.categoryId
          );
          return (
            <li key={product.id}>
              {product.name}
              <button onClick={() => deleteProduct(product.id)}>
                Delete User
              </button>
              <br />
              {category.length ? category[0].name : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ products, categories }) => {
  // product = products.map(product => {
  //   const category = categories.filter(
  //     category => category.id === product.categoryId
  //   );
  //   return (
  //     <li key={product.id}>
  //       {product.name}
  //       <button onClick={() => deleteProduct(product.id)}>Delete User</button>
  //       <br />
  //       {category.length ? category[0].name : null}
  //     </li>
  //   );
  // });

  return {
    products,
    categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: id => {
      dispatch(deleteProduct(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
