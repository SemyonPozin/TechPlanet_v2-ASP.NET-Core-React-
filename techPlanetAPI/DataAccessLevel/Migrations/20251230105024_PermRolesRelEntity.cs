using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLevel.Migrations
{
    /// <inheritdoc />
    public partial class PermRolesRelEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PermissionEntityRoleEntity");

            migrationBuilder.CreateTable(
                name: "PermissionsRolesRelationEntity",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    PermissionId = table.Column<int>(type: "integer", nullable: false),
                    PermissionEntityId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionsRolesRelationEntity", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_PermissionsRolesRelationEntity_Permissions_PermissionEntity~",
                        column: x => x.PermissionEntityId,
                        principalTable: "Permissions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PermissionsRolesRelationEntity_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PermissionsRolesRelationEntity_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "PermissionsRolesRelationEntity",
                columns: new[] { "PermissionId", "RoleId", "PermissionEntityId" },
                values: new object[,]
                {
                    { 1, 1, null },
                    { 2, 1, null },
                    { 1, 2, null },
                    { 2, 2, null },
                    { 3, 2, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PermissionsRolesRelationEntity_PermissionEntityId",
                table: "PermissionsRolesRelationEntity",
                column: "PermissionEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionsRolesRelationEntity_PermissionId",
                table: "PermissionsRolesRelationEntity",
                column: "PermissionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PermissionsRolesRelationEntity");

            migrationBuilder.CreateTable(
                name: "PermissionEntityRoleEntity",
                columns: table => new
                {
                    PermissionsId = table.Column<int>(type: "integer", nullable: false),
                    RoleEntityId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionEntityRoleEntity", x => new { x.PermissionsId, x.RoleEntityId });
                    table.ForeignKey(
                        name: "FK_PermissionEntityRoleEntity_Permissions_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PermissionEntityRoleEntity_Roles_RoleEntityId",
                        column: x => x.RoleEntityId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PermissionEntityRoleEntity_RoleEntityId",
                table: "PermissionEntityRoleEntity",
                column: "RoleEntityId");
        }
    }
}
