import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../App';


function CartItem({ product }) {
    const { id, name, price, quantity } = product;
    const { removeFromCart } = useContext(CartContext);

    return (
        <div className="cart-item">
            <div className="cart-item-details">
                <b className="cart-item-name">{name}</b>
                <br />
                <i>total price of this product: <b>${price * quantity}</b></i>
            </div>
            <span className="cart-item-price"><b>1:</b> ${price}</span>
            <span className="cart-item-quantity"><b>x:</b> {quantity}</span>
            <div className="cart-item-actions">
                <button className="remove-button" onClick={() => removeFromCart(id)}>
                    Remove
                </button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    product: PropTypes.object.isRequired,
};

function Cart() {
    const { cart } = useContext(CartContext);
    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((product) => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
