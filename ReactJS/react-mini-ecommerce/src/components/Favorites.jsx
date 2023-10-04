import { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { products } from '../data/products';
import { CartContext } from '../App';

function Favorites({ toggleFavorite }) {
    const { favorites } = useContext(CartContext);

    return (
        <div className="favorites">
            <h2>Favorites ({favorites.length})</h2>
            {favorites.length === 0 ? (
                <p>You have no favorites yet.</p>
            ) : (
                <div className="as-row">
                    {favorites.map((productId) => (
                        <Card
                            key={productId}
                            product={products.find((product) => product.id === productId)}
                            onToggleFavorite={toggleFavorite}
                            isFavorite={favorites.includes(productId)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

Favorites.propTypes = {
    toggleFavorite: PropTypes.func.isRequired,
};

export default Favorites;
