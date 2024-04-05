import React, { useState } from 'react';
import { getAllKeyboardsByQueryParams } from '../../../services/productService';
import './KeyboardFilters.css';

const KeyboardFilters = ({ setKeyboards, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        key_switch_type: '',
        backlight: false,
        wireless: false,
        color: '',
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

        // Fetch keyboards based on all applied filters
        getAllKeyboardsByQueryParams(queryParams.toString())
            .then((filteredKeyboards) => {
                setKeyboards(filteredKeyboards);
                stopLoading();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="keyboard-filters">
            <label htmlFor="key_switch_type">Switch type:</label>
            <input
                type="text"
                id="key_switch_type"
                value={appliedFilters.key_switch_type}
                onChange={(e) => updateFilters('key_switch_type', e.target.value)}
            />

            <label htmlFor="backlight">Backlight:</label>
            <input
                type="checkbox"
                id="backlight"
                checked={appliedFilters.backlight}
                onChange={(e) => updateFilters('backlight', e.target.checked)}
            />

            <label htmlFor="wireless">Wireless:</label>
            <input
                type="checkbox"
                id="wireless"
                checked={appliedFilters.wireless}
                onChange={(e) => updateFilters('wireless', e.target.checked)}
            />

            <label htmlFor="color">Color:</label>
            <input
                type="text"
                id="color"
                value={appliedFilters.color}
                onChange={(e) => updateFilters('color', e.target.value)}
            />

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