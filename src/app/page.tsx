"use client"



import FontSelector from "@/components/FontSelector";
import { RiBook2Line } from "react-icons/ri";
import { IoIosPlay } from "react-icons/io";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import WordDefinition from "@/components/WordDefinition";
import { useState, useEffect } from "react";
import WordData, { ErrorResponse } from "./type";
import WordSearchBar from "@/components/WordSearchBar";
import SearchHistory, { SearchHistoryItem } from "@/components/SearchHistoryItem";
import ThemeToggleButton from "@/components/ThemeToggleButton";

// Constante para el almacenamiento local
const SEARCH_HISTORY_KEY = "dictionary_search_history";

export default function Home() {
  const [searchValue, setSearchValue] = useState("computer");
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Cargar historial del localStorage al iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        // Convertir las fechas de string a objetos Date
        const parsed = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setSearchHistory(parsed);
      } catch (e) {
        console.error("Error al cargar el historial:", e);
        // Si hay un error, empezar con historial vacío
        setSearchHistory([]);
      }
    }
  }, []);

  // Guardar historial en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;

  const {
    isLoading,
    error,
    refetch,
    data: wordData,
  } = useQuery<WordData[], ErrorResponse>({
    queryKey: ["wordData", searchValue],
    queryFn: async () => {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("No se pudo obtener la definición.");
      }
      return response.json();
    },
    enabled: false,
  });

  useEffect(() => {
    if (searchValue === "computer") {
      refetch();
    }
  }, [searchValue, refetch]);

  const data: WordData | null = wordData ? wordData[0] : null;

  // Función para manejar la búsqueda y actualizar el historial
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(searchValue) || searchValue.trim() === "") return;
    
    // Solo añadir al historial si la búsqueda es exitosa
    refetch().then(() => {
      // Añadir la palabra al historial con la fecha actual
      const newHistoryItem: SearchHistoryItem = {
        word: searchValue.trim(),
        timestamp: new Date()
      };
      
      // Verificar si la palabra ya existe en el historial
      const existingIndex = searchHistory.findIndex(
        item => item.word.toLowerCase() === searchValue.toLowerCase()
      );
      
      if (existingIndex !== -1) {
        // Si la palabra ya existe, actualizamos su timestamp y la movemos al inicio
        const updatedHistory = [...searchHistory];
        updatedHistory.splice(existingIndex, 1);
        updatedHistory.unshift(newHistoryItem);
        setSearchHistory(updatedHistory);
      } else {
        // Si no existe, la añadimos al inicio (limitamos a 20 elementos)
        setSearchHistory(prev => 
          [newHistoryItem, ...prev].slice(0, 20)
        );
      }
    });
  }

  // Función para seleccionar una palabra del historial
  const handleSelectFromHistory = (word: string) => {
    setSearchValue(word);
    setIsHistoryOpen(false);
    refetch();
  };

  // Función para limpiar todo el historial
  const handleClearHistory = () => {
    setSearchHistory([]);
    setIsHistoryOpen(false);
  };

  // Función para eliminar un elemento específico del historial
  const handleRemoveHistoryItem = (index: number) => {
    setSearchHistory(prev => prev.filter((_, i) => i !== index));
  };

  if (isLoading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <main className="max-w-[689px] flex flex-col gap-10 mx-auto py-10 px-4">
        <div className="w-full flex justify-between">
          <RiBook2Line className="text-4xl text-gray-400" />
          <div className="flex gap-4 items-center">
            <FontSelector />
            <div className="h-[50px] w-[1px] bg-gray-400" />
            <ThemeToggleButton />
          </div>
        </div>
        
        <WordSearchBar
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSubmit}
          value={searchValue}
          onHistoryClick={() => setIsHistoryOpen(true)}
          historyCount={searchHistory.length}
        />
        
        {!data ? (
          <div className="flex flex-col gap-5 text-center">
            <p className="text-7xl">😕</p>
            <h2 className="text-xl font-bold">No Definitions Found</h2>
            <p className="text-lg">
              Sorry pal, we couldn't find definitions for the word you were looking for.
            </p>
          </div>
        ) : (
          <section className="flex flex-col gap-8">
            <section className="flex flex-col gap-1">
              <div className="flex justify-between w-full">
                <h1 className="text-3xl sm:text-[64px] font-bold">
                  {data?.word ?? ""}
                </h1>
                <button className="group h-16 w-16 rounded-full bg-purple/20 hover:bg-purple flex items-center justify-center text-4xl transition-all">
                  <IoIosPlay className="text-purple group-hover:text-white transition-all" />
                </button>
              </div>
              <p className="text-2xl text-purple">{data?.phonetic}</p>
            </section>

            {data?.meanings.map((d, i) => (
              <WordDefinition
                key={i}
                antonyms={d.antonyms}
                definitions={d.definitions}
                partOfSpeech={d.partOfSpeech}
                synonyms={d.synonyms}
              />
            ))}

            <hr />

            {data?.sourceUrls && data?.sourceUrls.length > 0 ? (
              <div>
                <p>Source</p>
                <Link
                  target="_blank"
                  href={data?.sourceUrls[0]}
                  className="flex gap-1 items-center"
                >
                  <span>{data?.sourceUrls}</span>
                  <FaExternalLinkAlt className="text-sm text-gray-400" />
                </Link>
              </div>
            ) : null}
          </section>
        )}
      </main>

      {/* Componente de historial */}
      <SearchHistory
        history={searchHistory}
        onSelect={handleSelectFromHistory}
        onClear={handleClearHistory}
        onRemoveItem={handleRemoveHistoryItem}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}