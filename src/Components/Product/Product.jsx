import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const history = useHistory();
  const useStyle = makeStyles({
    root: {
      maxWidth: 345,
      marginBottom: "5%",
    },
    media: {
      height: "40vh",
    },
  });
  let classes = useStyle();

  const handleViewItem = () => {
    props.loadCurrentItem(props.product);
    history.push(`/product/${props.product.id}`);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardMedia
        image={props.product.image}
        className={classes.media}
      ></CardMedia>
      <CardContent className={classes.cardstyle}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.product.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ height: "26vh" }}
        >
          {props.product.description}
        </Typography>
        <br />
        <Typography variant="h5" align="center" color="textPrimary">
          {props.product.price}&nbsp;₹
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleViewItem}>
          View Item
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            props.addToCart(props.product);
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

function mapStateToDispatch(dispatch) {
  return {
    loadCurrentItem: (item) => {
      dispatch({
        type: "SET_CURRENT_ITEM",
        payload: item,
      });
    },
    addToCart: (item) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      });
    },
  };
}

export default connect(null, mapStateToDispatch)(Product);
