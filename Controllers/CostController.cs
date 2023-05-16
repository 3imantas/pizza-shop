using Microsoft.AspNetCore.Mvc;

namespace MyApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CostController : ControllerBase
    {
        [HttpPost("calculate-cost")]
        public ActionResult<double>CalculateCost([FromBody] PizzaRequest pizza)
        {
            double cost = 0.0;

            if( pizza.Size == "Small" )
            {
                cost = 8.0;
            }
            else if( pizza.Size == "Medium" )
            {
                cost = 10.0;
            }
            else if( pizza.Size == "Large" )
            {
                cost = 12.0;
            }

            if( pizza?.Toppings != null )
            {
                cost += pizza.Toppings.Count * 1.0;
                
                if( pizza.Toppings.Count > 3 )
                {
                    cost *= 0.9;
                }
                
            }

            return Ok(cost);
        }
    }
}
