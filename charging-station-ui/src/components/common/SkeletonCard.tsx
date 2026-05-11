const SkeletonCard = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
        <div className="h-44 bg-gray-800" />
        <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-800 rounded w-1/2" />
            <div className="h-3 bg-gray-800 rounded w-1/3" />
            <div className="flex gap-2 pt-2">
                <div className="h-6 bg-gray-800 rounded-full w-24" />
                <div className="h-6 bg-gray-800 rounded-full w-16" />
            </div>
            <div className="flex gap-2 pt-2">
                <div className="h-8 bg-gray-800 rounded-lg flex-1" />
                <div className="h-8 bg-gray-800 rounded-lg flex-1" />
            </div>
        </div>
    </div>
);

export default SkeletonCard;