import Nav from "./Components/Nav/Nav";
import Products from "./Components/Products/Products";
import SingleItem from "./Components/SingleItem/SingleItem";
import Cart from "./Components/Cart/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

function App(props) {
  return (
    <Router>
      <div className="app">
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Products}></Route>
          <Route exact path="/cart" component={Cart}></Route>
          {!props.current ? (
            <Redirect to="/"></Redirect>
            ) : (
            <Route exact path="/product/:id" component={SingleItem}></Route>
          )}
        </Switch>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    current: state.currentItem,
  };
}

export default connect(mapStateToProps)(App);
