import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './login';

const mockStore = configureStore([]);

test('renders Login and handles login submission', () => {
  const store = mockStore({
    auth: { token: null }
  });
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
  fireEvent.change(getByLabelText(/Mot de passe/i), { target: { value: 'password' } });
  fireEvent.click(getByText(/Se connecter/i));

  // Ajoutez d'autres assertions si nécessaire
});
