#  Charging Station Management App

A full-stack EV Charging Station Management System built with **ASP.NET Core 8**, **Entity Framework Core**, **MSSQL**, **React + Vite**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.

---

##  Project Structure

```
ChargingStationApp/
├── backend/
│   └── ChargingStation.API/          # ASP.NET Core Web API
│       ├── Controllers/
│       ├── Domain/                   # Entities + Enums
│       ├── Application/              # DTOs + Interfaces + Services
│       ├── Infrastructure/           # EF Core + Repository + Migrations
│       ├── Common/                   # Middleware + Models + Exceptions
│       └── Program.cs
│
└── frontend/
    └── charging-station-ui/          # React + Vite + TypeScript
        └── src/
            ├── api/                  # Axios API layer
            ├── components/           # Reusable UI components
            ├── hooks/                # Custom React hooks
            ├── pages/                # Page-level components
            ├── store/                # Redux Toolkit store + slices
            ├── types/                # TypeScript interfaces + enums
            └── utils/                # Helpers + style maps
```

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| .NET SDK | 8.0+ |
| Node.js | 18+ |
| SQL Server | 2019+ (or LocalDB) |

---

### ⚙️ Backend Setup

#### 1. Configure the connection string

> `Server=localhost\\SQLEXPRESS;Database=ChargingStationDb;Trusted_Connection=True;TrustServerCertificate=True;`

#### 2. Apply migrations & seed data

```bash
cd ChargingStation.API
```

This creates the database and seeds 3 sample stations automatically.

#### 3. Run the API

```bash
dotnet run
```

API runs at: `http://localhost:5188`
Swagger UI: `http://localhost:5188/swagger`

---

### 🖥️ Frontend Setup

#### 1. change directory to frontend

```bash
cd charging-station-ui
npm install
```

#### 2. Run the dev server

```bash
npm run dev
```

App runs at: `http://localhost:5173`

> The Vite dev server proxies `/api` requests to `http://localhost:5000` automatically. No CORS issues during development.

---

## 🔌 API Reference

**Base URL:** `http://localhost:5188/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stations` | Get paginated list with search + filter |
| `GET` | `/stations/{id}` | Get station by ID |
| `POST` | `/stations` | Create new station |
| `PUT` | `/stations/{id}` | Update existing station |
| `DELETE` | `/stations/{id}` | Delete station |
| `GET` | `/stations/summary` | Get counts by status |

### Query Parameters for `GET /stations`

| Param | Type | Description | Default |
|-------|------|-------------|---------|
| `page` | int | Page number | `1` |
| `pageSize` | int | Items per page | `9` |
| `search` | string | Search by name or address | — |
| `status` | int | Filter: 0=Operational, 1=Maintenance, 2=Inactive | — |

### Sample Request — Create Station

```json
POST /api/stations
{
  "name": "Koregaon Park EV Hub",
  "locationAddress": "Koregaon Park, Pune",
  "pinCode": "411001",
  "connectorType": 0,
  "status": 0,
  "imageUrl": "https://example.com/image.jpg",
  "locationLink": "https://maps.google.com/?q=Koregaon+Park+Pune"
}
```

### Sample Response — Unified Wrapper

```json
{
  "success": true,
  "message": "Station created successfully.",
  "data": {
    "id": 4,
    "name": "Koregaon Park EV Hub",
    "locationAddress": "Koregaon Park, Pune",
    "pinCode": "411001",
    "connectorType": "CCS",
    "status": "Operational",
    "imageUrl": "https://example.com/image.jpg",
    "locationLink": "https://maps.google.com/?q=Koregaon+Park+Pune",
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": null
  },
  "errors": null
}
```

---

## 🗂️ Enums Reference

### ConnectorType
| Value | Int |
|-------|-----|
| CCS | 0 |
| Type2 | 1 |
| CHAdeMO | 2 |
| GB_T | 3 |

### StationStatus
| Value | Int |
|-------|-----|
| Operational | 0 |
| Maintenance | 1 |
| Inactive | 2 |

---

## 🧪 Validation Rules

| Field | Rule |
|-------|------|
| Name | Required, max 100 chars |
| Location Address | Required, max 250 chars |
| Pin Code | Required, exactly 6 digits |
| Connector Type | Required, 0–3 |
| Status | Required, 0–2 |
| Image URL | Optional, valid URL format |
| Location Link | Optional, valid URL format |

Validation is enforced on **both** frontend (react-hook-form) and backend (Data Annotations + ModelState).

---

## 🎨 Status Color Scheme

| Status | Color | Tailwind |
|--------|-------|---------|
| Operational | Green | `emerald-400` |
| Maintenance | Red | `red-400` |
| Inactive | Gray | `gray-400` |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                     │
│  Redux Toolkit → Axios → Vite Proxy                 │
└─────────────────────────┬───────────────────────────┘
                          │ HTTP /api/v1
┌─────────────────────────▼───────────────────────────┐
│               ASP.NET Core Web API                   │
│                                                     │
│  Controller → Service → Repository → EF Core        │
│        ↕ DTOs      ↕ Entities    ↕ DbContext        │
│                                                     │
│  Global Exception Middleware → Unified ApiResponse  │
└─────────────────────────┬───────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────┐
│                  MSSQL Server                        │
│              ChargingStations Table                  │
└─────────────────────────────────────────────────────┘
```

### Design Patterns Used
- **Repository Pattern** — abstracts data access from business logic
- **Service Pattern** — encapsulates business logic, maps entities to DTOs
- **DTO Pattern** — decouples API contract from domain model
- **Global Exception Middleware** — single error-handling entry point
- **Unified API Response** — consistent `{ success, message, data, errors }` shape
- **Redux Toolkit Slice** — co-located state, reducers, and thunks
- **Custom Hooks** — `useAutoRefresh` isolates side-effect logic

---

## 📦 Tech Stack

### Backend
| Package | Purpose |
|---------|---------|
| `ASP.NET Core 8` | Web API framework |
| `Entity Framework Core 8` | ORM + Migrations |
| `Microsoft.EntityFrameworkCore.SqlServer` | MSSQL provider |
| `Swashbuckle.AspNetCore` | Swagger/OpenAPI docs |

### Frontend
| Package | Purpose |
|---------|---------|
| `React 18 + Vite` | UI framework + build tool |
| `TypeScript` | Type safety |
| `Redux Toolkit` | State management |
| `Axios` | HTTP client |
| `react-hook-form` | Form state + validation |
| `react-hot-toast` | Toast notifications |
| `Tailwind CSS` | Utility-first styling |
| `lucide-react` | Icon library |

---

