using System;
using System.Collections.Generic;

namespace FurNet.Models
{
    public class Pet
    {
        public int Id {get; set;}
        public string Nome {get; set;}
        public string Raca {get; set;}
        public int Idade {get; set;}
        public double Peso {get; set;}
        public int UsuarioId {get; set;}
        public Usuario Usuario {get; set;}

        public List<Postagem> Postagens {get; set;} = new();
    }
}