using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class PizzaOrder
{
    [Key]
    public int PizzaOrderId { get; set; }
    public string? Name { get; set; }
    public string? Size { get; set; }

    public List<Topping>? Toppings { get; set; }
    public double Price { get; set; }
}