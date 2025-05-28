using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FurNet.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePostagemModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UrlMidia",
                table: "Postagens",
                newName: "TipoArquivo");

            migrationBuilder.AddColumn<byte[]>(
                name: "DadosArquivo",
                table: "Postagens",
                type: "BLOB",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Postagens",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NomeArquivo",
                table: "Postagens",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DadosArquivo",
                table: "Postagens");

            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Postagens");

            migrationBuilder.DropColumn(
                name: "NomeArquivo",
                table: "Postagens");

            migrationBuilder.RenameColumn(
                name: "TipoArquivo",
                table: "Postagens",
                newName: "UrlMidia");
        }
    }
}
