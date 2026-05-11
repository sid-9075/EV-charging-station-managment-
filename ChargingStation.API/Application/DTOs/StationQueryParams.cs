namespace ChargingStation.API.Application.DTOs;

public class StationQueryParams
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 9;
    public string? Search { get; set; }
    public int? Status { get; set; }
}