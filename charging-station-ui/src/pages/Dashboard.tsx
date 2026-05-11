import { useEffect, useCallback } from 'react';
import { Search, Plus, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchStations, fetchSummary, setSearchQuery, setStatusFilter, setCurrentPage, openCreateForm } from '../store/slices/stationSlice';
import { useAutoRefresh } from '../hooks/useAutoRefresh';
import SummaryCards from '../components/stations/SummaryCards';
import StationGrid from '../components/stations/StationGrid';
import StationForm from '../components/stations/StationForm';
import DeleteModal from '../components/stations/DeleteModal';
import Pagination from '../components/common/Pagination';

const STATUS_OPTIONS = [
    { label: 'All', value: null },
    { label: 'Operational', value: 0 },
    { label: 'Maintenance', value: 1 },
    { label: 'Inactive', value: 2 },
];

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { currentPage, pageSize, searchQuery, statusFilter, totalPages, totalCount, loading } = useAppSelector((s) => s.stations);

    const refresh = useCallback(() => {
        dispatch(fetchStations({ page: currentPage, pageSize, search: searchQuery, status: statusFilter }));
        dispatch(fetchSummary());
    }, [dispatch, currentPage, pageSize, searchQuery, statusFilter]);

    // Initial load
    useEffect(() => { refresh(); }, [refresh]);

    // Auto-refresh every 10 seconds (1s would cause excessive DB calls in real apps; 10s is interview-appropriate)
    useAutoRefresh(refresh, 10000);

    return (
        <div className="min-h-screen bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">⚡ EV Station Manager</h1>
                        <p className="text-sm text-gray-500 mt-0.5">{totalCount} stations registered</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={refresh}
                            className={`p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all ${loading ? 'animate-spin text-blue-400' : ''}`}>
                            <RefreshCw size={16} />
                        </button>
                        <button onClick={() => dispatch(openCreateForm())}
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-all">
                            <Plus size={16} /> Add Station
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <SummaryCards />

                {/* Search + Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-3 py-1.5">
                        <SlidersHorizontal size={14} className="text-gray-500" />
                        {STATUS_OPTIONS.map(({ label, value }) => (
                            <button
                                key={label}
                                onClick={() => dispatch(setStatusFilter(value))}
                                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${statusFilter === value
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <StationGrid />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => dispatch(setCurrentPage(p))}
                />

                {/* Modals */}
                <StationForm />
                <DeleteModal />
            </div>
        </div>
    );
};

export default Dashboard;