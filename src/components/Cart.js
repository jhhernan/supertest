import React from 'react';
import Icon from '@mdi/react'
import { mdiPlusCircleOutline, mdiMinusCircleOutline, mdiDeleteForever } from '@mdi/js'

import { connect } from 'react-redux';
import { getProducts, addToCart, addOne, deleteOne, deleteFromCart } from '../store/';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

function Cart(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p onClick={props.onHide}>  Volver a la tienda</p>
        <div className="cartHeader">
          <div><h4>Carrito de compras</h4></div>
          <div className="cartHeader--quantity"><span className="totalItems">{props.cart.length}</span> items</div>
        </div>
        
        <div className="cartItem cartItem--header">
            <div className="itemImage itemImage--header">Item</div>
            <div className="itemDetails itemDetails--header"></div>
            <div className="itemSelector itemSelector--header"> Cantidad</div>
            
            <div className="itemPrice itemPrice--header"> Precio </div>
            <div className="itemDelete itemDelete--header"></div>
        </div>
        {props.cart.map(item => (
          <div className="cartItem">
            <div className="itemImage"><img src={item.image} alt="productimage" className="productImag"/></div>
            <div className="itemDetails">
              <div className="itemTitle">{item.title}</div>
              <div className="itemContent">x {item.units} unids - {item.content} c/u</div>
              <div className="itemSupplier">{item.supplier}</div>
            </div>
            <div className="itemSelector">
              <div className={`${item.quantity <= 1 ? "button--inactive" : null}`} onClick={()=>props.deleteOne(item.id)}><Icon path={mdiMinusCircleOutline} size={1} color={item.quantity > 1 ? "green" : "gray"}/></div>
              <div className="itemQuantity">{item.quantity}</div>
              <div onClick={()=>props.addOne(item.id)}><Icon path={mdiPlusCircleOutline} size={1} color={"green"} /></div>
            </div>
            <div className="itemPrice"> <span className="currency">$</span>{(item.price * item.quantity).toLocaleString()} </div>
            <div className="itemDelete" onClick={()=>props.deleteFromCart(item.id)}><Icon path={mdiDeleteForever} size={1}/></div>
          </div>
        ))}

          
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    enableInput: state.enableInput,
    enablePrint: state.enablePrint,
    products: state.products,
    cart: state.cart,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    addToCart: (item) => dispatch(addToCart(item)),
    addOne: (id) => dispatch(addOne(id)),
    deleteOne: (id) => dispatch(deleteOne(id)),
    deleteFromCart: (id) => dispatch(deleteFromCart(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);