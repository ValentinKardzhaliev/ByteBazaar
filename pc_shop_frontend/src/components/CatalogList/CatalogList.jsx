import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CatalogList.css'
import { getItems } from '../../services/productService'; import { Link } from 'react-router-dom';
import Item from './Item/Item';
import LoadingContext from '../../contexts/LoadingContext';
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

    function renderSwitchPath(category) {
        switch (category) {
            case 'computers':
                return (
                    <div>
                        <Link className='mainPage' to={'/'}>Main page</Link> {'>'} Computers
                    </div>
                );
            case 'monitors':
                return (
                    <div>
                        <Link className='mainPage' to={'/'}>Main page</Link> {'>'} Monitors
                    </div>
                );
            case 'keyboards':
                return (
                    <div>
                        <Link className='mainPage' to={'/'}>Main page</Link> {'>'} Keyboards
                    </div>
                );
            default:
                return null;
        }
    }

    function renderSwitchH1Element(category) {
        switch (category) {
            case 'computers':
                return (
                    <h1 className='h1-element-style'>Computers</h1>
                );
            case 'monitors':
                return (
                    <h1 className='h1-element-style'>Monitors</h1>
                );
            case 'keyboards':
                return (
                    <h1 className='h1-element-style'>Keyboards</h1>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <div id="pathFilters">
                {renderSwitchPath(category)}
                {renderSwitchH1Element(category)}
            </div>
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