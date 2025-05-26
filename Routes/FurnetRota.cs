using FurNet.Data;
using FurNet.Models;
using FurNet.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FurNet.Rotas;

public static class FurnetRota
{
    public static void FurnetRotas(this WebApplication app)
    {
        app.MapGet("/pets", (AppDbContext db) => {    
            var pets = db.Pets.ToList();
             return Results.Ok(pets);});
             
        app.MapGet("/usuarios/{id}", async (int id, AppDbContext db) =>{
            var usuario = await db.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return Results.NotFound("Usuario não encontrado");
            }

            usuario.Senha = null;
            return Results.Ok(usuario);
        });

        app.MapPost("/usuarios", async (CriarUsuarioDTO dto, AppDbContext db) =>
        {
            var usuario = new Usuario 
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Senha = dto.Senha
            };
            
            db.Usuarios.Add(usuario);
            await db.SaveChangesAsync();
            
            return Results.Created($"/usuarios/{usuario.Id}", usuario);
        });

        app.MapPost("/usuarios/login", async (LoginDTO dto, AppDbContext db) =>
        {
            var usuario = await db.Usuarios
                .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Senha == dto.Senha);
            
            if (usuario == null)
            {
                return Results.Unauthorized();
            }

            // Retorna dados do usuário sem a senha
            var usuarioResponse = new 
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email
            };
            
            return Results.Ok(usuarioResponse);
        });

        app.MapPut("/usuarios/senha", async (AlterarSenhaDTO dto, AppDbContext db) =>
        {
            var usuario = await db.Usuarios
                .FirstOrDefaultAsync(u => u.Email == dto.Email);
            
            if (usuario == null)
            {
                return Results.NotFound("Usuario não encontrado");
            }

            usuario.Senha = dto.NovaSenha;
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Senha alterada com sucesso" });
        });

        app.MapPut("/usuarios/{id}", async (int id, CriarUsuarioDTO dto, AppDbContext db) =>
        {
            var usuario = await db.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return Results.NotFound("Usuario não encontrado");
            }
            usuario.Nome = dto.Nome;
            usuario.Email = dto.Email;
            usuario.Senha = dto.Senha;
            await db.SaveChangesAsync();

            return Results.Ok(usuario);
        });

        app.MapDelete("/usuarios/{id}", async (int id, AppDbContext db) =>
        {
            var usuario = await db.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return Results.NotFound("Usuario não encontrado");
            }
            db.Usuarios.Remove(usuario);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

    }
}