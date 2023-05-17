import '../custom.css';
import React, { useState, useEffect } from 'react';

export function Home() {

    const [sizeCheckboxes, setSizeCheckboxes] = useState([
        { id: 'checkbox1', label: 'Small', checked: false },
        { id: 'checkbox2', label: 'Medium', checked: true },
        { id: 'checkbox3', label: 'Large', checked: false },
    ]);

    const toppingCheckboxes = ["Pepperoni","Mushrooms","Onions","Sausage","Bacon","Extra cheese"]

    const [pizza, setPizza] = useState({
        Size: 'Medium',
        Price: 0,
        Toppings: []
      })

    const [orderSubmitted, setOrderSubmitted] = useState(false);

    useEffect(() => {
        calculateCost(pizza);
    }, []);

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
                /*
        setCheckboxes((prevCheckboxes) => {
          return prevCheckboxes.map((checkbox) =>
            checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
          );
        });
        */
    };

    const handleToppingChange = (event) => {
        const { name, checked } = event.target;
      
        if (checked) {
          calculateCost({...pizza, Toppings: [...pizza.Toppings, name]});
        } else {
          calculateCost({ ...pizza, Toppings: pizza.Toppings.filter((item) => item !== name) });

        }
      };


    const calculateCost = async (pizza) => {
        setPizza(pizza);
        try {
            const response = await fetch("/api/cost/calculate-cost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pizza),
            });
        
            if (!response.ok) {
            throw new Error("Error calculating pizza cost.");
            }
        
            const cost = await response.json();
        
            // Do something with the calculated cost value
            //console.log("Calculated cost:", cost);
            setPizza((prevPizza) => ({ ...prevPizza, Price: cost.toFixed(2) }));
        } catch (error) {
            // Handle any errors
            console.error("Error calculating pizza cost:", error);
        }
    };

    const handleSubmitOrder = async () => {
        try {
            const response = await fetch("/api/orderhistory/add-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pizza),
            });
        
            if (!response.ok) {
            throw new Error("response was not ok.");
            }
            
            setOrderSubmitted(true);
            setTimeout(() => {
                setOrderSubmitted(false);
            }, 2000)
            console.log("Order Successfully Submitted")
        
        } catch (error) {
            console.error("Error submitting new order: ", error);
        }
    };

      

    return (
        <div className='main'>
          <div className="container-fluid bg-grey min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row bg-white px-5 py-5 pe-1 rounded-5">
              <div className="col-lg-6">
                <img className="img-fluid" src={require('../pizza.jpg')} alt="pizza" />
              </div>
              <div className="col-lg-6">
                <div className="ps-4">
                  <h2>Customize Your Pizza</h2>
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
                  <p>Price: {pizza.Price} €</p>
                  <button className="btn btn-primary" onClick={handleSubmitOrder}>
                    Submit Order
                  </button>
                </div>
              </div>
            </div>
            </div>
            <div>
            {/* Your component JSX */}
            {orderSubmitted && (
                <div className="alert alert-success position-fixed bottom-0 end-0 m-3" role="alert">
                    Order submitted successfully!
                </div>
            )}
            </div>
        </div>
      );
      
      
      
      
      
      
      
}
