import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:3000/api/products');
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.post(API_URL, product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

// Action de mise à jour du produit
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ product }, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.patch(`http://localhost:3000/api/products/${product._id}`, product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const rateProduct = createAsyncThunk('products/rateProduct', async ({ productId, rating }, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.patch(
        `http://localhost:3000/api/products/${productId}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async ({ id }, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(rateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload);
            });
    },
});

export default productSlice.reducer;
