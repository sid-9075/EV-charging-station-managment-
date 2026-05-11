import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft size={16} />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${p === currentPage
                            ? 'bg-blue-600 text-white border border-blue-500'
                            : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
                        }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;