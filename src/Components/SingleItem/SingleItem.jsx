import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import styles from "./SingleItem.css";

const SingleItem = (props) => {
  const current=props.current;  
  return (
    <div className="s-container">
      <div className="img-container">
        <img className="img" src={current.image} alt={current.title} />
      </div>
      <div className="detailss">
        <h1 className="p-name">{current.title}</h1>
        <p style={{ color: "#d63031", marginBottom: "5%" }}>
          <span style={{ color: "grey" }}>M.R.P.</span>&nbsp; ₹ {current.price}
        </p>
        <h4 style={{ color: "#2d3436", marginBottom: "4%" }}>Description</h4>
        <p className="description">{current.description}</p>

        <Button
          style={{ backgroundColor: "#e67e22", marginTop: "5%" }}
          onClick={() => props.addToCart(current)}
          className={styles.details__addBtn}
        >
          <ShoppingCartOutlinedIcon />
          &nbsp; Add To Cart
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state){
    return {
        current:state.currentItem,
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCart:(item)=>{
            return dispatch({type:"ADD_TO_CART",payload:item});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleItem);
