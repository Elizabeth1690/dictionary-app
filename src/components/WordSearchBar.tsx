import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import Swal from "sweetalert2";

interface WordSearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onHistoryClick: () => void;
  historyCount: number;
}

const WordSearchBar: React.FC<WordSearchBarProps> = ({
  onChange,
  onSubmit,
  value,
  onHistoryClick,
  historyCount,
}) => {
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidating) return;
    setIsValidating(true);

    if (!value.trim()) {
      setIsValidating(false);
      return Swal.fire({
        title: "Campo vacío",
        text: "Por favor ingrese una palabra para buscar",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#A445ED",
      });
    }

    if (!/^[a-zA-Z\s]+$/.test(value)) {
      setIsValidating(false);
      return Swal.fire({
        title: "Formato inválido",
        text: "Ingrese solo letras (sin números ni caracteres especiales)",
        icon: "error",
        confirmButtonText: "Corregir",
        confirmButtonColor: "#A445ED",
      });
    }

    if (value.length > 50) {
      setIsValidating(false);
      return Swal.fire({
        title: "Texto demasiado largo",
        text: "Ingrese una palabra más corta (máximo 50 caracteres)",
        icon: "error",
        confirmButtonText: "Corregir",
        confirmButtonColor: "#A445ED",
      });
    }

    try {
      await onSubmit(e);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Buscando...",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al realizar la búsqueda",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#A445ED",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          placeholder="Search any word..."
          className="placeholder:font-bold rounded-2xl outline-purple bg-gray-200 h-[64px] w-full px-4 pr-24 dark:bg-slate-900"
          value={value}
          onChange={onChange}
          disabled={isValidating}
        />
        
        <button
          type="button"
          onClick={onHistoryClick}
          className="absolute right-14 text-xl text-purple/70 hover:text-purple transition-colors p-2 flex items-center justify-center"
          disabled={isValidating}
          title="Ver historial de búsquedas"
        >
          <FaRegClock />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>
        
        <button
          type="submit"
          className={`absolute right-3 text-3xl ${
            isValidating ? "text-gray-400" : "text-purple/70"
          } hover:text-purple transition-colors`}
          disabled={isValidating}
        >
          <IoIosSearch />
        </button>
      </form>
    </div>
  );
};

export default WordSearchBar;