import { motion } from 'framer-motion';
import { Rocket, ChevronDown, Globe2, Satellite, Brain, Activity } from 'lucide-react';
import { EarthScene } from './EarthScene';

interface LandingPageProps {
  onLaunch: () => void;
}

export function LandingPage({ onLaunch }: LandingPageProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-space-900">
      {/* 3D Earth background */}
      <div className="absolute inset-0 z-0">
        <EarthScene
          activeLayers={new Set()}
          earthquakes={[]}
          wildfires={[]}
          weatherData={[]}
          airQualityData={[]}
          satellites={[]}
          flights={[]}
          autoRotate
          showClouds
          showAtmosphere
          dayNight
        />
      </div>

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-space-900/40 via-transparent to-space-900/80" />

      {/* Top nav bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 md:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Globe2 className="h-8 w-8 text-electric-400" />
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-electric-400/30 blur-xl" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white">
            Planet<span className="text-electric-400">AI</span>
          </span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-electric-400">Features</a>
          <a href="#tech" className="transition hover:text-electric-400">Technology</a>
          <a href="#about" className="transition hover:text-electric-400">About</a>
        </div>
        <button onClick={onLaunch} className="btn-primary text-sm">
          Launch Explorer
        </button>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-4"
        >
          <span className="data-badge glass-panel border border-electric-400/30 text-electric-400">
            <Activity className="h-3 w-3" />
            AI-Powered Earth Intelligence Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl text-5xl font-extrabold leading-tight text-white glow-text md:text-7xl"
        >
          Explore Earth Like
          <br />
          <span className="text-gradient">Never Before</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg"
        >
          An AI-powered Digital Twin combining satellite visualization, weather,
          disasters, climate intelligence, and space data in one immersive experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button onClick={onLaunch} className="btn-primary flex items-center gap-2 text-base">
            <Rocket className="h-5 w-5" />
            Launch Explorer
          </button>
          <a href="#features" className="btn-secondary flex items-center justify-center gap-2 text-base">
            Learn More
            <ChevronDown className="h-5 w-5" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-1 text-electric-400/60"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Features section */}
      <div id="features" className="relative z-20 bg-gradient-to-b from-transparent via-space-900 to-space-900 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-center text-3xl font-bold text-white md:text-4xl"
          >
            A Complete <span className="text-gradient">Earth Intelligence</span> Platform
          </motion.h2>
          <p className="mb-16 text-center text-slate-400">
            Explore 14 powerful modules for understanding our planet in real time
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Globe2, title: 'Interactive 3D Earth', desc: 'Rotate, zoom, and explore Earth with realistic textures, day/night cycles, and atmospheric glow.' },
              { icon: Activity, title: 'Live Weather Layer', desc: 'Temperature, rainfall, wind, humidity, pressure, and storm locations across the globe.' },
              { icon: Activity, title: 'Earthquake Monitoring', desc: 'Animated markers showing real-time seismic activity with magnitude, depth, and risk levels.' },
              { icon: Activity, title: 'Air Pollution Tracking', desc: 'AQI visualization with PM2.5, PM10, CO, and NO2 data using color gradients.' },
              { icon: Activity, title: 'Wildfire Detection', desc: 'Active fire hotspots with intensity, area affected, and detection time.' },
              { icon: Satellite, title: 'Satellite Tracker', desc: 'Track ISS, weather, GPS, and communication satellites in real-time orbits.' },
              { icon: Satellite, title: 'Flight Tracker', desc: 'Live flight paths with origin, destination, speed, and altitude data.' },
              { icon: Brain, title: 'Climate Change Simulator', desc: 'Adjust CO2, glacier melt, sea level, and temperature to see Earth transform.' },
              { icon: Brain, title: 'Disaster Simulator', desc: 'Simulate cyclones, hurricanes, floods, earthquakes, tsunamis, and volcanoes.' },
              { icon: Brain, title: 'AI Earth Assistant', desc: 'Ask questions about natural phenomena, climate, and Earth systems.' },
              { icon: Globe2, title: 'Space View', desc: 'Zoom out to explore the Moon, Mars, Sun, and major planets of our solar system.' },
              { icon: Activity, title: 'Analytics Dashboard', desc: 'Live charts for global temperature, CO2, population, forest cover, and ice caps.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-panel group p-6 transition-all hover:border-electric-400/40 hover:glow-border"
              >
                <div className="mb-4 inline-flex rounded-xl bg-electric-400/10 p-3 transition group-hover:bg-electric-400/20">
                  <f.icon className="h-6 w-6 text-electric-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech section */}
      <div id="tech" className="relative z-20 bg-space-900 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-3xl font-bold text-white md:text-4xl"
          >
            Built with <span className="text-gradient">Cutting-Edge</span> Technology
          </motion.h2>
          <p className="mb-12 text-slate-400">
            React, TypeScript, Three.js, React Three Fiber, Tailwind CSS, Framer Motion, Recharts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Three.js', 'R3F', 'Tailwind', 'Framer Motion', 'Recharts'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel px-6 py-3 text-sm font-medium text-electric-400"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* About / CTA */}
      <div id="about" className="relative z-20 bg-space-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Explore?
            </h2>
            <p className="mb-10 text-lg text-slate-400">
              Launch the full 3D Digital Twin of Earth and experience the planet like a space agency scientist.
            </p>
            <button onClick={onLaunch} className="btn-primary flex items-center gap-2 text-base mx-auto">
              <Rocket className="h-5 w-5" />
              Launch Explorer
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 border-t border-electric-400/10 bg-space-900 px-6 py-8 text-center text-sm text-slate-500">
        <p>PlanetAI – AI Powered 3D Digital Twin of Earth</p>
      </footer>
    </div>
  );
}
