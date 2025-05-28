using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FurNet.Migrations
{
    /// <inheritdoc />
    public partial class ChangePostagemToCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens");

            migrationBuilder.AlterColumn<int>(
                name: "PetId",
                table: "Postagens",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Postagens",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens");

            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Postagens");

            migrationBuilder.AlterColumn<int>(
                name: "PetId",
                table: "Postagens",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
