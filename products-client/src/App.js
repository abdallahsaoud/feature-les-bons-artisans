import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductList from './components/productList';
import Login from './components/login';
import Signup from './components/signup';
import NavBar from './components/navBar';
import AddProduct from './components/addProduct';
import { Container, CssBaseline } from '@mui/material';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <CssBaseline />
                <NavBar />
                <Container>
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-product" element={<AddProduct />} />
                    </Routes>
                </Container>
            </Router>
        </Provider>
    );
}

export default App;
