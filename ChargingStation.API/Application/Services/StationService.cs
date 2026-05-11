using ChargingStation.API.Application.DTOs;
using ChargingStation.API.Application.Interfaces;
using ChargingStation.API.Common.Models;
using ChargingStation.API.Domain.Enums;

namespace ChargingStation.API.Application.Services;

public class StationService : IStationService
{
    private readonly IStationRepository _repo;

    public StationService(IStationRepository repo)
    {
        _repo = repo;
    }

    public async Task<PagedResult<StationDto>> GetAllAsync(StationQueryParams query)
    {
        var result = await _repo.GetAllAsync(query);
        return new PagedResult<StationDto>
        {
            Items = result.Items.Select(MapToDto),
            TotalCount = result.TotalCount,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<StationDto> GetByIdAsync(int id)
    {
        var station = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Station with ID {id} not found.");
        return MapToDto(station);
    }

    public async Task<StationDto> CreateAsync(CreateStationDto dto)
    {
        var station = new Domain.Entities.ChargingStation
        {
            Name = dto.Name,
            LocationAddress = dto.LocationAddress,
            PinCode = dto.PinCode,
            ConnectorType = (ConnectorType)dto.ConnectorType,
            Status = (StationStatus)dto.Status,
            ImageUrl = dto.ImageUrl,
            LocationLink = dto.LocationLink,
            CreatedAt = DateTime.UtcNow
        };
        var created = await _repo.CreateAsync(station);
        return MapToDto(created);
    }

    public async Task<StationDto> UpdateAsync(int id, UpdateStationDto dto)
    {
        var station = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Station with ID {id} not found.");

        station.Name = dto.Name;
        station.LocationAddress = dto.LocationAddress;
        station.PinCode = dto.PinCode;
        station.ConnectorType = (ConnectorType)dto.ConnectorType;
        station.Status = (StationStatus)dto.Status;
        station.ImageUrl = dto.ImageUrl;
        station.LocationLink = dto.LocationLink;
        station.UpdatedAt = DateTime.UtcNow;

        var updated = await _repo.UpdateAsync(station);
        return MapToDto(updated);
    }

    public async Task DeleteAsync(int id)
    {
        var station = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Station with ID {id} not found.");
        await _repo.DeleteAsync(station);
    }

    public Task<Dictionary<string, int>> GetSummaryAsync() => _repo.GetSummaryAsync();

    private static StationDto MapToDto(Domain.Entities.ChargingStation s) => new()
    {
        Id = s.Id,
        Name = s.Name,
        LocationAddress = s.LocationAddress,
        PinCode = s.PinCode,
        ConnectorType = s.ConnectorType.ToString(),
        Status = s.Status.ToString(),
        ImageUrl = s.ImageUrl,
        LocationLink = s.LocationLink,
        CreatedAt = s.CreatedAt,
        UpdatedAt = s.UpdatedAt
    };
}