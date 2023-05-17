import '../custom.css';
import React, { useState, useEffect } from 'react';
import { SizeComponent } from './SizeComponent';
import { ToppingsComponent } from './ToppingsComponent';
import { SubmitOrder } from './SubmitOrder';

export function Home() {

    const [pizza, setPizza] = useState({
        Size: 'Medium',
        Price: 0,
        Toppings: []
      })

    useEffect(() => {
        calculateCost(pizza);
    }, []);

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
        
            setPizza((prevPizza) => ({ ...prevPizza, Price: cost.toFixed(2) }));
        } catch (error) {
            console.error("Error calculating pizza cost:", error);
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
                  <SizeComponent pizza={pizza} calculateCost={calculateCost} />
                  <ToppingsComponent pizza={pizza} calculateCost={calculateCost} />
                  <p>Price: {pizza.Price} €</p>
                  <SubmitOrder pizza={pizza} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
