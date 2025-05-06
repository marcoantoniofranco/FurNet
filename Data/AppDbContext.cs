using Microsoft.EntityFrameworkCore;

namespace FurNet.Rotas.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options){}
    
    public DbSet<Pet> Pets {get; set;}
}