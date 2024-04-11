import React, { useState, useEffect } from 'react';
import { getAllKeyboardsByQueryParams, getAllCharacteristics } from '../../../services/productService';
import './KeyboardFilters.css';

const KeyboardFilters = ({ setKeyboards, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        key_switch_type: [],
        backlight: false,
        wireless: false,
        color: [],
        format: [],
        layout: [],
        polling_rate_hz: [],
        brand: [],
        key_rollover: [],
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
            if (value !== '' && value !== false) {
                queryParams.append(key, Array.isArray(value) ? value.join(',') : value);
            }
        });

        startLoading();

        getAllKeyboardsByQueryParams(queryParams.toString())
            .then(filteredKeyboards => {
                setKeyboards(filteredKeyboards);
                stopLoading();
            })
            .catch(err => console.log(err));
    };


    useEffect(() => {
        startLoading();

        getAllCharacteristics('keyboard')
            .then(characteristics => {
                setAvailableCharacteristics(characteristics.Keyboard);
                stopLoading();
            })
            .catch(err => console.log(err));
    }, []);

    const toggleCheckbox = (filterName, value) => {
        const updatedFilters = [...appliedFilters[filterName] || []];
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
            {characteristic.map(item => {
                // Render checkboxes for all characteristics except boolean ones
                if (typeof item[characteristicName] !== 'boolean') {
                    return (
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
                    );
                }
                // Return null for boolean characteristics to skip rendering them
                return null;
            })}
        </>
    );


    return (
        <div className="keyboard-filters">
            <h2>Keyboard Filters</h2>
            {Object.entries(availableCharacteristics).map(([key, value]) => (
                value.map((currentKey, currentValue) => typeof currentKey[key] == 'boolean' ? null :
                    <div key={currentKey}>
                        <h3>{key.replace('_', ' ').toUpperCase()}</h3>

                        {renderCheckboxes(value, key)}
                    </div>)

            ))}

            <h3>Wireless:</h3>
            <input
                type="checkbox"
                id="wireless"
                checked={appliedFilters.wireless}
                onChange={(e) => updateFilters('wireless', e.target.checked)}
            />
            
            {/* Render 'backlight' checkbox outside the loop */}
            <h3>Backlight:</h3>
            <input
                type="checkbox"
                id="backlight"
                checked={appliedFilters.backlight}
                onChange={(e) => updateFilters('backlight', e.target.checked)}
            />
            <br />

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

            <button className="apply-btn" onClick={applyFilters}>Apply filters</button>
        </div>
    );
};

export default KeyboardFilters;
