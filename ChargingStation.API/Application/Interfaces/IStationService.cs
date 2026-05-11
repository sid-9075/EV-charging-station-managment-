using ChargingStation.API.Application.DTOs;
using ChargingStation.API.Common.Models;

namespace ChargingStation.API.Application.Interfaces;

public interface IStationService
{
    Task<PagedResult<StationDto>> GetAllAsync(StationQueryParams query);
    Task<StationDto> GetByIdAsync(int id);
    Task<StationDto> CreateAsync(CreateStationDto dto);
    Task<StationDto> UpdateAsync(int id, UpdateStationDto dto);
    Task DeleteAsync(int id);
    Task<Dictionary<string, int>> GetSummaryAsync();
}