import { AppBar, InputBase, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToken } from '../../../store/tokens/actions';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './Navbar.css';
import { Autocomplete, Box, SelectChangeEvent } from '@mui/material';
import { buscasemtoken } from '../../../services/Service';
import { useEffect, useState } from 'react';
import Produto from '../../../models/Produto';
import Categoria from '../../../models/Categoria';

import SearchIcon from '@mui/icons-material/Search';

function Navbar() {

    let history = useNavigate();

    const dispatch = useDispatch();

    const [produtos, setProdutos] = useState<Produto[]>([])

    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [TextProd, setTextProd] = useState('');

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    async function getCategoria() {
        await buscasemtoken("/categoria", setCategorias)
    }

    async function getProduto() {
        await buscasemtoken("/produto", setProdutos)
    }

    useEffect(() => {
        getProduto()
    }, [produtos.length])

    useEffect(() => {
        getCategoria()
    }, [categorias.length])

    const handleChange = (event: SelectChangeEvent) => {
        setTextProd(event.target.value as string);
    };

    function goLogout() {
        dispatch(addToken(''));
        // alert("Usuario deslogado")
        toast.info('Usuario deslogado!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        history('/home')
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    var navbarComponent;

    if (token === "") {

        navbarComponent =
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "#3fb553" }}>

                    <Toolbar variant="dense" className="font">

                        <Box display="flex" justifyContent="start" mx={1}>

                            <Link to="/home" className="text-decorator-none" >
                                <Box className='cursor' mx={1} >
                                    <Typography variant="h6" component="div" color="inherit">
                                        Terra da Gente
                                    </Typography>
                                </Box>
                            </Link>

                            <Box mx={1} >
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Buscar produtos, marcas e muito mais..."
                                        // inputProps={{ 'aria-label': 'search' }}
                                        inputProps={{ produtos }}
                                    />

                                </Search>
                            </Box>

                            <Box className='cursor' mx={1}  >
                                <InputLabel className="text-decorator-none" id="demo-simple-select-label">Categorias</InputLabel>
                                <Select
                                    label="Categorias"
                                // onChange={handleChange}
                                >

                                    {
                                        categorias.map(categorias => (
                                            <Link to={`/categoria/${categorias.id}`} className="text-decorator-none">
                                                <MenuItem className="text-decorator-none">{categorias.nome}</MenuItem>
                                            </Link>

                                        ))
                                    }
                                </Select>
                            </Box>

                            <Link to="/sobre" className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="subtitle1" color="inherit">
                                        Contato
                                    </Typography>
                                </Box>
                            </Link>

                            <Link to="/cadastro" className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="subtitle1" color="inherit">
                                        Crie a sua conta
                                    </Typography>
                                </Box>
                            </Link>


                            <Link to="/login" className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="subtitle1" color="inherit">
                                        Entre
                                    </Typography>
                                </Box>
                            </Link>


                        </Box>

                    </Toolbar>
                </AppBar >
            </Box>

    } else {

        navbarComponent =
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "#3fb553" }}>

                    <Toolbar variant="dense" className="font">

                        <Box display="flex" justifyContent="start">

                            <Link to="/home" className="text-decorator-none" >
                                <Box className='cursor' >
                                    <Typography variant="h6" component="div" color="inherit">
                                        Terra da Gente
                                    </Typography>
                                </Box>
                            </Link>

                            <Box>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Buscar produtos, marcas e muito mais..."
                                        // inputProps={{ 'aria-label': 'search' }}
                                        inputProps={{ produtos }}
                                    />

                                </Search>
                            </Box>

                            <Box className='cursor' >
                                <InputLabel className="text-decorator-none" id="demo-simple-select-label">Categorias</InputLabel>
                                <Select
                                    label="Categorias"
                                // onChange={handleChange}
                                >

                                    {
                                        categorias.map(categorias => (
                                            <Link to={`/categoria/${categorias.id}`} className="text-decorator-none">
                                                <MenuItem className="text-decorator-none">{categorias.nome}</MenuItem>
                                            </Link>

                                        ))
                                    }
                                </Select>

                                <Link to="/sobre" className="text-decorator-none">
                                    <Box mx={1} className='cursor'>
                                        <Typography variant="subtitle1" color="inherit">
                                            Contato
                                        </Typography>
                                    </Box>
                                </Link>

                                <Box mx={1} className="cursor" onClick={goLogout}>
                                    <Typography variant="h6" color="inherit">
                                        Sair
                                    </Typography>
                                </Box>

                            </Box>
                        </Box>

                    </Toolbar>
                </AppBar >
            </Box>




    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;