export const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Operational': return {
            badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
            dot: 'bg-emerald-400',
            card: 'border-emerald-500/20',
            glow: 'hover:shadow-emerald-900/30',
        };
        case 'Maintenance': return {
            badge: 'bg-red-500/20 text-red-400 border border-red-500/30',
            dot: 'bg-red-400',
            card: 'border-red-500/20',
            glow: 'hover:shadow-red-900/30',
        };
        case 'Inactive': return {
            badge: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
            dot: 'bg-gray-400',
            card: 'border-gray-500/20',
            glow: 'hover:shadow-gray-900/30',
        };
        default: return {
            badge: 'bg-gray-700 text-gray-400 border border-gray-600',
            dot: 'bg-gray-400',
            card: 'border-gray-700',
            glow: '',
        };
    }
};

export const getConnectorStyle = (type: string) => {
    const map: Record<string, string> = {
        CCS: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        Type2: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
        CHAdeMO: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        GB_T: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    };
    return map[type] ?? 'bg-gray-700 text-gray-400';
};