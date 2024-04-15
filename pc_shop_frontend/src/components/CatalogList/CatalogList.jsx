import { useContext, useEffect, useState } from 'react';
import './CatalogList.css'
import Item from './Item/Item';
import LoadingContext from '../../contexts/LoadingContext';
import { getItems } from '../../services/productService';
import { useParams } from 'react-router-dom';
import CatalogFilters from '../common/CatalogFilters';

function CatalogList() {
    const [items, setItems] = useState([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
    const { category } = useParams();
    const FiltersComponent = CatalogFilters(category, setItems, startLoading, stopLoading);

    useEffect(() => {
        startLoading()
        getItems(category)
            .then((items) => {
                setItems(items);
                stopLoading();
            })
            .catch((err) => console.log(err));
    }, [category])

    return (
        <>
            <div className="computer-products-page-container">
                {FiltersComponent}
                <ul className="item-list">
                    {isLoading ? <h1>Loading...</h1> : items.length === 0 && <h1>No products found!</h1>}
                    {items.map(item => <Item key={item._id} product={item} />)}
                </ul>
            </div>
        </>
    )
}

export default CatalogList;