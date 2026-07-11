import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend,
} from 'recharts';
import { Activity, TrendingUp, TrendingDown, Globe, Leaf, Droplets, Wind, Factory, Users } from 'lucide-react';
import { timelineData } from '../data';

const customTooltipStyle = {
  backgroundColor: 'rgba(10, 14, 39, 0.95)',
  border: '1px solid rgba(0, 212, 255, 0.3)',
  borderRadius: '12px',
  color: '#e2e8f0',
  fontSize: '12px',
  padding: '8px 12px',
};

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendUp,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendUp: boolean;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-lg p-2" style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-white">
            {value} <span className="text-sm font-normal text-slate-500">{unit}</span>
          </p>
        </div>
        <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-red-400' : 'text-green-400'}`}>
          {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {trend}
        </div>
      </div>
    </motion.div>
  );
}

export function AnalyticsDashboard() {
  const latest = timelineData[timelineData.length - 1];

  return (
    <div className="h-full overflow-y-auto bg-space-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-white">Earth Analytics Dashboard</h2>
        <p className="text-sm text-slate-400">Live planetary data and climate trends (1990–2025)</p>
      </motion.div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={TrendingUp} label="Global Temperature" value={`+${latest.globalTemp}`} unit="°C" trend="+0.80 since 1990" trendUp color="#ff4400" delay={0} />
        <StatCard icon={Factory} label="CO₂ Levels" value={String(latest.co2)} unit="ppm" trend="+68 ppm" trendUp color="#ff8800" delay={0.1} />
        <StatCard icon={Users} label="Population" value={String(latest.population)} unit="B" trend="+2.8B" trendUp color="#22d3ee" delay={0.2} />
        <StatCard icon={Leaf} label="Forest Cover" value={String(latest.forestCover)} unit="%" trend="-2.3%" trendUp={false} color="#22c55e" delay={0.3} />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Droplets} label="Ice Cap Area" value={String(latest.iceCapArea)} unit="M km²" trend="-2.7M km²" trendUp={false} color="#00aaff" delay={0.4} />
        <StatCard icon={Wind} label="Ocean Temperature" value={String(latest.oceanTemp)} unit="°C" trend="+1.7°C" trendUp color="#0066ff" delay={0.5} />
        <StatCard icon={Activity} label="Air Quality" value={String(latest.airQuality)} unit="AQI" trend="+37 pts" trendUp color="#fbbf24" delay={0.6} />
        <StatCard icon={Globe} label="Sea Level Rise" value="21" unit="cm" trend="+21cm" trendUp color="#818cf8" delay={0.7} />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Global Temperature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <TrendingUp className="h-4 w-4 text-red-400" />
            Global Temperature Anomaly
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4400" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#ff4400" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Area type="monotone" dataKey="globalTemp" stroke="#ff4400" strokeWidth={2} fill="url(#tempGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CO2 Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Factory className="h-4 w-4 text-orange-400" />
            CO₂ Concentration
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[340, 430]} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Line type="monotone" dataKey="co2" stroke="#ff8800" strokeWidth={2} dot={{ fill: '#ff8800', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Population */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Users className="h-4 w-4 text-cyan-400" />
            Global Population
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="population" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Forest Cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Leaf className="h-4 w-4 text-green-400" />
            Forest Cover Decline
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="forestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[29, 32]} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Area type="monotone" dataKey="forestCover" stroke="#22c55e" strokeWidth={2} fill="url(#forestGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ice Cap Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-panel p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Droplets className="h-4 w-4 text-blue-400" />
            Polar Ice Cap Area
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[8, 12]} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Line type="monotone" dataKey="iceCapArea" stroke="#00aaff" strokeWidth={2} dot={{ fill: '#00aaff', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ocean Temperature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-panel p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Wind className="h-4 w-4 text-indigo-400" />
            Ocean Temperature
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066ff" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#0066ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[16, 18.5]} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Area type="monotone" dataKey="oceanTemp" stroke="#0066ff" strokeWidth={2} fill="url(#oceanGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Air Quality Radial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-panel mt-6 p-5"
      >
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <Activity className="h-4 w-4 text-yellow-400" />
          Global Air Quality Index Trend
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart
            innerRadius="20%"
            outerRadius="90%"
            data={timelineData.slice(-5).map((d, i) => ({
              name: d.year.toString(),
              value: d.airQuality,
              fill: ['#00e400', '#ffff00', '#fb5537', '#8f3f97', '#7e0023'][i],
            }))}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar dataKey="value" cornerRadius={6} />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            <Tooltip contentStyle={customTooltipStyle} />
          </RadialBarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
