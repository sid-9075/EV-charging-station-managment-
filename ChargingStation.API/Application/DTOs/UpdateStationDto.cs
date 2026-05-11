using System.ComponentModel.DataAnnotations;

namespace ChargingStation.API.Application.DTOs;

public class UpdateStationDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(250)]
    public string LocationAddress { get; set; } = string.Empty;

    [Required, RegularExpression(@"^\d{6}$", ErrorMessage = "PinCode must be exactly 6 digits.")]
    public string PinCode { get; set; } = string.Empty;

    [Required, Range(0, 3, ErrorMessage = "Invalid ConnectorType.")]
    public int ConnectorType { get; set; }

    [Required, Range(0, 2, ErrorMessage = "Invalid Status.")]
    public int Status { get; set; }

    [Url(ErrorMessage = "ImageUrl must be a valid URL.")]
    public string? ImageUrl { get; set; }

    [Url(ErrorMessage = "LocationLink must be a valid URL.")]
    public string? LocationLink { get; set; }
}