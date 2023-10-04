import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../App';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Product({ product }) {
    const { id, name, description, price, image, discount } = product;
    const { addToCart, toggleFavorite, favorites, cart } = useContext(CartContext);

    const getItemQuantity = () => {
        const cartItem = cart.find((item) => item.id === id);
        return cartItem ? cartItem.quantity : 0;
    };

    const checkHave = (id) => {
        if (cart.find((obj) => obj.id === id)) {
            return true
        } else {
            return false
        }
    }

    console.log(getItemQuantity());

    return (
        <div className="product-item">
            <center>
                <LazyLoadImage effect='blur' src={image} alt={name} />
            </center>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: ${price}</p>
            {discount && <p>Discount: {discount}%</p>}
            <div className="d-flex justify-content-between gap-3 align-items-center">
                <button className={checkHave(id) ? 'bg-succes' : 'addToCart'} onClick={() => addToCart(product)}>Add to Cart</button>
                <span>Quantity: {getItemQuantity()}</span>
                <button
                    onClick={() => toggleFavorite(id)}
                    className={favorites.includes(id) ? 'favorited' : ''}
                >
                    {favorites.includes(id) ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
            </div>
        </div >
    );
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Product;
