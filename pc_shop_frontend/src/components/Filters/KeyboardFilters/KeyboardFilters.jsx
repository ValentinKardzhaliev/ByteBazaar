import React, { useState, useEffect } from 'react';
import './KeyboardFilters.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { getAllKeyboardsByQueryParams, getAllCharacteristics } from '../../../services/productService';

const KeyboardFilters = ({ setKeyboards, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        key_switch_type: [],
        backlight: false,
        wireless: false,
        color: [],
        keyboard_format: [],
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

    const handleMinPriceChange = (e) => {
        const newMinPrice = parseInt(e.target.value);
        const newMaxPrice = parseInt(appliedFilters.max_price);

        if (newMinPrice > newMaxPrice) {
            updateFilters('max_price', newMinPrice.toString());
        }
        updateFilters('min_price', newMinPrice.toString());
    };

    const handleMaxPriceChange = (e) => {
        const newMaxPrice = parseInt(e.target.value);
        const newMinPrice = parseInt(appliedFilters.min_price);

        if (newMaxPrice < newMinPrice) {
            updateFilters('min_price', newMaxPrice.toString());
        }
        updateFilters('max_price', newMaxPrice.toString());
    };

    return (
        <div className="keyboard-filters">
            <div className='filter-text-style'>Filters <FontAwesomeIcon icon={faFilter} /></div>
            <div className='btn-keyboard-filters-div'>
                <button className="btn-keyboard-filters" onClick={applyFilters}>Apply Filters</button>
            </div>
            <p><label htmlFor="price_range">Price Range:</label></p>
            <div className="range_container">
                <div className="sliders_control">
                    <input
                        id="fromSlider"
                        type="range"
                        value={appliedFilters.min_price || '0'}
                        min="0"
                        max="500"
                        step={50}
                        onChange={handleMinPriceChange}
                    />
                    <input
                        id="toSlider"
                        type="range"
                        value={appliedFilters.max_price || '500'}
                        min="0"
                        max="500"
                        step={50}
                        onChange={handleMaxPriceChange}
                    />
                </div>
                <span>Min: {appliedFilters.min_price || '0'} - Max: {appliedFilters.max_price || '500'}</span>
            </div>

            {/* Render 'format' and 'layout' characteristics once */}
            {availableCharacteristics.keyboard_format && (
                <div key="keyboard_format">
                    <h3>FORMAT</h3>
                    {renderCheckboxes(availableCharacteristics.keyboard_format, 'keyboard_format')}
                </div>
            )}
            {availableCharacteristics.layout && (
                <div key="layout">
                    <h3>LAYOUT</h3>
                    {renderCheckboxes(availableCharacteristics.layout, 'layout')}
                </div>
            )}

            {/* Render other characteristics */}
            {Object.entries(availableCharacteristics).map(([key, value]) => (
                key !== 'keyboard_format' && key !== 'layout' &&
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

        </div>
    );


};

export default KeyboardFilters;