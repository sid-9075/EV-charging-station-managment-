using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ChargingStation.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChargingStations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LocationAddress = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    PinCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ConnectorType = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    LocationLink = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChargingStations", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ChargingStations",
                columns: new[] { "Id", "ConnectorType", "CreatedAt", "ImageUrl", "LocationAddress", "LocationLink", "Name", "PinCode", "UpdatedAt" },
                values: new object[] { 1, 0, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "https://placehold.co/400x200?text=Station+1", "MG Road, Pune", "https://maps.google.com/?q=MG+Road+Pune", "Pune Central Hub", "411001", null });

            migrationBuilder.InsertData(
                table: "ChargingStations",
                columns: new[] { "Id", "ConnectorType", "CreatedAt", "ImageUrl", "LocationAddress", "LocationLink", "Name", "PinCode", "Status", "UpdatedAt" },
                values: new object[,]
                {
                    { 2, 1, new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "https://placehold.co/400x200?text=Station+2", "Baner Road, Pune", "https://maps.google.com/?q=Baner+Road+Pune", "Baner EV Point", "411045", 1, null },
                    { 3, 2, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "https://placehold.co/400x200?text=Station+3", "Hinjewadi Phase 1, Pune", "https://maps.google.com/?q=Hinjewadi+Pune", "Hinjewadi Tech Park", "411057", 2, null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChargingStations");
        }
    }
}
