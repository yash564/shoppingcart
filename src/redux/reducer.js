import INITIAL_STATE from "./initialState";

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_CURRENT_ITEM":
      return {
        ...state,
        currentItem: action.payload,
      };
    case "ADD_TO_CART":
      if (state.cart.length) {
        let flag = false;
        let arr = state.cart.map((cartObj) => {
          if (cartObj.id == action.payload.id) {
            flag = true;
            return { ...cartObj, qty: cartObj.qty + 1 };
          }
          return cartObj;
        });
        if (flag == false) {
          arr.push({ ...action.payload, qty: 1 });
        }
        return {
          ...state,
          cart: arr,
        };
      } else {
        return {
          ...state,
          cart: [{ ...action.payload, qty: 1 }],
        };
      }
    case "ADJUST_QTY":
      let arr = state.cart.map((obj) => {
        if (obj.id == action.payload.id) {
          return { ...obj, qty: action.payload.qty };
        }
        return obj;
      });
      return { ...state, cart: arr };
    case "REMOVE_ITEM":
      let updated = state.cart.filter((obj) => {
        return obj.id != action.payload;
      });
      return {
        ...state,
        cart: updated,
      };
    default:
      return state;
  }
}

export default reducer;
