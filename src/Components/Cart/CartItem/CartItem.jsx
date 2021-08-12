import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "./CartItem.css";

const CartItem = (props) => {
  const item = props.item;
  const [quantity, setQuantity] = useState(item.qty);

  const handleOnChange = (e) => {
    if (e.target.value > 0) {
      setQuantity(e.target.value);
      props.adjustQty(item.id,Number(e.target.value));
    }
  };

  return (
    <>
      <hr />
      <div className="itemContainer">
        <div className="imgc">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="desc">
          <div className="itemName">
            <h3>{item.title}</h3>
          </div>
          <div className="itemQuantity">
            <label htmlFor="qty">Qty</label>
            <input
              min="1"
              type="number"
              id="qty"
              name="qty"
              value={quantity}
              onChange={handleOnChange}
            />
          </div>
          <div className="itemdesc">
            <p
              style={{
                color: "#222f3e",
                fontFamily: "cursive",
                textAlign: "justify",
              }}
            >
              {item.description}
            </p>
          </div>
          <div className="pc">
            <Button
              variant="contained"
              color="secondary"
              onClick={()=>{props.removeFromCart(item.id)}}
            >
              <DeleteIcon />
              Delete
            </Button>
            <h3 style={{ marginTop: "1%", marginLeft: "4%" }}>
              ₹ {item.price}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
      adjustQty:(id,qty)=>{
          dispatch({
              type:"ADJUST_QTY",
              payload:{id,qty},
          })
      },
      removeFromCart:(id)=>{
          dispatch({
              type:"REMOVE_ITEM",
              payload:id
          })
      }
  };
}

export default connect(null, mapDispatchToProps)(CartItem);
