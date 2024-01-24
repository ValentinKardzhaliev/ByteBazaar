import { useEffect, useState, useContext } from 'react';
import './MonitorList.css'
import Monitor from './Monitor/Monitor';
import LoadingContext from '../../contexts/LoadingContext';

function MonitorList() {
    const [monitors, setMonitors] = useState([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading();
        fetch('http://127.0.0.1:8000/api/products/monitors/').then(res => res.json())
            .then(monts => {
                setMonitors(monts);
                stopLoading();
            } );
    }, []);

    return (
        <ul className="monitor-list">
            {isLoading ? <h1>Loading...</h1> : monitors.length === 0 && <h1>No monitors found!</h1>}
            {monitors.map(monitor => <Monitor key={monitor._id} product={monitor} />)}
        </ul>
    )
}

export default MonitorList;