import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductCard from './productCard';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

const product = {
  _id: 1,
  name: 'Test Product',
  type: 'phone',
  price: 100,
  warranty_years: 1,
  available: true,
  ratings: []
};

test('renders ProductCard and handles edit and delete', () => {
  const store = mockStore({
    auth: { token: 'fake-token', user: { _id: 'user-id' } },
    products: { products: [product] }
  });
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(getByLabelText(/edit/i));
  fireEvent.change(getByLabelText(/Nom/i), { target: { value: 'Updated Product' } });
  fireEvent.click(getByText(/Enregistrer/i));

  // Ajoutez d'autres assertions si nécessaire
});
