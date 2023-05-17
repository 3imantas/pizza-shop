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
