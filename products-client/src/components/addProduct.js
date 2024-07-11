import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, Select, MenuItem, Typography } from '@mui/material';
import { addProduct, fetchProducts } from '../redux/productSlice';

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [rating,] = useState(0);
    const [warrantyYears, setWarrantyYears] = useState('');
    const [available, setAvailable] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !type || !price || !warrantyYears) {
            setError('Veuillez remplir tous les champs');
            return;
        }
        setError('');
        const maxId = products.length > 0 ? Math.max(...products.map(product => product._id)) : 0;
        const productData = {
            _id: maxId + 1,
            name,
            type,
            price: parseFloat(price),
            rating: parseFloat(rating),
            warranty_years: parseInt(warrantyYears),
            available
        };
        dispatch(addProduct(productData)).then(() => {
            navigate('/');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2> Ajouter un Produit</h2>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Années de garantie"
                value={warrantyYears}
                onChange={(e) => setWarrantyYears(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <Select
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                >
                    <MenuItem value={true}>Disponible</MenuItem>
                    <MenuItem value={false}>Indisponible</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Ajouter
            </Button>
        </form>
    );
};

export default AddProduct;
