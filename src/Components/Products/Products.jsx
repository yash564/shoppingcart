import React from 'react';
import {connect} from "react-redux";
import Product from "../Product/Product";
import "./Products.css";

const Products = (props) => {
    return ( <div className="items">
        {props.products.map((productObj)=>{
            return (<Product key={productObj.id} product={productObj}></Product>);
        })}
    </div> );
}

function mapStateToProps(state){
    return {
        products: state.products,
    }
}
 
export default connect(mapStateToProps)(Products);