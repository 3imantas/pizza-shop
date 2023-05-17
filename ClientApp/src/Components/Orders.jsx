import React, { useEffect, useState } from 'react';

export function Orders() {
    class PizzaOrderModel {
      constructor(id, formattedDate, name, size, price, toppings) {
        this.id = id;
        this.formattedDate = formattedDate;
        this.name = name;
        this.size = size;
        this.price = price;
        this.toppings = toppings.map((topping) => topping.name);
      }
    }
  
    const [pizzaOrders, setPizzaOrders] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/orderhistory/get-orders');
          const data = await response.json();
          console.log(data);
          const orders = data.map(
            (order) => {
              return new PizzaOrderModel(
                order.pizzaOrderId,
                order.formattedDate,
                order.name,
                order.size,
                order.price.toFixed(2),
                order.toppings
              )
            }
          );
          setPizzaOrders(orders);
        } catch (error) {
          console.error('Error fetching pizza orders:', error);
        }
      };
  
      fetchData();
    }, []);
  
    // Render the pizza orders
    return (
      <div>
        <h2 className="p-4">Order History</h2>
        <ul className="list-group ps-5 pe-5">
          {pizzaOrders.map((order) => (
            <li key={order.id} className="list-group-item">
              <p className="mb-1"><b>{order.name}</b></p>
              <p className="mb-1"><b>Order Id:</b> {order.id}</p>
              <p className="mb-1"><b>Date:</b> {order.formattedDate}</p>
              <p className="mb-1"><b>Size:</b> {order.size}</p>
              {order.toppings.length > 0 &&
                <p className="mb-1 font-weight-bold"><b>Toppings:</b> {order.toppings.join(', ')}</p>
              }
              <p className="mb-1"><b>Price:</b> {order.price} €</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

