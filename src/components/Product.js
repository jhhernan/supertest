import React from 'react';

function Product(props) {
    const product = props.product;
    return (
        <div key={product.id} className="productBox" data-testid="product-box">
            <div className="interior">
                <div className="imageContainer">
                    <div className="image"><img src={product.thumbnail} alt="productimage" className="productImag" /></div>
                    <div className="sellosContainer">
                        {product.sellos && product.sellos.length > 0 && product.sellos.map((sello, idx) => (
                            <div className="tooltip1" key={idx}>
                                <img src={sello.image} alt="selloimagen" />
                                <span className="tooltiptext1">Producto<br />{sello.name.split("")[0].toUpperCase() + sello.name.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="productInfo">
                    <div className="supplierName">{product.supplier}</div>
                    <div className="weightInfo">{product.net_content}</div>
                    <p className="productTitle" data-testid="product-title">{product.title.length > 20 ? product.title.substr(0, 19) + "..." : product.title}</p>
                    <p className="productPrice"><span className="priceSymbol">$</span>{parseInt(product.price_real).toLocaleString()} <span className="productQuantity">x {product.units_sf} unids</span></p>
                </div>
            </div>
            <div className="addButton" data-testid="add-button" onClick={() => props.addCart(product)}>Agregar al carrito</div>
        </div>
    )
}

export default Product;