export enum ConnectorType {
    CCS = 0,
    Type2 = 1,
    CHAdeMO = 2,
    GB_T = 3,
}

export enum StationStatus {
    Operational = 0,
    Maintenance = 1,
    Inactive = 2,
}

export interface Station {
    id: number;
    name: string;
    locationAddress: string;
    pinCode: string;
    connectorType: string;
    status: string;
    imageUrl?: string;
    locationLink?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface StationFormData {
    name: string;
    locationAddress: string;
    pinCode: string;
    connectorType: number;
    status: number;
    imageUrl?: string;
    locationLink?: string;
}

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: string[];
}

export interface StationSummary {
    operational: number;
    maintenance: number;
    inactive: number;
    total: number;
}

export interface StationQueryParams {
    page: number;
    pageSize: number;
    search?: string;
    status?: number | null;
}