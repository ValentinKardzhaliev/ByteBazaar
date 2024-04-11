import React, { useEffect, useState } from 'react';
import { getAllCharacteristics, getAllMonitorsByQueryParams } from '../../../services/productService';

const MonitorFilters = ({ setMonitors, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        resolution: [],
        refresh_rate: [],
        panel_type: [],
        size: [],
        aspect_ratio: [],
        response_time: [],
        curvature: [],
        adjustable_stand: [],
        built_in_speakers: [],
        min_price: '',
        max_price: '',
    });
    const [availableCharacteristics, setAvailableCharacteristics] = useState({});

    const updateFilters = (field, value) => {
        setAppliedFilters(prevFilters => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const applyFilters = () => {
        const queryParams = new URLSearchParams();

        Object.entries(appliedFilters).forEach(([key, value]) => {
            if (value !== '' && value.length > 0) {
                queryParams.append(key, Array.isArray(value) ? value.join(',') : value);
            }
        });

        startLoading();

        getAllMonitorsByQueryParams(queryParams.toString())
            .then(filteredMonitors => {
                setMonitors(filteredMonitors);
                stopLoading();
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        startLoading();

        getAllCharacteristics('monitor')
            .then(graphicsCounts => {
                setAvailableCharacteristics(graphicsCounts.Monitor);
                stopLoading();
            })
            .catch(err => console.log(err));
    }, []);

    const toggleCheckbox = (filterName, value) => {
        const updatedFilters = [...appliedFilters[filterName]];
        const index = updatedFilters.indexOf(value);
        if (index === -1) {
            updatedFilters.push(value);
        } else {
            updatedFilters.splice(index, 1);
        }
        updateFilters(filterName, updatedFilters);
    };

    const renderCheckboxes = (characteristic, characteristicName) => (
        <>
            {characteristic.map(item => (
                <label key={item[characteristicName]}>
                    <input
                        type="checkbox"
                        value={item[characteristicName]}
                        checked={appliedFilters[characteristicName].includes(item[characteristicName])}
                        onChange={() => toggleCheckbox(characteristicName, item[characteristicName])}
                    />
                    {`${item[characteristicName]} (${item.count})`}
                    <br />
                </label>
            ))}
        </>
    );

    return (
        <div>
            <h2>Filters</h2>
            {Object.entries(availableCharacteristics).map(([key, value]) => (
                <div key={key}>
                    <h3>{key.replace('_', ' ').toUpperCase()}</h3>
                    {renderCheckboxes(value, key)}
                </div>
            ))}

            <label htmlFor="price_range">Price Range:</label>
            <div className="range_container">
                <div className="sliders_control">
                    <input
                        id="fromSlider"
                        type="range"
                        value={appliedFilters.min_price}
                        min="0"
                        max="3000"
                        onChange={(e) => updateFilters('min_price', e.target.value)}
                    />
                    <input
                        id="toSlider"
                        type="range"
                        value={appliedFilters.max_price}
                        min="0"
                        max="3000"
                        onChange={(e) => updateFilters('max_price', e.target.value)}
                    />
                </div>
                <span>Min: {appliedFilters.min_price} - Max: {appliedFilters.max_price}</span>
            </div>

            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default MonitorFilters;