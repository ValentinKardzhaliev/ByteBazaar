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

            <label htmlFor="price_range">Price Range:</label>
            <div className="range_container">
                <div className="sliders_control">
                    <input
                        id="fromSlider"
                        type="range"
                        value={appliedFilters.min_price}
                        min="0"
                        max="800"
                        onChange={(e) => updateFilters('min_price', e.target.value)}
                    />
                    <input
                        id="toSlider"
                        type="range"
                        value={appliedFilters.max_price}
                        min="0"
                        max="800"
                        onChange={(e) => updateFilters('max_price', e.target.value)}
                    />
                </div>
                <div className="form_control">
                    <div className="form_control_container">
                        <div className="form_control_container__time">Min</div>
                        <input
                            className="form_control_container__time__input"
                            type="number"
                            id="fromInput"
                            value={appliedFilters.min_price}
                            min="0"
                            max="800"
                            onChange={(e) => updateFilters('min_price', e.target.value)}
                        />
                    </div>
                    <div className="form_control_container">
                        <div className="form_control_container__time">Max</div>
                        <input
                            className="form_control_container__time__input"
                            type="number"
                            id="toInput"
                            value={appliedFilters.max_price}
                            min="0"
                            max="800"
                            onChange={(e) => updateFilters('max_price', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default MonitorFilters;
