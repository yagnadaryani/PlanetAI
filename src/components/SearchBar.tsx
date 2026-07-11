import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Mountain, Droplets, Waves, Flame, Plane, Building, Globe } from 'lucide-react';
import { searchLocations } from '../data';
import type { SearchLocation } from '../types';

interface SearchBarProps {
  onSelect: (location: SearchLocation) => void;
}

const typeIcons: Record<string, any> = {
  Country: Globe,
  City: Building,
  Mountain: Mountain,
  River: Droplets,
  Ocean: Waves,
  Volcano: Flame,
  Airport: Plane,
};

const typeColors: Record<string, string> = {
  Country: '#22d3ee',
  City: '#00d4ff',
  Mountain: '#fbbf24',
  River: '#00aaff',
  Ocean: '#0066ff',
  Volcano: '#ff6600',
  Airport: '#34d399',
};

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchLocations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query.toLowerCase()) ||
          loc.type.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (loc: SearchLocation) => {
    onSelect(loc);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative">
      <div className="glass-panel flex items-center gap-2 px-4 py-2.5">
        <Search className="h-4 w-4 text-electric-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search countries, cities, mountains..."
          className="w-48 bg-transparent text-sm text-white placeholder-slate-500 outline-none md:w-64"
        />
        {query && (
          <button onClick={() => { setQuery(''); setIsOpen(false); }} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel-strong absolute top-full left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto p-2"
          >
            {results.map((loc) => {
              const Icon = typeIcons[loc.type] || MapPin;
              const color = typeColors[loc.type] || '#00d4ff';
              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-electric-400/10"
                >
                  <div className="rounded-lg p-2" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{loc.name}</p>
                    <p className="text-xs text-slate-500">{loc.description}</p>
                  </div>
                  <span className="data-badge bg-space-700 text-xs text-slate-400">{loc.type}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TimelineProps {
  year: number;
  onChange: (year: number) => void;
}

export function Timeline({ year, onChange }: TimelineProps) {
  return (
    <div className="glass-panel flex items-center gap-3 px-4 py-2.5">
      <span className="text-xs text-slate-400">Timeline</span>
      <input
        type="range"
        min={1990}
        max={2025}
        step={5}
        value={year}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-32 cursor-pointer appearance-none rounded-full bg-space-700 md:w-48"
        style={{
          background: `linear-gradient(to right, #00d4ff 0%, #00d4ff ${((year - 1990) / 35) * 100}%, #1a1f4e ${((year - 1990) / 35) * 100}%, #1a1f4e 100%)`,
        }}
      />
      <span className="min-w-[3rem] text-sm font-bold text-electric-400">{year}</span>
    </div>
  );
}
