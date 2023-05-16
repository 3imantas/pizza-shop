import React, { useEffect, useState } from 'react';

export function Orders() {
    class PizzaOrderModel {
      constructor(id, name, size, price, toppings) {
        this.id = id;
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
        <h2 className="mb-4">Order History</h2>
        <ul className="list-group">
          {pizzaOrders.map((order) => (
            <li key={order.id} className="list-group-item">
              <p className="mb-1">ID: {order.id}</p>
              <p className="mb-1">Name: {order.name}</p>
              <p className="mb-1">Size: {order.size}</p>
              <p className="mb-1">Price: {order.price}</p>
              <p className="mb-1">Toppings: {order.toppings.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

