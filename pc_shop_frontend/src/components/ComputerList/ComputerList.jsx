import { useContext, useEffect, useState } from 'react';
import './ComputerList.css'
import Computer from './Computer/Computer';
import LoadingContext from '../../contexts/LoadingContext';
import PriceFilter from '../Filters/PriceFilter';
import Checkbox from '../Filters/ComputerFilters/GraphicFilter';

function ComputerList() {
    const [computers, setComputers] = useState([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading();
        fetch('http://127.0.0.1:8000/api/products/computers/').then(res => res.json())
            .then(comps => {
                setComputers(comps);
                stopLoading();
            }).catch(err => console.log(err));
    }, []);

    return (
        <>
            <PriceFilter setComputers={setComputers} />
            <Checkbox graphics={'Nvidia'} setComputers={setComputers} />
            <Checkbox graphics={'AMD'} setComputers={setComputers} />
            <ul className="computer-list">
                {isLoading ? <h1>Loading...</h1> : computers.length === 0 && <h1>No computers found!</h1>}
                {computers.map(computer => <Computer key={computer._id} product={computer} />)}
            </ul>
        </>
    )
}

export default ComputerList;