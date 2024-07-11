import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rateProduct, deleteProduct, updateProduct, fetchProducts } from '../redux/productSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        _id: product._id,
        name: product.name,
        type: product.type,
        price: product.price,
        warranty_years: product.warranty_years,
        available: product.available
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(fetchProducts());
        }
    }, [dispatch, token]);

    const userRating = product.ratings?.find(r => r.user?.toString() === user?._id?.toString())?.rating || 0;

    const checkTokenAndNavigate = () => {
        if (!token) {
            navigate('/login');
            return false;
        }
        return true;
    };

    const handleRatingChange = (event, newValue) => {
        if (checkTokenAndNavigate()) {
            dispatch(rateProduct({ productId: product._id, rating: newValue })).unwrap()
                .then(() => {
                    setEditedProduct({
                        ...editedProduct,
                        ratings: (product.ratings || []).map(r =>
                            r.user?.toString() === user?._id?.toString() ? { ...r, rating: newValue } : r
                        )
                    });
                })
                .catch(err => {
                    console.error("Failed to rate product:", err.response ? err.response.data : err.message);
                });
        }
    };

    const handleDelete = () => {
        if (checkTokenAndNavigate()) {
            dispatch(deleteProduct({ id: product._id }));
            setOpenDeleteModal(false);
        }
    };

    const handleEdit = () => {
        if (checkTokenAndNavigate()) {
            if (!editedProduct.name || !editedProduct.type || !editedProduct.price || !editedProduct.warranty_years) {
                setError('Veuillez remplir tous les champs');
                return;
            }
            setError('');
            const { ratings, ...productDataWithoutRatings } = editedProduct;
            dispatch(updateProduct({ product: productDataWithoutRatings }));
            setOpenEditModal(false);
        }
    };

    const averageRating = product.ratings && product.ratings.length
        ? (product.ratings.reduce((acc, curr) => acc + curr.rating, 0) / product.ratings.length).toFixed(1)
        : 'N/A';

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Prix: {product.price}€
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Années de Garantie: {product.warranty_years} 
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
                    Note moyenne: {averageRating}/5
                </Typography>
                <Rating
                    name={`rating-${product._id}`}
                    value={userRating}
                    onChange={handleRatingChange}
                />
                {token && (
                    <Typography variant="body2" color="textSecondary">
                        Votre note: {userRating}/5
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <IconButton onClick={() => {
                    if (checkTokenAndNavigate()) {
                        setOpenEditModal(true);
                    }
                }}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => {
                    if (checkTokenAndNavigate()) {
                        setOpenDeleteModal(true);
                    }
                }}>
                    <DeleteIcon />
                </IconButton>
                <Typography variant="body2" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: product.available ? 'green' : 'red' }}>
                    {product.available ? (
                        <>
                            <CheckCircleIcon /> Disponible
                        </>
                    ) : (
                        <>
                            <CancelIcon /> Indisponible
                        </>
                    )}
                </Typography>
            </CardActions>
            <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
            >
                <Box sx={{ p: 3, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '50%' }}>
                    <Typography variant="h6">Confirmer la suppression</Typography>
                    <Button onClick={handleDelete} style={{ color: 'red' }}>Supprimer</Button>
                    <Button onClick={() => setOpenDeleteModal(false)}>Annuler</Button>
                </Box>
            </Modal>
            <Modal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
            >
                <Box sx={{ p: 3, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '50%' }}>
                    <Typography variant="h6">Modifier le produit</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        label="Nom"
                        value={editedProduct.name}
                        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Type"
                        value={editedProduct.type}
                        onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Prix"
                        value={editedProduct.price}
                        onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Années de garantie"
                        value={editedProduct.warranty_years}
                        onChange={(e) => setEditedProduct({ ...editedProduct, warranty_years: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <Select
                            value={editedProduct.available}
                            onChange={(e) => setEditedProduct({ ...editedProduct, available: e.target.value })}
                        >
                            <MenuItem value={true}>Disponible</MenuItem>
                            <MenuItem value={false}>Indisponible</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleEdit}>Enregistrer</Button>
                    <Button onClick={() => setOpenEditModal(false)}>Annuler</Button>
                </Box>
            </Modal>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        type: PropTypes.string,
        price: PropTypes.number,
        warranty_years: PropTypes.number,
        available: PropTypes.bool,
        ratings: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
                rating: PropTypes.number,
            })
        ),
    }),
};

export default ProductCard;
