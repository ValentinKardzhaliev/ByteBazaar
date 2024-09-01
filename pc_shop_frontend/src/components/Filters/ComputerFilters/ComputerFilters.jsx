import React, { useEffect, useState } from 'react';
import './ComputerFilters.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { getAllComputersByQueryParams, getAllCharacteristics } from '../../../services/productService';

const ComputerFilters = ({ setComputers, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        graphics: [],
        processor: [],
        memory: [],
        storage: [],
        cooler: [],
        motherboard: [],
        power_supply: [],
        operating_system: [],
        case: [],
        cooling_solution: [],
        network: [],
        min_price: '',
        max_price: '',
    });

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

        getAllComputersByQueryParams(queryParams.toString())
            .then(filteredComputers => {
                setComputers(filteredComputers);
                stopLoading();
            })
            .catch(err => console.log(err));
    };

    const [availableCharacteristics, setAvailableCharacteristics] = useState({});

    useEffect(() => {
        startLoading();

        getAllCharacteristics('computer')
            .then(characteristics => {
                setAvailableCharacteristics(characteristics.Computer);
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
        <div className='filters-container'>
            <div className='filter-text-style'>Filters <FontAwesomeIcon icon={faFilter} /></div>
            <div className='btn-computer-filters-div'>
                <button className='btn-computer-filters' onClick={applyFilters}>Apply Filters</button>
            </div>
            <p><label htmlFor="price_range">Price Range:</label></p>
            <div className="range_container">
                <div className="sliders_control">
                    <input
                        id="fromSlider"
                        type="range"
                        value={appliedFilters.min_price || '0'}
                        min="0"
                        max="3000"
                        step={50}
                        onChange={handleMinPriceChange}
                    />
                    <input
                        id="toSlider"
                        type="range"
                        value={appliedFilters.max_price || '3000'}
                        min="0"
                        max="3000"
                        step={50}
                        onChange={handleMaxPriceChange}
                    />
                </div>
                <span>Min: {appliedFilters.min_price || '0'} - Max: {appliedFilters.max_price || '3000'}</span>
            </div>
            {Object.entries(availableCharacteristics).map(([key, value]) => (
                <div key={key}>
                    <h3>{key.replace('_', ' ').toUpperCase()}</h3>
                    {renderCheckboxes(value, key)}
                </div>
            ))}


        </div>
    );
};

export default ComputerFilters;
