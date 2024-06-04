using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveMultiSiteAndGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupUser");

            migrationBuilder.DropTable(
                name: "SiteUser");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "71caedc9-c149-4a85-9dd4-cf6a9ff2568c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e661da5d-8ef4-4c77-b0aa-916141d67f46");

            migrationBuilder.RenameColumn(
                name: "DefaultSite",
                table: "AspNetUsers",
                newName: "SiteId");

            migrationBuilder.RenameColumn(
                name: "DefaultGroup",
                table: "AspNetUsers",
                newName: "GroupId");

            migrationBuilder.RenameColumn(
                name: "AccountStatus",
                table: "AspNetUsers",
                newName: "Status");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bb23d31b-271b-4fe7-9eeb-3146b828b0b6", null, "Admin", "ADMIN" },
                    { "cf6d730e-d618-4437-bbb0-d0b6c33b6199", null, "Member", "MEMBER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GroupId",
                table: "AspNetUsers",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_SiteId",
                table: "AspNetUsers",
                column: "SiteId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Groups_GroupId",
                table: "AspNetUsers",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Sites_SiteId",
                table: "AspNetUsers",
                column: "SiteId",
                principalTable: "Sites",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Groups_GroupId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Sites_SiteId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GroupId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_SiteId",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bb23d31b-271b-4fe7-9eeb-3146b828b0b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf6d730e-d618-4437-bbb0-d0b6c33b6199");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "AspNetUsers",
                newName: "AccountStatus");

            migrationBuilder.RenameColumn(
                name: "SiteId",
                table: "AspNetUsers",
                newName: "DefaultSite");

            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "AspNetUsers",
                newName: "DefaultGroup");

            migrationBuilder.CreateTable(
                name: "GroupUser",
                columns: table => new
                {
                    GroupsId = table.Column<string>(type: "text", nullable: false),
                    UsersId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupUser", x => new { x.GroupsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_GroupUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupUser_Groups_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SiteUser",
                columns: table => new
                {
                    SitesId = table.Column<string>(type: "text", nullable: false),
                    UsersId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteUser", x => new { x.SitesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_SiteUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SiteUser_Sites_SitesId",
                        column: x => x.SitesId,
                        principalTable: "Sites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "71caedc9-c149-4a85-9dd4-cf6a9ff2568c", null, "Member", "MEMBER" },
                    { "e661da5d-8ef4-4c77-b0aa-916141d67f46", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupUser_UsersId",
                table: "GroupUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteUser_UsersId",
                table: "SiteUser",
                column: "UsersId");
        }
    }
}
