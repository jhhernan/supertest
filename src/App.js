import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getProducts, addToCart } from './store/index';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import Product from './components/Product';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


class App extends React.Component {
  constructor(){
    super();
    this.state={
       show: false,
    };
  }

  componentDidMount(){
    this.props.getProducts();
  }

  addCart = (product) => {
    this.props.addToCart(product);
    this.setState({show:true});
  }

  showCart = () => {
    this.setState({show:true});
  }

  closeModal = () => {
    this.setState({show: false});
  }

  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 
      }
    };

    const products = this.props.products;

    return (
      <div className="App">

        <NavBar showCart={this.showCart}/>
        <p className="title">Nuevo en superfüds</p>
        <Carousel
          draggable={false}
          responsive={responsive}
          keyBoardControl={true}
          containerClass="carousel-container"
          deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px">

            {products && products.length > 0 && products.map(post => (
                <Product product={post} addCart={this.addCart}/>
            ))}

        </Carousel>
        <Cart show={this.state.show} onHide={this.closeModal}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    enableInput: state.enableInput,
    enablePrint: state.enablePrint,
    products: state.products,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    addToCart: (item) => dispatch(addToCart(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
