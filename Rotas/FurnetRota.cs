namespace FurNet.Rotas;

public static class FurnetRota
{
    public static void FurnetRotas(this WebApplication app)
    {
        app.MapGet("home", () => "Bem vindo");
    }
}