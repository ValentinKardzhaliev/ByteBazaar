import React, { useEffect, useState } from 'react';
import { getAllMonitorsByQueryParams } from '../../../services/productService';

const MonitorFilters = ({ setMonitors, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        resolution: '',
        refresh_rate: '',
        panel_type:'',
        size: '',
        min_price: '',
        max_price: '',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams();

        // Add individual filters to queryParams
        Object.entries(appliedFilters).forEach(([key, value]) => {
            if (value) {
                // If the value is an array, join it with commas
                queryParams.append(key, Array.isArray(value) ? value.join(',') : value);
            }
        });

        startLoading();
        // Fetch computers based on all applied filters
        getAllMonitorsByQueryParams(queryParams.toString())
            .then((filteredMonitors) => {
                setMonitors(filteredMonitors);
                stopLoading();

            })
            .catch((err) => console.log(err));
    }, [appliedFilters, setMonitors]);

    return (
        <div>
            <label htmlFor="resolution">Resolution:</label>
            <input
                type="text"
                id="resolution"
                value={appliedFilters.resolution}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, resolution: e.target.value }))}
            />
            <label htmlFor="refresh_rate">Refresh rate:</label>
            <input
                type="text"
                id="refresh_rate"
                value={appliedFilters.refresh_rate}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, refresh_rate: e.target.value }))}
            />
            <label htmlFor="panel_type">Panel type:</label>
            <input
                type="text"
                id="panel_type"
                value={appliedFilters.panel_type}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, panel_type: e.target.value }))}
            />
            <label htmlFor="size">Size:</label>
            <input
                type="text"
                id="size"
                value={appliedFilters.size}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, size: e.target.value }))}
            />

            <label htmlFor="min_price">Min Price:</label>
            <input
                type="text"
                id="min_price"
                value={appliedFilters.min_price}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, min_price: e.target.value }))}
            />

            <label htmlFor="max_price">Max Price:</label>
            <input
                type="text"
                id="max_price"
                value={appliedFilters.max_price}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, max_price: e.target.value }))}
            />
        </div>
    );
};

export default MonitorFilters;