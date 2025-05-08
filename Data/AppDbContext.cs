using Microsoft.EntityFrameworkCore;
using FurNet.Models;

namespace FurNet.Data
{
    public class AppDbContext : DbContext
    {
       public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
       public DbSet<Pet> Pets { get; set; }
    }
}