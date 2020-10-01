import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import NavBar from './NavBar';


describe('NavBar component test', () => {

    it('renders the component', () => {
        const container = render(<NavBar  />)
        expect(container.firstChild).toMatchSnapshot()
    })

    it('display correctly ', () => {
        const { getAllByTestId, getByTestId } = render(
              <NavBar />
          );
        
        expect(getByTestId('user-name').textContent).toBe("Jairo Hernandez");        
    })
  });

