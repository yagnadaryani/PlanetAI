import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Waves, Thermometer, Trees, Factory, X, Play, RotateCcw } from 'lucide-react';
import type { DisasterSim } from '../types';
import { disasterSims } from '../data';

export interface ClimateParams {
  co2: number;
  glacierMelt: number;
  seaLevel: number;
  temperature: number;
  deforestation: number;
}

interface SimulatorPanelProps {
  climateParams: ClimateParams;
  onClimateChange: (params: ClimateParams) => void;
  activeDisaster: DisasterSim | null;
  onDisasterSelect: (d: DisasterSim | null) => void;
}

const disasterIcons: Record<string, any> = {
  Cyclone: CloudRain,
  Hurricane: CloudRain,
  Flood: Waves,
  Earthquake: Thermometer,
  Tsunami: Waves,
  Volcano: Factory,
};

const disasterColors: Record<string, string> = {
  Cyclone: '#ff00ff',
  Hurricane: '#ff00ff',
  Flood: '#00aaff',
  Earthquake: '#ff4400',
  Tsunami: '#0066ff',
  Volcano: '#ff6600',
};

export function SimulatorPanel({
  climateParams,
  onClimateChange,
  activeDisaster,
  onDisasterSelect,
}: SimulatorPanelProps) {
  const [activeTab, setActiveTab] = useState<'climate' | 'disaster'>('climate');

  return (
    <div className="glass-panel-strong h-full overflow-y-auto p-4">
      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setActiveTab('climate')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            activeTab === 'climate'
              ? 'bg-electric-400/20 text-electric-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Climate Sim
        </button>
        <button
          onClick={() => setActiveTab('disaster')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            activeTab === 'disaster'
              ? 'bg-electric-400/20 text-electric-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Disaster Sim
        </button>
      </div>

      {activeTab === 'climate' ? (
        <ClimateSimulator params={climateParams} onChange={onClimateChange} />
      ) : (
        <DisasterSimulator
          activeDisaster={activeDisaster}
          onSelect={onDisasterSelect}
        />
      )}
    </div>
  );
}

function ClimateSimulator({
  params,
  onChange,
}: {
  params: ClimateParams;
  onChange: (p: ClimateParams) => void;
}) {
  const sliders = [
    { key: 'co2' as const, label: 'CO₂ Level', icon: Factory, min: 280, max: 800, unit: 'ppm', color: '#ff8800' },
    { key: 'glacierMelt' as const, label: 'Glacier Melt', icon: Waves, min: 0, max: 100, unit: '%', color: '#00aaff' },
    { key: 'seaLevel' as const, label: 'Sea Level Rise', icon: Waves, min: 0, max: 200, unit: 'cm', color: '#0066ff' },
    { key: 'temperature' as const, label: 'Temperature Rise', icon: Thermometer, min: 0, max: 5, unit: '°C', color: '#ff4400' },
    { key: 'deforestation' as const, label: 'Deforestation', icon: Trees, min: 0, max: 100, unit: '%', color: '#22c55e' },
  ];

  const reset = () => {
    onChange({ co2: 422, glacierMelt: 15, seaLevel: 21, temperature: 1.15, deforestation: 10 });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">Adjust parameters to simulate climate change effects on Earth.</p>
        <button onClick={reset} className="rounded-lg p-2 text-slate-400 transition hover:bg-electric-400/10 hover:text-electric-400">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {sliders.map((s) => (
        <div key={s.key} className="glass-panel p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4" style={{ color: s.color }} />
              <span className="text-sm font-medium text-white">{s.label}</span>
            </div>
            <span className="text-sm font-bold" style={{ color: s.color }}>
              {params[s.key]} {s.unit}
            </span>
          </div>
          <input
            type="range"
            min={s.min}
            max={s.max}
            value={params[s.key]}
            onChange={(e) => onChange({ ...params, [s.key]: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-space-700"
            style={{
              background: `linear-gradient(to right, ${s.color} 0%, ${s.color} ${((params[s.key] - s.min) / (s.max - s.min)) * 100}%, #1a1f4e ${((params[s.key] - s.min) / (s.max - s.min)) * 100}%, #1a1f4e 100%)`,
            }}
          />
        </div>
      ))}

      {/* Impact summary */}
      <div className="glass-panel p-4">
        <p className="mb-2 text-sm font-semibold text-white">Impact Assessment</p>
        <div className="space-y-1 text-xs text-slate-400">
          <p>Temperature anomaly: +{params.temperature}°C {params.temperature > 2 ? '(Critical!)' : params.temperature > 1.5 ? '(Warning)' : '(Moderate)'}</p>
          <p>CO₂: {params.co2} ppm {params.co2 > 500 ? '(Extreme)' : params.co2 > 450 ? '(High)' : '(Current)'}</p>
          <p>Sea level: +{params.seaLevel}cm {params.seaLevel > 50 ? '(Severe coastal flooding)' : ''}</p>
          <p>Forest cover loss: {params.deforestation}% {params.deforestation > 30 ? '(Critical biodiversity loss)' : ''}</p>
        </div>
      </div>
    </div>
  );
}

function DisasterSimulator({
  activeDisaster,
  onSelect,
}: {
  activeDisaster: DisasterSim | null;
  onSelect: (d: DisasterSim | null) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-400">Select a disaster to simulate its effects on Earth.</p>

      {disasterSims.map((d) => {
        const Icon = disasterIcons[d.type] || CloudRain;
        const color = disasterColors[d.type] || '#ff0000';
        const isActive = activeDisaster?.id === d.id;
        return (
          <button
            key={d.id}
            onClick={() => onSelect(isActive ? null : d)}
            className={`w-full glass-panel p-3 text-left transition ${
              isActive ? 'border-electric-400/60 glow-border' : 'hover:border-electric-400/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2" style={{ backgroundColor: `${color}20` }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{d.name}</p>
                <p className="text-xs text-slate-400">{d.type}</p>
              </div>
              {isActive ? (
                <X className="h-4 w-4 text-electric-400" />
              ) : (
                <Play className="h-4 w-4 text-slate-500" />
              )}
            </div>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-xs text-slate-400">{d.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {d.affectedRegions.map((r) => (
                      <span key={r} className="data-badge bg-electric-400/10 text-electric-400">
                        {r}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
