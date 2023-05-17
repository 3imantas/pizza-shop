import '../custom.css';
import React, { useState, useEffect } from 'react';

export function SubmitOrder({ pizza }) {

    const [orderSubmitted, setOrderSubmitted] = useState(false);
    
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
            //console.log("Order Successfully Submitted")
        
        } catch (error) {
            console.error("Error submitting new order: ", error);
        }
    };

     return(
        <>
            <button className="btn btn-primary" onClick={handleSubmitOrder}>
                Submit Order
            </button>
            <div>
            {orderSubmitted && (
                <div className="alert alert-success position-fixed bottom-0 end-0 m-3" role="alert">
                    Order submitted successfully!
                </div>
            )}
            </div>
        </>
     );
}