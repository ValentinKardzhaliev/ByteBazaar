import { useEffect, useState } from 'react';
import './KeyboardList.css'
import Keyboard from './Keyboard/Keyboard';

function KeyboardList() {
    const [keyboards, setKeyboards] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products/keyboards/').then(res => res.json())
            .then(keybs => setKeyboards(keybs));
    }, []);

    return (
        <ul className="keyboard-list">
            {keyboards.length === 0 && <h1>No keyboards found!</h1>}
            {keyboards.map(keyboard => <Keyboard key={keyboard._id} product={keyboard} />)}
        </ul>
    )
}

export default KeyboardList;