import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeDeleteModal, deleteStation, fetchStations, fetchSummary } from '../../store/slices/stationSlice';

const DeleteModal = () => {
    const dispatch = useAppDispatch();
    const { isDeleteModalOpen, selectedStation, currentPage, pageSize, searchQuery, statusFilter } = useAppSelector((s) => s.stations);

    if (!isDeleteModalOpen || !selectedStation) return null;

    const handleDelete = async () => {
        const result = await dispatch(deleteStation(selectedStation.id));
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success('Station deleted.');
            dispatch(fetchStations({ page: currentPage, pageSize, search: searchQuery, status: statusFilter }));
            dispatch(fetchSummary());
        } else {
            toast.error('Failed to delete station.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle size={26} className="text-red-400" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Delete Station</h3>
                <p className="text-sm text-gray-400 mb-6">
                    Are you sure you want to delete <span className="text-white font-medium">"{selectedStation.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button onClick={() => dispatch(closeDeleteModal())}
                        className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white text-sm font-medium transition-all">
                        Cancel
                    </button>
                    <button onClick={handleDelete}
                        className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-all">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;