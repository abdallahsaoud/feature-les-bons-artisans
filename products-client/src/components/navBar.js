import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Home } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
        // Ne pas rediriger, rester sur la page d'accueil
    };

    const handleAddProduct = () => {
        if (!token) {
            navigate('/login');
            return;
        }
        navigate('/add-product');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                    <Home />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Gestionnaire de Produit
                </Typography>
                <Button color="inherit" onClick={handleAddProduct}>
                    Ajouter un produit
                </Button>
                {token ? (
                    <Button color="inherit" onClick={handleLogout}>
                        Déconnexion
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Connexion
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
