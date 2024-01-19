import { useEffect, useState } from 'react';
import './MonitorList.css'
import Monitor from './Monitor/Monitor';

function MonitorList() {
    const [monitors, setMonitors] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products/monitors/').then(res => res.json())
            .then(monts => setMonitors(monts));
    }, []);

    return (
        <ul className="monitor-list">
            {monitors.length === 0 && <h1>No monitors found!</h1>}
            {monitors.map(monitor => <Monitor key={monitor._id} product={monitor} />)}
        </ul>
    )
}

export default MonitorList;