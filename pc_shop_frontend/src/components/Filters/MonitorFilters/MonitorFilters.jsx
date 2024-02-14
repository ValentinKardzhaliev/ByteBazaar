import React, { useEffect, useState } from 'react';
import { getAllMonitorsByQueryParams } from '../../../services/productService';

const MonitorFilters = ({ setMonitors, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        resolution: '',
        refresh_rate: '',
        panel_type: '',
        size: '',
        min_price: '',
        max_price: '',
    });

    const updateFilters = (field, value) => {
        setAppliedFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const applyFilters = () => {
        const queryParams = new URLSearchParams();

        // Add individual filters to queryParams
        Object.entries(appliedFilters).forEach(([key, value]) => {
            if (value !== '' && value !== false) {
                queryParams.append(key, Array.isArray(value) ? value.join(',') : value);
            }
        });

        startLoading();
        // Fetch monitors based on all applied filters
        getAllMonitorsByQueryParams(queryParams.toString())
            .then((filteredMonitors) => {
                setMonitors(filteredMonitors);
                stopLoading();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        // This effect runs when the component mounts
        // It can be used for initial setup, but we don't make a request here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <label htmlFor="resolution">Resolution:</label>
            <input
                type="text"
                id="resolution"
                value={appliedFilters.resolution}
                onChange={(e) => updateFilters('resolution', e.target.value)}
            />

            <label htmlFor="refresh_rate">Refresh rate:</label>
            <input
                type="text"
                id="refresh_rate"
                value={appliedFilters.refresh_rate}
                onChange={(e) => updateFilters('refresh_rate', e.target.value)}
            />

            <label htmlFor="panel_type">Panel type:</label>
            <input
                type="text"
                id="panel_type"
                value={appliedFilters.panel_type}
                onChange={(e) => updateFilters('panel_type', e.target.value)}
            />

            <label htmlFor="size">Size:</label>
            <input
                type="text"
                id="size"
                value={appliedFilters.size}
                onChange={(e) => updateFilters('size', e.target.value)}
            />

            <label htmlFor="min_price">Min Price:</label>
            <input
                type="range"
                id="min_price"
                min="0"
                max="800"  // Adjust the max value as needed
                step="50"   // Adjust the step value as needed
                value={appliedFilters.min_price}
                onChange={(e) => updateFilters('min_price', e.target.value)}
            />
            <span>{appliedFilters.min_price}</span>

            <label htmlFor="max_price">Max Price:</label>
            <input
                type="range"
                id="max_price"
                min="0"
                max="800"  // Adjust the max value as needed
                step="50"   // Adjust the step value as needed
                value={appliedFilters.max_price}
                onChange={(e) => updateFilters('max_price', e.target.value)}
            />
            <span>{appliedFilters.max_price}</span>

            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default MonitorFilters;