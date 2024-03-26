import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ShopCategorySort = ({ onSortChange }) => {
    const handleChange = (event) => {
      const sortType = event.target.value;
      // Vérifiez si onSortChange est une fonction avant de l'appeler
      if (typeof onSortChange === 'function') {
        onSortChange(sortType);
      }
    };
  
    return (
      <FormControl>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={''} // Vous pouvez définir la valeur sélectionnée ici si nécessaire
          onChange={handleChange}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          {/* Autres options de tri */}
        </Select>
      </FormControl>
    );
  };

export default ShopCategorySort;
