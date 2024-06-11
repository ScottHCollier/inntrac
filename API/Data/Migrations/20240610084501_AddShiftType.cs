using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddShiftType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6dd64e85-65f9-4fec-8fa8-0a2fe558c57f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fdd37619-4b96-467a-97fe-d8cb51edd38d");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Shifts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "31cb0272-ac1a-4f18-91cb-3dbb5f690c4c", null, "Member", "MEMBER" },
                    { "b97a8fd1-4e14-4362-90c7-b7c378cb3814", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "31cb0272-ac1a-4f18-91cb-3dbb5f690c4c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b97a8fd1-4e14-4362-90c7-b7c378cb3814");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Shifts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6dd64e85-65f9-4fec-8fa8-0a2fe558c57f", null, "Admin", "ADMIN" },
                    { "fdd37619-4b96-467a-97fe-d8cb51edd38d", null, "Member", "MEMBER" }
                });
        }
    }
}
