import { Zap, Wrench, PowerOff, LayoutGrid } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';

const cards = [
    { key: 'total', label: 'Total Stations', icon: LayoutGrid, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { key: 'operational', label: 'Operational', icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { key: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { key: 'inactive', label: 'Inactive', icon: PowerOff, color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/20' },
];

const SummaryCards = () => {
    const { summary, summaryLoading } = useAppSelector((s) => s.stations);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map(({ key, label, icon: Icon, color, bg }) => (
                <div key={key} className={`rounded-2xl border p-5 ${bg} transition-all duration-300 hover:-translate-y-0.5`}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">{label}</span>
                        <Icon size={18} className={color} />
                    </div>
                    {summaryLoading ? (
                        <div className="h-8 w-12 bg-gray-800 rounded animate-pulse" />
                    ) : (
                        <p className={`text-3xl font-bold ${color}`}>
                            {summary[key as keyof typeof summary]}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;