import '../custom.css';
import React, { useState, useEffect } from 'react';

export function SizeComponent({ pizza, calculateCost}) {

    const [sizeCheckboxes, setSizeCheckboxes] = useState([
        { id: 'checkbox1', label: 'Small', checked: false },
        { id: 'checkbox2', label: 'Medium', checked: true },
        { id: 'checkbox3', label: 'Large', checked: false },
    ]);

    const handleSizeChange = (id) => {

        const prevCheckboxes = [ ...sizeCheckboxes ];
  
        prevCheckboxes.forEach((checkbox) => {
             if(checkbox.id === id){
                 if(checkbox.checked) return;
                 else{
                     checkbox.checked = true;
                     calculateCost({ ...pizza, Size: checkbox.label });
                 }
             }
             else{
                 checkbox.checked = false;
             }
         }); 
 
         setSizeCheckboxes(prevCheckboxes);
     };

     return(
        <>
            <div className="mb-4">
            <h4>Size:</h4>
            {sizeCheckboxes.map((checkbox) => (
                <div key={checkbox.id} className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={checkbox.id}
                    checked={checkbox.checked}
                    onChange={() => handleSizeChange(checkbox.id)}
                />
                <label className="form-check-label label-color" htmlFor={checkbox.id}>
                    {checkbox.label}
                </label>
                </div>
            ))}
            </div>
        </>
     );
}