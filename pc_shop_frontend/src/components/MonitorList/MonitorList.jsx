import { useEffect, useState, useContext } from 'react';
import './MonitorList.css'
import Monitor from './Monitor/Monitor';
import LoadingContext from '../../contexts/LoadingContext';
import { getAllMonitors } from '../../services/productService';
import MonitorFilters from '../Filters/MonitorFilters/MonitorFilters';

function MonitorList() {
    const [monitors, setMonitors] = useState([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading();
        getAllMonitors()
            .then(monts => {
                setMonitors(monts);
                stopLoading();
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <MonitorFilters
                setMonitors={setMonitors}
                startLoading={startLoading}
                stopLoading={stopLoading}
            />

            <ul className="monitor-list">
                {isLoading ? <h1>Loading...</h1> : monitors.length === 0 && <h1>No monitors found!</h1>}
                {monitors.map(monitor => <Monitor key={monitor._id} product={monitor} />)}
            </ul>
        </>
    )
}

export default MonitorList;