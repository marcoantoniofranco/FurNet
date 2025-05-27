using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FurNet.Migrations
{
    /// <inheritdoc />
    public partial class CleanRemovePetId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens");

            migrationBuilder.DropIndex(
                name: "IX_Postagens_PetId",
                table: "Postagens");

            migrationBuilder.DropColumn(
                name: "PetId",
                table: "Postagens");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PetId",
                table: "Postagens",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Postagens_PetId",
                table: "Postagens",
                column: "PetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Postagens_Pets_PetId",
                table: "Postagens",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id");
        }
    }
}
