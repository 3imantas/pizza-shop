using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace MyApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderHistoryController : ControllerBase
    {
        private readonly PizzaShopContext _db;

        public OrderHistoryController(PizzaShopContext db)
        {
            _db = db;
        }

        [HttpPost("add-order")]
        public IActionResult AddOrder([FromBody] PizzaRequest pizza)
        {
            
            var pizzaOrder = new PizzaOrder
            {
                Name = "Pizza",
                Size = pizza.Size,
                Price = pizza.Price
            };

            _db.PizzaOrders?.Add(pizzaOrder);
            _db.SaveChanges();


            if (pizza.Toppings != null)
            {
                foreach (var topping in pizza.Toppings)
                {
                    _db.Toppings?.Add(new Topping { Name = topping, PizzaOrder = pizzaOrder });
                }
                _db.SaveChanges();
            }
            
            /*
                var pizzaOrders = _db.PizzaOrders?.Include(po => po.Toppings).ToList();

                if (pizzaOrders != null)
                {
                    foreach (var pizzaOrderr in pizzaOrders)
                    {
                        Console.WriteLine($"Pizza Order ID: {pizzaOrderr.PizzaOrderId}");
                        Console.WriteLine($"Name: {pizzaOrderr.Name}");
                        Console.WriteLine($"Size: {pizzaOrderr.Size}");
                        Console.WriteLine($"Price: {pizzaOrderr.Price}");
                        Console.WriteLine("Toppings:");

                        if (pizzaOrderr.Toppings != null)
                        {
                            foreach (var topping in pizzaOrderr.Toppings)
                            {
                                Console.WriteLine($"- {topping.Name}");
                            }
                        }

                        Console.WriteLine();
                    }
                }
            */
            return Ok();
        }

        [HttpGet("get-orders")]
        public IActionResult GetOrders()
        {
            if(_db.PizzaOrders != null)
            {
                var pizzaOrders = _db.PizzaOrders.Include(po => po.Toppings).ToList();
                return Ok(pizzaOrders);
            }
            return NotFound();
        }
    }
}
