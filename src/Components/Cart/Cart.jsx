import React, { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import { connect } from "react-redux";
import "./Cart.css";
import { Button, TextField } from "@material-ui/core";
import coupons from "../../Constants/coupons";

const Cart = (props) => {
  const [totalItems, setTotalItems] = useState(props.cart.length);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [oldPrice, setOldPrice] = useState(null);

  useEffect(() => {
    let total = 0;
    let amount = 0;
    for (let i = 0; i < props.cart.length; i++) {
      total += props.cart[i].qty;
      amount += props.cart[i].qty * props.cart[i].price;
    }
    setTotalAmount(amount);
    setTotalItems(total);
  }, [props.cart]);

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const handleApply = () => {
    let cpn = coupon.trim().toUpperCase();
    if (coupons[cpn] == undefined) {
      setSuccess(false);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      let discount = (totalAmount / 100) * coupons[cpn].discount;
      let newPrice = Math.trunc(totalAmount - discount);
      setOldPrice(totalAmount);
      setTotalAmount(newPrice);
    }
  };

  const handleSucess = () => {
    setTotalAmount(oldPrice);
    setOldPrice(null);
    setLoading(true);
    setSuccess(false);
    setCoupon('');
  };

  const handleFailure = () => {
    setLoading(true);
    setSuccess(false);
    setCoupon('');
  };

  return (
    <>
      {props.cart.length == 0 ? (
        <>
          <h1>Your Cart is Empty</h1>
        </>
      ) : (
        <div className="container-div">
          <div className="items">
            <div className="header">
              <h3
                style={{
                  paddingTop: "2%",
                  //   paddingLeft: "2%",
                  marginBottom: "3%",
                }}
              >
                Shopping Cart
              </h3>
            </div>
            <div className="added">
              {props.cart.map((cartObj) => {
                return <CartItem key={cartObj.id} item={cartObj}></CartItem>;
              })}
            </div>
          </div>
          <div className="details-c">
            <div className="details">
              <h4 style={{ textAlign: "center", paddingTop: "5%" }}>
                Cart Summary
              </h4>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "5%",
                  marginTop: "5%",
                }}
              >
                <span>Subtotal ({totalItems} items): </span>
                <span style={{ fontWeight: "bold" }}>₹ {totalAmount}</span>
              </div>
              <>
                {loading ? (
                  <div className="coupon">
                    <TextField
                      value={coupon}
                      style={{ marginRight: "2%" }}
                      id="standard-basic"
                      label="Enter code"
                      onChange={handleCoupon}
                    ></TextField>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleApply}
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <>
                    {success ? (
                      <div className="smsg">
                        <h4>Code Applied !</h4>
                        <div className="revert">
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleSucess}
                          >
                            Revert
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="fmsg">
                        <h4>Not Valid !</h4>
                        <div className="revert">
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleFailure}
                          >
                            Try Again
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
              <div className="checkout">
                <Button variant="contained" color="primary">
                  Proceed To Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Cart);
