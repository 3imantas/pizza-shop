using Microsoft.EntityFrameworkCore;

public class PizzaShopContext :DbContext
{
    public PizzaShopContext(DbContextOptions<PizzaShopContext> options) : base(options)
    {
    }
    public DbSet<PizzaOrder>? PizzaOrders { get; set; }
    public DbSet<Topping>? Toppings { get; set; }

}