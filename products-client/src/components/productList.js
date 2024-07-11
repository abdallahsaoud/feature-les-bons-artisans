import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from './productCard';
import { Pagination, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Box } from '@mui/material';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [productTypes, setProductTypes] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const types = [...new Set(products.map(product => product.type))];
        setProductTypes(types);
    }, [products]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === '' || product.type === filter)
    );

    const productsPerPage = 6;
    const displayedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

    return (
        <div>
            <Box display="flex" alignItems="center" mb={2}>
                <h2 style={{ flex: 1 }}>Liste des Produits:</h2>
                <TextField
                    label="Rechercher par nom"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    margin="normal"
                    style={{ marginRight: 16 }}
                />
                <FormControl margin="normal" style={{ minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select value={filter} onChange={handleFilterChange}>
                        <MenuItem value="">Tous</MenuItem>
                        {productTypes.map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={3}>
                {displayedProducts.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(filteredProducts.length / productsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

export default ProductList;
