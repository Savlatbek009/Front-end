import React, { useState, useEffect } from 'react';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import ProductList from './components/ProductList';
import { products } from './data/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = React.createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('Products')
  useEffect(() => {
    // Load cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);

    // Load favorites data from localStorage
    const favoritesData = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favoritesData);
  }, []);

  useEffect(() => {
    // Save cart data to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Save favorites data to localStorage whenever it changes
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    toast.success('Product added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
    });
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.error('Product removed successfully!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      const updatedFavorites = favorites.filter((id) => id !== productId);
      setFavorites(updatedFavorites);
      toast.error('Product removed successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setFavorites([...favorites, productId]);
      toast.info('Product added successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });

    }
  };

  const getDiscountedProducts = () => {
    return products.filter((product) => product.discount);
  };

  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, favorites, toggleFavorite }}
    >
      <header className='bg-light py-3 fixed-top as-navbar'>
        <nav className='container d-flex justify-content-between'>
          <button className='non-button' onClick={() => setView('Products')}>Home</button>
          <button className='non-button' onClick={() => setView('Cart')}>Cart ({cart.length})</button>
          <button className='non-button' onClick={() => setView('Favorites')}>Favorites ({favorites.length})</button>
        </nav>
      </header>
      <div className="empty"></div>
      <div className="container content">
        {view === 'Products' ? <ProductList
          products={products}
          getDiscountedProducts={getDiscountedProducts}
          getProductsByCategory={getProductsByCategory}
        /> : ''}
        {view === 'Cart' ? <Cart /> : ''}
        {view === 'Favorites' ? <Favorites /> : ''}
      </div>
      <footer className='bg-light py-3' style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
        <h3 className='text-center'>Savlatbek Abdullayev, &copy; 2023</h3>
      </footer>
      <ToastContainer />
    </CartContext.Provider>
  );
}

export default App;
