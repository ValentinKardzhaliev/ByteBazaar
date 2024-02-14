import React, { useEffect, useState } from 'react';
import { getAllComputersByQueryParams, getAllGraphics } from '../../../services/productService';
import Typography from '@material-ui/core/Typography'; 
import Slider from '@material-ui/core/Slider'; 

const ComputerFilters = ({ setComputers, startLoading, stopLoading }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        graphics: [],
        processor: '',
        memory: '',
        storage: '',
        min_price: '',
        max_price: '',
    });
    const [value, setValue] =  React.useState([500,3300]); 
  
    // Changing State when volume increases/decreases 
    const rangeSelector = (event, newValue) => { 
      setValue(newValue); 
      console.log(newValue) 
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
        getAllComputersByQueryParams(queryParams.toString())
            .then((filteredComputers) => {
                setComputers(filteredComputers);
                stopLoading();

            })
            .catch((err) => console.log(err));
    }, [appliedFilters, setComputers]);

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

            <h3>How to create Price Range Selector in ReactJS?</h3> 
            <Typography id="range-slider" gutterBottom> 
              Select Price Range: 
            </Typography> 
            <Slider 
              value={value} 
              onChange={rangeSelector} 
              valueLabelDisplay="auto"
            /> 
            Your range of Price is between {value[0]} /- and {value[1]} /- 
        </div>
    );
};

export default ComputerFilters;