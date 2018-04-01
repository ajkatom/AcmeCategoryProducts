import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { listCategories, listProducts } from "./store";
import Nav from "./nav";

class Main extends Component {
  componentDidMount() {
    this.props.listProducts();
    this.props.listCategories();
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    listCategories: () => dispatch(listCategories()),
    listProducts: () => dispatch(listProducts())
  };
};

export default connect(null, mapDispatchToProps)(Main);
