using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
// ...

public class Topping 
{
    public int ToppingId { get; set; }
    public string? Name { get; set; }

    public int PizzaOrderId { get; set; }

    [ForeignKey("PizzaOrderId")]
    public PizzaOrder? PizzaOrder { get; set; }
}
