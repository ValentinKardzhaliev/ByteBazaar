import React, { useEffect, useState } from 'react';
import { getAllComputersByQueryParams, getAllGraphics } from '../../../services/productService';

const ComputerFilters = ({ setComputers, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        graphics: [],
        processor: '',
        memory: '',
        storage: '',
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
        // Fetch computers based on all applied filters
        getAllComputersByQueryParams(queryParams.toString())
            .then((filteredComputers) => {
                setComputers(filteredComputers);
                stopLoading();
            })
            .catch((err) => console.log(err));
    };
    const [availableGraphics, setAvailableGraphics] = useState([]);

    useEffect(() => {
        startLoading();
        // Fetch available graphics from the API
        getAllGraphics()
            .then((graphicsCounts) => {
                setAvailableGraphics(graphicsCounts);
                stopLoading();
            })
            .catch((err) => console.log(err));
    }, []);

    const handleCheckboxChange = (selectedGraphics) => {
        setAppliedFilters((prevFilters) => ({
            ...prevFilters,
            graphics: selectedGraphics,
        }));
    };

    const toggleCheckbox = (graphic) => {
        if (appliedFilters.graphics.includes(graphic)) {
            // If the graphic is already selected, remove it
            handleCheckboxChange(appliedFilters.graphics.filter((g) => g !== graphic));
        } else {
            // If the graphic is not selected, add it
            handleCheckboxChange([...appliedFilters.graphics, graphic]);
        }
    };
    
    return (
        <div>
            <h2>Graphics Filter</h2>
            {availableGraphics.map(({ graphics, count }) => (
                <label key={graphics}>
                    <input
                        type="checkbox"
                        value={graphics}
                        checked={appliedFilters.graphics.includes(graphics)}
                        onChange={() => toggleCheckbox(graphics)}
                    />
                    {`${graphics} (${count})`}
                    <br />
                </label>
            ))}

            <label htmlFor="processor">Processor:</label>
            <input
                type="text"
                id="processor"
                value={appliedFilters.processor}
                onChange={(e) => updateFilters('processor', e.target.value)}
            />
            <label htmlFor="storage">Storage:</label>
            <input
                type="text"
                id="storage"
                value={appliedFilters.storage}
                onChange={(e) => updateFilters('storage', e.target.value)}
            />
            <label htmlFor="memory">Memory:</label>
            <input
                type="text"
                id="memory"
                value={appliedFilters.memory}
                onChange={(e) => updateFilters('memory', e.target.value)}
            />

            <label htmlFor="min_price">Min Price:</label>
            <input
                type="range"
                id="min_price"
                min="0"
                max="3300"  // Adjust the max value as needed
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
                max="3300"  // Adjust the max value as needed
                step="50"   // Adjust the step value as needed
                value={appliedFilters.max_price}
                onChange={(e) => updateFilters('max_price', e.target.value)}
            />
            <span>{appliedFilters.max_price}</span>

            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default ComputerFilters;