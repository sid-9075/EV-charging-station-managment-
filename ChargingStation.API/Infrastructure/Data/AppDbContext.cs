using ChargingStation.API.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ChargingStation.API.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<ChargingStation.API.Domain.Entities.ChargingStation> ChargingStations => Set<ChargingStation.API.Domain.Entities.ChargingStation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChargingStation.API.Domain.Entities.ChargingStation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.LocationAddress).IsRequired().HasMaxLength(250);
            entity.Property(e => e.PinCode).IsRequired().HasMaxLength(10);
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
            entity.Property(e => e.LocationLink).HasMaxLength(500);
            //entity.Property(e => e.Status).HasDefaultValue(0);
            entity.Property(e => e.Status)
    .HasDefaultValue(Domain.Enums.StationStatus.Operational);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        // Seed data
        modelBuilder.Entity<ChargingStation.API.Domain.Entities.ChargingStation>().HasData(
            new ChargingStation.API.Domain.Entities.ChargingStation
            {
                Id = 1,
                Name = "Pune Central Hub",
                LocationAddress = "MG Road, Pune",
                PinCode = "411001",
                ConnectorType = Domain.Enums.ConnectorType.CCS,
                Status = Domain.Enums.StationStatus.Operational,
                ImageUrl = "https://placehold.co/400x200?text=Station+1",
                LocationLink = "https://maps.google.com/?q=MG+Road+Pune",
                CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new ChargingStation.API.Domain.Entities.ChargingStation
            {
                Id = 2,
                Name = "Baner EV Point",
                LocationAddress = "Baner Road, Pune",
                PinCode = "411045",
                ConnectorType = Domain.Enums.ConnectorType.Type2,
                Status = Domain.Enums.StationStatus.Maintenance,
                ImageUrl = "https://placehold.co/400x200?text=Station+2",
                LocationLink = "https://maps.google.com/?q=Baner+Road+Pune",
                CreatedAt = new DateTime(2024, 1, 2, 0, 0, 0, DateTimeKind.Utc)
            },
            new ChargingStation.API.Domain.Entities.ChargingStation
            {
                Id = 3,
                Name = "Hinjewadi Tech Park",
                LocationAddress = "Hinjewadi Phase 1, Pune",
                PinCode = "411057",
                ConnectorType = Domain.Enums.ConnectorType.CHAdeMO,
                Status = Domain.Enums.StationStatus.Inactive,
                ImageUrl = "https://placehold.co/400x200?text=Station+3",
                LocationLink = "https://maps.google.com/?q=Hinjewadi+Pune",
                CreatedAt = new DateTime(2024, 1, 3, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}