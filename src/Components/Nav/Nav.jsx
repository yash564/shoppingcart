import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Nav.css";

const Nav = (props) => {
  const [count, setCount] = useState(0);

  let useStyle = makeStyles({
    root: {
      flexGrow: 1,
    },
  });
  let classes = useStyle();

  useEffect(() => {
    let c = 0;
    props.cart.forEach((item) => {
      c += item.qty;
    });
    setCount(c);
  }, [props.cart]);

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#badc58" }}>
        <Toolbar>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "#2f3542" }}
            className={classes.root}
          >
            <Typography variant="h6" className={classes.root}>
              Shopping App
            </Typography>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "#2f3542" }}>
            <Button color="inherit">
              Cart
              <ShoppingCartIcon
                style={{ marginLeft: "12%", marginRight: "1%" }}
              ></ShoppingCartIcon>
              <span
                style={{
                  marginBottom: "35%",
                  position: "absolute",
                  marginLeft: "60%",
                }}
              >
                {count}
              </span>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Nav);
