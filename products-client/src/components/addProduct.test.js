import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AddProduct from './addProduct';

const mockStore = configureStore([]);

test('renders AddProduct and handles form submission', () => {
  const store = mockStore({});
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(getByLabelText(/Nom/i), { target: { value: 'Test Product' } });
  fireEvent.change(getByLabelText(/Prix/i), { target: { value: '100' } });
  fireEvent.click(getByText(/Ajouter/i));

  // Ajoutez d'autres assertions si nécessaire
});
