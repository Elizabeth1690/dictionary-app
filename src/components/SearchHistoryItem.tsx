import React from "react";
import { FaRegClock, FaTrash } from "react-icons/fa";

export interface SearchHistoryItem {
  word: string;
  timestamp: Date;
}

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelect: (word: string) => void;
  onClear: () => void;
  onRemoveItem: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelect,
  onClear,
  onRemoveItem,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaRegClock className="text-purple" />
            Historial de búsquedas
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-2">
          {history.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No hay búsquedas recientes
            </div>
          ) : (
            <ul className="divide-y">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
                >
                  <div className="p-3 flex justify-between items-center">
                    <button
                      onClick={() => onSelect(item.word)}
                      className="flex-1 flex flex-col items-start text-left"
                    >
                      <span className="font-bold text-purple">{item.word}</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(item.timestamp)}
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(index);
                      }}
                      className="text-gray-400 hover:text-red-500 p-2"
                      aria-label="Eliminar del historial"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {history.length > 0 && (
          <div className="p-3 border-t">
            <button
              onClick={onClear}
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Limpiar historial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;