using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Attendences",
                table: "Attendences");

            migrationBuilder.DropColumn(
                name: "AttendDateTime",
                table: "Attendences");

            migrationBuilder.AddColumn<DateOnly>(
                name: "Day",
                table: "Attendences",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attendences",
                table: "Attendences",
                columns: new[] { "EmpId", "Day" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Attendences",
                table: "Attendences");

            migrationBuilder.DropColumn(
                name: "Day",
                table: "Attendences");

            migrationBuilder.AddColumn<DateTime>(
                name: "AttendDateTime",
                table: "Attendences",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attendences",
                table: "Attendences",
                columns: new[] { "EmpId", "AttendDateTime" });
        }
    }
}
