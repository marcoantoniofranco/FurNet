namespace FurNet.DTOs
{
    public class CriarPostagemDTO
    {
        public string NomeArquivo { get; set; }
        public string TipoArquivo { get; set; }
        public byte[] DadosArquivo { get; set; }
        public string Descricao { get; set; }
        public string Categoria { get; set; }
        public string NomeUsuario { get; set; }
    }
} 