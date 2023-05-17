import '../custom.css';
import React, { useState, useEffect } from 'react';

export function ToppingsComponent({ pizza, calculateCost}) {

    const toppingCheckboxes = ["Pepperoni","Mushrooms","Onions","Sausage","Bacon","Extra cheese"]

    const handleToppingChange = (event) => {
        const { name, checked } = event.target;
      
        if (checked) {
          calculateCost({...pizza, Toppings: [...pizza.Toppings, name]});
        } else {
          calculateCost({ ...pizza, Toppings: pizza.Toppings.filter((item) => item !== name) });

        }
      };

     return(
        <>
            <div className="mb-4">
                <h4>Toppings:</h4>
                {toppingCheckboxes.map((checkbox, index) => (
                    <div key={index} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name={toppingCheckboxes[index]}
                        checked={pizza.Toppings.includes(toppingCheckboxes[index])}
                        onChange={handleToppingChange}
                    />
                    <label className="form-check-label label-color" htmlFor={index}>
                        {toppingCheckboxes[index]}
                    </label>
                    </div>
                ))}
                </div>
        </>
     );
}