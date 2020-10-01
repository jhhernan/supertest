import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const ADD_ONE = 'ADD_ONE';
export const DELETE_ONE = 'DELETE_ONE';

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}

export function deleteFromCart(item) {
  return {
    type: DELETE_FROM_CART,
    payload: item,
  };
}

export function addOne(id) {
  return {
    type: ADD_ONE,
    payload: id,
  };
}

export function deleteOne(id) {
  return {
    type: DELETE_ONE,
    payload: id,
  };
}

export function getProducts() {
    return function(dispatch) {
      axios({
        method: 'GET',
        url: 'https://superfuds-assets.s3-sa-east-1.amazonaws.com/utils/product.json'
      })
        .then(({ data }) => {
          dispatch({
            type: GET_PRODUCTS,
            payload: data
          })
        })
    }
}

function reducer(state, action) {
  let cart, item, id, product;
  switch (action.type) {

    case ADD_TO_CART:
      cart = state.cart;
      item=action.payload;
      [product] = cart.filter(prod => prod.id===item.id);
      
      if (!product){
        product = { id:item.id, supplier:item.supplier, 
          title: item.title, price: item.price_real,
          units: item.units_sf, content: item.net_content,
          image: item.thumbnail,
          quantity:1,  };
        cart.push(product);
      }else {
        product={...product, quantity:product.quantity+1}
        cart = cart.map(prod => prod.id===item.id ? product : prod);
      }
      return {
        ...state,
        cart,
      };

    case DELETE_FROM_CART:
      cart = state.cart;
      id = action.payload;
      let newCart = cart.filter(prod => prod.id !== id);
      return {
        ...state,
        cart: newCart,
      };

    case ADD_ONE:
      cart = state.cart;
      id = action.payload;
      [product] = cart.filter(prod => prod.id === id);
      product = { ...product, quantity: product.quantity + 1 }
      cart = cart.map(prod => prod.id === id ? product : prod);
      return {
        ...state,
        cart,
      };

    case DELETE_ONE:
      cart = state.cart;
      id = action.payload;
      [product] = cart.filter(prod => prod.id === id);
      product = { ...product, quantity: product.quantity - 1 }
      cart = cart.map(prod => prod.id === id ? product : prod);
      return {
        ...state,
        cart,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
}

const initialState = {
    products: [],
    cart: [],
}

const middlewares = applyMiddleware(thunk);
export const store = createStore(reducer, initialState, middlewares);