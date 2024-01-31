import React, { useEffect, useState } from 'react';

const ComputerFilters = ({ setComputers, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        graphics: [],
        processor: '',
        memory: '',
        storage: '',
        min_price: '',
        max_price: '',
    });

    const [availableGraphics, setAvailableGraphics] = useState([]);

    useEffect(() => {
        startLoading();
        // Fetch available graphics from the API
        fetch('http://127.0.0.1:8000/api/products/graphics-count/')
            .then((res) => res.json())
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

    useEffect(() => {
        applyFilters();
    }, [appliedFilters, setComputers]);

    const applyFilters = () => {
        const queryParams = new URLSearchParams();

        // Add individual filters to queryParams
        Object.entries(appliedFilters).forEach(([key, value]) => {
            if (value) {
                // If the value is an array, join it with commas
                queryParams.append(key, Array.isArray(value) ? value.join(',') : value);
            }
        });

        // Fetch computers based on all applied filters
        fetch(`http://127.0.0.1:8000/api/products/computers/?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((filteredComputers) => setComputers(filteredComputers))
            .catch((err) => console.log(err));
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
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, processor: e.target.value }))}
            />
            <label htmlFor="storage">Storage:</label>
            <input
                type="text"
                id="storage"
                value={appliedFilters.storage}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, storage: e.target.value }))}
            />
            <label htmlFor="memory">Memory:</label>
            <input
                type="text"
                id="memory"
                value={appliedFilters.memory}
                onChange={(e) => setAppliedFilters((prevFilters) => ({ ...prevFilters, memory: e.target.value }))}
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

export default ComputerFilters;