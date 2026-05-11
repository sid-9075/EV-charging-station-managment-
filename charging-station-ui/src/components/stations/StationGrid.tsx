import { ServerOff } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import StationCard from './StationCard';
import SkeletonCard from '../common/SkeletonCard';

const StationGrid = () => {
    const { stations, loading } = useAppSelector((s) => s.stations);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        );
    }

    if (!stations.length) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-gray-600">
                <ServerOff size={48} className="mb-4" />
                <p className="text-lg font-medium">No stations found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {stations.map((s) => <StationCard key={s.id} station={s} />)}
        </div>
    );
};

export default StationGrid;