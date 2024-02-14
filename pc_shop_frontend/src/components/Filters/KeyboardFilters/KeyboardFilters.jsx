import React, { useEffect, useState } from 'react';
import { getAllKeyboardsByQueryParams } from '../../../services/productService';

const KeyboardFilters = ({ setKeyboards, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        key_switch_type: '',
        backlight: false,
        wireless: false,
        color: '',
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
        getAllKeyboardsByQueryParams(queryParams.toString())
            .then((filteredKeyboards) => {
                setKeyboards(filteredKeyboards);
                stopLoading();

            })
            .catch((err) => console.log(err));
    }, [appliedFilters, setKeyboards]);

    return (
        <div>
            <label htmlFor="key_switch_type">Switch type:</label>
            <input
                type="text"
                id="key_switch_type"
                value={appliedFilters.key_switch_type}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, key_switch_type: e.target.value }))}
            />
            <label htmlFor="backlight">Backlight:</label>
            <input
                type="checkbox"
                id="backlight"
                value={appliedFilters.backlight}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, backlight: e.target.checked }))}
            />

            <label htmlFor="wireless">Wireless:</label>
            <input
                type="checkbox"
                id="wireless"
                value={appliedFilters.wireless}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, wireless: e.target.checked }))}
            />

            <label htmlFor="color">Color:</label>
            <input
                type="text"
                id="color"
                value={appliedFilters.color}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, color: e.target.value }))}
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

export default KeyboardFilters;