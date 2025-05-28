using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FurNet.Migrations
{
    /// <inheritdoc />
    public partial class AddEspecieToPet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pets_Usuario_UsuarioId",
                table: "Pets");

            migrationBuilder.DropForeignKey(
                name: "FK_Postagem_Pets_PetId",
                table: "Postagem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Postagem",
                table: "Postagem");

            migrationBuilder.RenameTable(
                name: "Usuario",
                newName: "Usuarios");

            migrationBuilder.RenameTable(
                name: "Postagem",
                newName: "Postagens");

            migrationBuilder.RenameIndex(
                name: "IX_Postagem_PetId",
                table: "Postagens",
                newName: "IX_Postagens_PetId");

            migrationBuilder.AddColumn<string>(
                name: "Especie",
                table: "Pets",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usuarios",
                table: "Usuarios",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Postagens",
                table: "Postagens",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pets_Usuarios_UsuarioId",
                table: "Pets",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pets_Usuarios_UsuarioId",
                table: "Pets");

            migrationBuilder.DropForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usuarios",
                table: "Usuarios");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Postagens",
                table: "Postagens");

            migrationBuilder.DropColumn(
                name: "Especie",
                table: "Pets");

            migrationBuilder.RenameTable(
                name: "Usuarios",
                newName: "Usuario");

            migrationBuilder.RenameTable(
                name: "Postagens",
                newName: "Postagem");

            migrationBuilder.RenameIndex(
                name: "IX_Postagens_PetId",
                table: "Postagem",
                newName: "IX_Postagem_PetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Postagem",
                table: "Postagem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pets_Usuario_UsuarioId",
                table: "Pets",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Postagem_Pets_PetId",
                table: "Postagem",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
