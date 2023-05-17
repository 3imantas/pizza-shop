using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class PizzaOrder
{
    [Key]
    public int PizzaOrderId { get; set; }

    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm:ss}")]
    public DateTime Date { get; set; } = DateTime.Now;
    public string FormattedDate => Date.ToString("yyyy-MM-dd HH:mm:ss");
    public string? Name { get; set; }
    public string? Size { get; set; }

    public List<Topping>? Toppings { get; set; }
    public double Price { get; set; }
}