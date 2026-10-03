using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Migrations
{
    /// <inheritdoc />
    public partial class Removed_Author_From_Book : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "books_author_id_foreign",
                table: "books");

            migrationBuilder.AddForeignKey(
                name: "FK_books_authors_author_id",
                table: "books",
                column: "author_id",
                principalTable: "authors",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_books_authors_author_id",
                table: "books");

            migrationBuilder.AddForeignKey(
                name: "books_author_id_foreign",
                table: "books",
                column: "author_id",
                principalTable: "authors",
                principalColumn: "id");
        }
    }
}
