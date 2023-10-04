import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart, FaCartPlus } from 'react-icons/fa';
import { CartContext } from '../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

function Card({ product }) {
    const { id, image, name, description, price, discount } = product;
    const { addToCart, cart, favorites, toggleFavorite } = useContext(CartContext);

    const getItemQuantity = (productId) => {
        const cartItem = cart.find((item) => item.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className="product">
            <div className="text-center">
                <LazyLoadImage className='w-100' effect="blur" src={image} alt={name} />

            </div>
            <div className="card-body">
                <h2>{name}</h2>
                <p>{description}</p>
                <span className="original-price">${price}</span>
                <div className="">
                    <div className="price">
                        {discount && (
                            <span className="discounted-price">
                                ${(price - (price * discount) / 100).toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                            <FaCartPlus /> Add to Cart
                        </button>
                        <span className="quantity"><b>x:</b> {getItemQuantity(id)}</span>
                        <button className="favorite-button" onClick={() => toggleFavorite(id)}>
                            {favorites.includes(id) ? <FaHeart color="red" /> : <FaRegHeart />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Card;
