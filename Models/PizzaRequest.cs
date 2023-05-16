using System.Collections.Generic;
using System.Text.Json.Serialization;

public class PizzaRequest
{
    public string? Size { get; set; }
    public double Price { get; set; }
    public List<string>? Toppings { get; set; }
}