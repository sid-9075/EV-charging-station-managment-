using ChargingStation.API.Application.DTOs;
using ChargingStation.API.Common.Models;
using ChargingStation.API.Domain.Entities;

namespace ChargingStation.API.Application.Interfaces;

public interface IStationRepository
{
    Task<PagedResult<ChargingStation.API.Domain.Entities.ChargingStation>> GetAllAsync(StationQueryParams query);
    Task<ChargingStation.API.Domain.Entities.ChargingStation?> GetByIdAsync(int id);
    Task<ChargingStation.API.Domain.Entities.ChargingStation> CreateAsync(ChargingStation.API.Domain.Entities.ChargingStation station);
    Task<ChargingStation.API.Domain.Entities.ChargingStation> UpdateAsync(ChargingStation.API.Domain.Entities.ChargingStation station);
    Task DeleteAsync(ChargingStation.API.Domain.Entities.ChargingStation station);
    Task<Dictionary<string, int>> GetSummaryAsync();
}