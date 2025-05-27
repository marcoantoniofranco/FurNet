using FurNet.Data;
using FurNet.Models;
using FurNet.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FurNet.Rotas;

public static class FurnetRota
{
    public static void FurnetRotas(this WebApplication app)
    {
        app.MapGet("/categorias", (AppDbContext db) =>
        {
            var categorias = new[] { "Cachorro", "Gato", "Pássaro", "Peixe", "Hamster", "Coelho" };
            return Results.Ok(categorias);
        });
             
        app.MapGet("/usuarios/{id}", async (int id, AppDbContext db) =>
        {
            var usuario = await db.Usuarios.FindAsync(id);
            if (usuario == null)
                return Results.NotFound("Usuario não encontrado");

            usuario.Senha = null; // Remove senha da resposta por segurança
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
                return Results.Unauthorized();

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
                return Results.NotFound("Usuario não encontrado");

            usuario.Senha = dto.NovaSenha;
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Senha alterada com sucesso" });
        });

        app.MapPut("/usuarios/{id}", async (int id, CriarUsuarioDTO dto, AppDbContext db) =>
        {
            var usuario = await db.Usuarios.FindAsync(id);
            if (usuario == null)
                return Results.NotFound("Usuario não encontrado");
                
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
                return Results.NotFound("Usuario não encontrado");
                
            db.Usuarios.Remove(usuario);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapGet("/postagens", async (AppDbContext db) =>
        {
            var postagens = await db.Postagens
                .OrderByDescending(p => p.DataPostagem)
                .ToListAsync();
            
            return Results.Ok(postagens);
        });

        app.MapGet("/postagens/{id}", async (int id, AppDbContext db) =>
        {
            var postagem = await db.Postagens.FirstOrDefaultAsync(p => p.Id == id);
            
            if (postagem == null)
                return Results.NotFound("Postagem não encontrada");
            
            return Results.Ok(postagem);
        });

        app.MapPost("/postagens", async (CriarPostagemDTO dto, AppDbContext db) =>
        {
            var postagem = new Postagem
            {
                NomeArquivo = dto.NomeArquivo,
                TipoArquivo = dto.TipoArquivo,
                DadosArquivo = dto.DadosArquivo,
                Descricao = dto.Descricao,
                Categoria = dto.Categoria,
                NomeUsuario = dto.NomeUsuario
            };

            db.Postagens.Add(postagem);
            await db.SaveChangesAsync();

            return Results.Created($"/postagens/{postagem.Id}", postagem);
        });

        app.MapDelete("/postagens/{id}", async (int id, AppDbContext db) =>
        {
            var postagem = await db.Postagens.FindAsync(id);
            if (postagem == null)
                return Results.NotFound("Postagem não encontrada");

            db.Postagens.Remove(postagem);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapGet("/postagens/categoria/{categoria}", async (string categoria, AppDbContext db) =>
        {
            var postagens = await db.Postagens
                .Where(p => p.Categoria == categoria)
                .OrderByDescending(p => p.DataPostagem)
                .ToListAsync();
            
            return Results.Ok(postagens);
        });



    }
}