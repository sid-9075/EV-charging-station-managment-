import { MapPin, Pencil, Trash2, ExternalLink, Plug } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { openEditForm, openDeleteModal } from '../../store/slices/stationSlice';
import { getStatusStyle, getConnectorStyle } from '../../utils/statusStyles';
import type { Station } from '../../types/station';

interface Props {
  station: Station;
}

const StationCard = ({ station }: Props) => {
  const dispatch = useAppDispatch();
  const styles = getStatusStyle(station.status);

  return (
    <div className={`group bg-gray-900 border ${styles.card} rounded-2xl overflow-hidden card-hover ${styles.glow}`}>
      <div className="relative h-44 bg-gray-800 overflow-hidden">
        {station.imageUrl ? (
          <img
            src={station.imageUrl}
            alt={station.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x200?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <Plug size={40} />
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${styles.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} animate-pulse`} />
            {station.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-white text-base mb-1 truncate">
          {station.name}
        </h3>

        <div className="flex items-start gap-1.5 text-gray-400 text-sm mb-3">
          <MapPin size={13} className="mt-0.5 shrink-0" />
          <span className="line-clamp-2 leading-snug">
            {station.locationAddress} — {station.pinCode}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getConnectorStyle(station.connectorType)}`}>
            {station.connectorType}
          </span>
          {station.locationLink && (
  <a
    href={station.locationLink}
    target="_blank"
    rel="noopener noreferrer"
    className="text-xs text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1"
  >
    <ExternalLink size={11} />
    Maps
  </a>
)}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => dispatch(openEditForm(station))}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white border border-gray-700 hover:border-blue-500 transition-all duration-200"
          >
            <Pencil size={13} />
            Edit
          </button>
          <button
            onClick={() => dispatch(openDeleteModal(station))}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white border border-gray-700 hover:border-red-500 transition-all duration-200"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationCard;