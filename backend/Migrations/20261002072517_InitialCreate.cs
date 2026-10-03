using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "authors",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    birthdate = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("authors_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    password_hash = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    role = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValueSql: "'member'::character varying")
                },
                constraints: table =>
                {
                    table.PrimaryKey("users_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    genre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    author_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("books_pkey", x => x.id);
                    table.ForeignKey(
                        name: "books_author_id_foreign",
                        column: x => x.author_id,
                        principalTable: "authors",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "book_copies",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    book_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("book_copies_pkey", x => x.id);
                    table.ForeignKey(
                        name: "book_copies_book_id_foreign",
                        column: x => x.book_id,
                        principalTable: "books",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "reservations",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    copy_id = table.Column<int>(type: "integer", nullable: false),
                    start_date = table.Column<DateOnly>(type: "date", nullable: false),
                    end_date = table.Column<DateOnly>(type: "date", nullable: false),
                    returned_at = table.Column<DateOnly>(type: "date", nullable: true),
                    status = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValueSql: "'Waiting'::character varying")
                },
                constraints: table =>
                {
                    table.PrimaryKey("reservations_pkey", x => x.id);
                    table.ForeignKey(
                        name: "reservations_copy_id_foreign",
                        column: x => x.copy_id,
                        principalTable: "book_copies",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "reservations_user_id_foreign",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "book_copies_book_id_index",
                table: "book_copies",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "books_author_id_index",
                table: "books",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "reservations_copy_id_index",
                table: "reservations",
                column: "copy_id");

            migrationBuilder.CreateIndex(
                name: "reservations_user_id_index",
                table: "reservations",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "users_email_key",
                table: "users",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reservations");

            migrationBuilder.DropTable(
                name: "book_copies");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "books");

            migrationBuilder.DropTable(
                name: "authors");
        }
    }
}
