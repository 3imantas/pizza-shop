using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class DatabaseTester
{
    public void TestDatabase()
    {
        var options = new DbContextOptionsBuilder<PizzaShopContext>()
            .UseInMemoryDatabase("PizzaShopDB")
            .Options;

        using (var dbContext = new PizzaShopContext(options))
        {
            var pizzaOrder = new PizzaOrder
            {
                Name = "Margherita",
                Size = "Medium",
                Price = 10
            };

            dbContext.PizzaOrders?.Add(pizzaOrder);
            dbContext.SaveChanges();

            // Add toppings to the pizza order after it is saved
            var cheeseTopping = new Topping { Name = "Cheese", PizzaOrder = pizzaOrder };
            var tomatoTopping = new Topping { Name = "Tomato", PizzaOrder = pizzaOrder };
            dbContext.Toppings?.AddRange(cheeseTopping, tomatoTopping);
            dbContext.SaveChanges();
        }

        using (var dbContext = new PizzaShopContext(options))
        {
            var pizzaOrders = dbContext.PizzaOrders?.Include(po => po.Toppings).ToList();

            if (pizzaOrders != null)
            {
                foreach (var pizzaOrder in pizzaOrders)
                {
                    Console.WriteLine($"Pizza Order ID: {pizzaOrder.PizzaOrderId}");
                    Console.WriteLine($"Name: {pizzaOrder.Name}");
                    Console.WriteLine($"Size: {pizzaOrder.Size}");
                    Console.WriteLine($"Price: {pizzaOrder.Price}");
                    Console.WriteLine("Toppings:");

                    if (pizzaOrder.Toppings != null)
                    {
                        foreach (var topping in pizzaOrder.Toppings)
                        {
                            Console.WriteLine($"- {topping.Name}");
                        }
                    }

                    Console.WriteLine();
                }
            }
        }
    }



}