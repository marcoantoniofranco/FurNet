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
             
        app.MapGet("/usuarios/{id}", async (int id, AppDbContext db) =>{
            var usuario = await db.Usuarios.FindAsync(id);
            if (usuario == null)
                return Results.NotFound("Usuario não encontrado");

            usuario.Senha = null;
            return Results.Ok(usuario);
        });

    }
}