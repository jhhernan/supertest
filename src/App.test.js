import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store';

test('renders learn react link', () => {
  const TestComponent=<Provider store={store}><App /></Provider>;
  const { getByText } = render(TestComponent);
  const linkElement = getByText(/Nuevo en superfüds/i);
  expect(linkElement).toBeInTheDocument();
});
