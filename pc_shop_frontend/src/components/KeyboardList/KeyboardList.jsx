import { useEffect, useState, useContext } from 'react';
import './KeyboardList.css'
import Keyboard from './Keyboard/Keyboard';
import LoadingContext from '../../contexts/LoadingContext';

function KeyboardList() {
    const [keyboards, setKeyboards] = useState([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading();
        fetch('http://127.0.0.1:8000/api/products/keyboards/').then(res => res.json())
            .then(keybs => {
                setKeyboards(keybs);
                stopLoading();
            });
    }, []);

    return (
        <ul className="keyboard-list">
            {isLoading ? <h1>Loading...</h1> : keyboards.length === 0 && <h1>No keyboards found!</h1>}
            {keyboards.map(keyboard => <Keyboard key={keyboard._id} product={keyboard} />)}
        </ul>
    )
}

export default KeyboardList;