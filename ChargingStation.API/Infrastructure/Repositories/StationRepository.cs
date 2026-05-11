using ChargingStation.API.Application.DTOs;
using ChargingStation.API.Application.Interfaces;
using ChargingStation.API.Common.Models;
using ChargingStation.API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ChargingStation.API.Infrastructure.Repositories;

public class StationRepository : IStationRepository
{
    private readonly AppDbContext _context;

    public StationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<Domain.Entities.ChargingStation>> GetAllAsync(StationQueryParams query)
    {
        var q = _context.ChargingStations.AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Search))
            q = q.Where(s => s.Name.Contains(query.Search) || s.LocationAddress.Contains(query.Search));

        if (query.Status.HasValue)
            q = q.Where(s => (int)s.Status == query.Status.Value);

        var total = await q.CountAsync();
        var items = await q
            .OrderByDescending(s => s.CreatedAt)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        return new PagedResult<Domain.Entities.ChargingStation>
        {
            Items = items,
            TotalCount = total,
            Page = query.Page,
            PageSize = query.PageSize
        };
    }

    public async Task<Domain.Entities.ChargingStation?> GetByIdAsync(int id) =>
        await _context.ChargingStations.FindAsync(id);

    public async Task<Domain.Entities.ChargingStation> CreateAsync(Domain.Entities.ChargingStation station)
    {
        _context.ChargingStations.Add(station);
        await _context.SaveChangesAsync();
        return station;
    }

    public async Task<Domain.Entities.ChargingStation> UpdateAsync(Domain.Entities.ChargingStation station)
    {
        _context.ChargingStations.Update(station);
        await _context.SaveChangesAsync();
        return station;
    }

    public async Task DeleteAsync(Domain.Entities.ChargingStation station)
    {
        _context.ChargingStations.Remove(station);
        await _context.SaveChangesAsync();
    }

    public async Task<Dictionary<string, int>> GetSummaryAsync()
    {
        var groups = await _context.ChargingStations
            .GroupBy(s => s.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        var summary = new Dictionary<string, int>
        {
            ["Operational"] = 0,
            ["Maintenance"] = 0,
            ["Inactive"] = 0
        };

        foreach (var g in groups)
            summary[g.Status.ToString()] = g.Count;

        summary["Total"] = summary.Values.Sum();
        return summary;
    }
}