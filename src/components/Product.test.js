import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import Product from './Product';

const product = {
            "id": 446,
            "title": "Té Verde Pureza",
            "supplier": "Kundali",
            "tax": "0.19",
            "price_real": "22451",
            "image": "https://superfuds-file.s3.us-west-2.amazonaws.com/product/7709683463753_5e552d1f49f3a.png",
            "thumbnail": "https://superfuds-file.s3.us-west-2.amazonaws.com/product/thumbnail/7709683463753_5e552d1f49f3a.png",
            "description": "Tés e infusiones 100% natural alineado con los chakras. Combinamos experiencia gastronómica con afinidad bioenergética resultando en la combinación perfecta de suavidad + profundidad + sabor. Desintoxicación y limpieza a través de la esencia del cuatro chakra",
            "units_sf": 1,
            "slug": "te-verde-pureza",
            "category": "Bebidas",
            "subcategory": "Tés E Infusiones",
            "net_content": "30g",
            "sellos":[
                    {"name":"vegano","image":"https://s3-sa-east-1.amazonaws.com/assets.superfuds.com/assets/ecom/v3/Group.png"}
            ]
          }; 

describe('Product component test', () => {

    it('renders the component', () => {
        const container = render(<Product product={product} />)
        expect(container.firstChild).toMatchSnapshot()
    })

    it('display correctly using props data', () => {
        const { getAllByTestId, getByTestId } = render(
              <Product product={product} />
          );
        expect(getAllByTestId('product-title').length).toBe(1);
        expect(getByTestId('product-title').textContent).toBe("Té Verde Pureza");        
    })

    it('Calling addCart when clicking the button', () => {
      let addToCart = jest.fn();
      const { getAllByTestId, getByTestId } = render(
            <Product product={product} addCart={addToCart}/>
      );
      fireEvent.click(getByTestId('add-button'));
      expect(addToCart).toHaveBeenCalled();
    })


  });

