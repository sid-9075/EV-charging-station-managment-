import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { stationApi } from '../../api/stationApi';
import type { Station, StationFormData, StationQueryParams, StationSummary, PagedResult } from '../../types/station';

interface StationState {
    stations: Station[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    searchQuery: string;
    statusFilter: number | null;
    loading: boolean;
    summaryLoading: boolean;
    error: string | null;
    summary: StationSummary;
    selectedStation: Station | null;
    isFormOpen: boolean;
    isDeleteModalOpen: boolean;
    formMode: 'create' | 'edit';
}

const initialState: StationState = {
    stations: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 9,
    searchQuery: '',
    statusFilter: null,
    loading: false,
    summaryLoading: false,
    error: null,
    summary: { operational: 0, maintenance: 0, inactive: 0, total: 0 },
    selectedStation: null,
    isFormOpen: false,
    isDeleteModalOpen: false,
    formMode: 'create',
};

// Thunks
export const fetchStations = createAsyncThunk(
    'stations/fetchAll',
    async (params: StationQueryParams, { rejectWithValue }) => {
        try {
            return await stationApi.getAll(params);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchSummary = createAsyncThunk(
    'stations/fetchSummary',
    async (_, { rejectWithValue }) => {
        try {
            return await stationApi.getSummary();
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const createStation = createAsyncThunk(
    'stations/create',
    async (dto: StationFormData, { rejectWithValue }) => {
        try {
            return await stationApi.create(dto);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateStation = createAsyncThunk(
    'stations/update',
    async ({ id, dto }: { id: number; dto: StationFormData }, { rejectWithValue }) => {
        try {
            return await stationApi.update(id, dto);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteStation = createAsyncThunk(
    'stations/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            await stationApi.delete(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const stationSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.currentPage = 1;
        },
        setStatusFilter(state, action: PayloadAction<number | null>) {
            state.statusFilter = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        openCreateForm(state) {
            state.selectedStation = null;
            state.formMode = 'create';
            state.isFormOpen = true;
        },
        openEditForm(state, action: PayloadAction<Station>) {
            state.selectedStation = action.payload;
            state.formMode = 'edit';
            state.isFormOpen = true;
        },
        closeForm(state) {
            state.isFormOpen = false;
            state.selectedStation = null;
        },
        openDeleteModal(state, action: PayloadAction<Station>) {
            state.selectedStation = action.payload;
            state.isDeleteModalOpen = true;
        },
        closeDeleteModal(state) {
            state.isDeleteModalOpen = false;
            state.selectedStation = null;
        },
    },
    extraReducers: (builder) => {
        // fetchStations
        builder
            .addCase(fetchStations.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchStations.fulfilled, (state, action: PayloadAction<PagedResult<Station>>) => {
                state.loading = false;
                state.stations = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.page;
            })
            .addCase(fetchStations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // fetchSummary
        builder
            .addCase(fetchSummary.pending, (state) => { state.summaryLoading = true; })
            .addCase(fetchSummary.fulfilled, (state, action: PayloadAction<StationSummary>) => {
                state.summaryLoading = false;
                state.summary = action.payload;
            })
            .addCase(fetchSummary.rejected, (state) => { state.summaryLoading = false; });

        // createStation
        builder.addCase(createStation.fulfilled, (state) => { state.isFormOpen = false; });

        // updateStation
        builder.addCase(updateStation.fulfilled, (state) => { state.isFormOpen = false; });

        // deleteStation
        builder.addCase(deleteStation.fulfilled, (state) => { state.isDeleteModalOpen = false; });
    },
});

export const {
    setSearchQuery, setStatusFilter, setCurrentPage,
    openCreateForm, openEditForm, closeForm,
    openDeleteModal, closeDeleteModal,
} = stationSlice.actions;

export default stationSlice.reducer;