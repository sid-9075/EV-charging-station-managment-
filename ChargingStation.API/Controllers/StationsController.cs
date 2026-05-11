using ChargingStation.API.Application.DTOs;
using ChargingStation.API.Application.Interfaces;
using ChargingStation.API.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChargingStation.API.Controllers;

[ApiController]
[Route("api/stations")]
public class StationsController : ControllerBase
{
    private readonly IStationService _service;

    public StationsController(IStationService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<PagedResult<StationDto>>), 200)]
    public async Task<IActionResult> GetAll([FromQuery] StationQueryParams query)
    {
        var result = await _service.GetAllAsync(query);
        return Ok(ApiResponse<PagedResult<StationDto>>.Ok(result, "Stations fetched successfully."));
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<StationDto>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        return Ok(ApiResponse<StationDto>.Ok(result));
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<StationDto>), 201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] CreateStationDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
            return BadRequest(ApiResponse<StationDto>.Fail("Validation failed.", errors));
        }
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id },
            ApiResponse<StationDto>.Ok(result, "Station created successfully."));
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<StationDto>), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateStationDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
            return BadRequest(ApiResponse<StationDto>.Fail("Validation failed.", errors));
        }
        var result = await _service.UpdateAsync(id, dto);
        return Ok(ApiResponse<StationDto>.Ok(result, "Station updated successfully."));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok(ApiResponse<object>.Ok(null!, "Station deleted successfully."));
    }

    [HttpGet("summary")]
    [ProducesResponseType(typeof(ApiResponse<Dictionary<string, int>>), 200)]
    public async Task<IActionResult> GetSummary()
    {
        var result = await _service.GetSummaryAsync();
        return Ok(ApiResponse<Dictionary<string, int>>.Ok(result, "Summary fetched successfully."));
    }
}