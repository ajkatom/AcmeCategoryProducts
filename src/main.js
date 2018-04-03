import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { listCategories, listProducts } from "./store";
import Nav from "./nav";
import Category from "./category";
import Products from "./products";
import { render } from "react-dom";

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
          <Route path="/" />
          <Switch>
            <Route
              path="/api/categories/:id"
              exact
              render={({ match, history }) => (
                <Category history={history} match={match} />
              )}
            />
            <Route path="/api/products" exact render={() => <Products />} />
          </Switch>
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
