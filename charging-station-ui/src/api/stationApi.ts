import axios from 'axios';
import type { ApiResponse, PagedResult, Station, StationFormData, StationQueryParams, StationSummary } from '../types/station';

const api = axios.create({
    //baseURL: '/api',
    baseURL: 'http://localhost:5188/api',
    headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for error normalization
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const message =
            err.response?.data?.message || err.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

export const stationApi = {
    getAll: async (params: StationQueryParams) => {
        const { data } = await api.get<ApiResponse<PagedResult<Station>>>('/stations', {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                search: params.search || undefined,
                status: params.status ?? undefined,
            },
        });
        return data.data;
    },

    getById: async (id: number) => {
        const { data } = await api.get<ApiResponse<Station>>(`/stations/${id}`);
        return data.data;
    },

    create: async (payload: StationFormData) => {
        const { data } = await api.post<ApiResponse<Station>>('/stations', payload);
        return data.data;
    },

    update: async (id: number, payload: StationFormData) => {
        const { data } = await api.put<ApiResponse<Station>>(`/stations/${id}`, payload);
        return data.data;
    },

    delete: async (id: number) => {
        await api.delete(`/stations/${id}`);
    },

    getSummary: async () => {
        const { data } = await api.get<ApiResponse<Record<string, number>>>('/stations/summary');
        const raw = data.data;
        return {
            operational: raw['Operational'] ?? 0,
            maintenance: raw['Maintenance'] ?? 0,
            inactive: raw['Inactive'] ?? 0,
            total: raw['Total'] ?? 0,
        } as StationSummary;
    },
};