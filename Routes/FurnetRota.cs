using FurNet.Data;

namespace FurNet.Rotas;

public static class FurnetRota
{
    public static void FurnetRotas(this WebApplication app)
    {
        app.MapGet("home", () => "Bem vindo");
        app.MapGet("/pets", (AppDbContext db) => {    
            var pets = db.Pets.ToList();
             return Results.Ok(pets);});

    }
}