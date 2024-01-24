import React, { useState } from 'react';

const PriceFilter = ({ setComputers }) => {
  const [min_price, setMinPrice] = useState('');
  const [max_price, setMaxPrice] = useState('');

  const handleFilter = () => {

    fetch(`http://127.0.0.1:8000/api/products/computers/?min_price=${min_price}&max_price=${max_price}`)
      .then(res => res.json())
      .then(filteredComputers => {
        setComputers(filteredComputers);
      })
      .catch(err => console.log(err));

  }


  return (
    <div>
      <label htmlFor="startPrice">Start Price:</label>
      <input
        type="text"
        id="startPrice"
        value={min_price}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <label htmlFor="endPrice">End Price:</label>
      <input
        type="text"
        id="endPrice"
        value={max_price}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default PriceFilter;