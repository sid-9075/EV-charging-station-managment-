using ChargingStation.API.Domain.Enums;

namespace ChargingStation.API.Domain.Entities;

public class ChargingStation
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LocationAddress { get; set; } = string.Empty;
    public string PinCode { get; set; } = string.Empty;
    public ConnectorType ConnectorType { get; set; }
    public StationStatus Status { get; set; } = StationStatus.Operational;
    public string? ImageUrl { get; set; }
    public string? LocationLink { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}