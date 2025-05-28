using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FurNet.Migrations
{
    /// <inheritdoc />
    public partial class AddNomeUsuarioToPostagem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NomeUsuario",
                table: "Postagens",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NomeUsuario",
                table: "Postagens");
        }
    }
}
