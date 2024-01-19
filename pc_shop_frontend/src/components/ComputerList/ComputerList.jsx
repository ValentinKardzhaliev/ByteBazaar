import { useEffect, useState } from 'react';
import './ComputerList.css'
import Computer from './Computer/Computer';

function ComputerList() {
    const [computers, setComputers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products/computers/').then(res => res.json())
            .then(comps => setComputers(comps));
    }, []);

    return (
        <ul className="computer-list">
            {computers.length === 0 && <h1>No computers found!</h1>}
            {computers.map(computer => <Computer key={computer._id} product={computer} />)}
        </ul>
    )
}

export default ComputerList;