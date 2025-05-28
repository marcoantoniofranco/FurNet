using Microsoft.EntityFrameworkCore;
using FurNet.Models;
using FurNet.Migrations;

namespace FurNet.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Usuario> Usuarios {get; set;}
        public DbSet<Postagem> Postagens { get; set; }
       public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
    }
}