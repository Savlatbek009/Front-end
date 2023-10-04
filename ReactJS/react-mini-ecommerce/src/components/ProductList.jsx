import { useContext } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { CartContext } from '../App';

function ProductList({ products }) {
    const { favorites } = useContext(CartContext);
    return (
        <>
            <h1>Products</h1>
            <div className="as-row">
                {products.map((product) => (
                    <div className="product" key={product.id}>
                        <div>
                            <Product
                                product={product}
                                isFavorite={favorites.includes(product.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    getDiscountedProducts: PropTypes.func.isRequired,
    getProductsByCategory: PropTypes.func.isRequired,
};

export default ProductList;
