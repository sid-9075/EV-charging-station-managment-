namespace ChargingStation.API.Application.DTOs;

public class StationDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LocationAddress { get; set; } = string.Empty;
    public string PinCode { get; set; } = string.Empty;
    public string ConnectorType { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? LocationLink { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}