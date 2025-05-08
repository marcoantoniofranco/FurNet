using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurNet.Models
{
    public class Postagem
    {
        public int Id {get; set;}
        public string UrlMidia {get; set;}
        public DateTime DataPostagem {get; set;} = DateTime.UtcNow;

        public int PetId {get; set;}
        public Pet Pet {get; set;}
    }
}