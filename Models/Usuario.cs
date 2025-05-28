namespace FurNet.Models;

public class Usuario
{
   public int Id {get; set;}
   public string Nome {get; set;}
   public string Email {get; set;}
   public string Senha {get; set;}

   public List<Pet> Pets {get; set;} = new();

   public bool IsValidEmail()
    {
        if (string.IsNullOrEmpty(Email))
            return false;
            
        // Verifica: texto + @ + texto + . + texto (sem espaços)
        var emailRegex = new System.Text.RegularExpressions.Regex(
            @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        return emailRegex.IsMatch(Email);
    }
}