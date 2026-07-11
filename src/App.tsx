import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import type { ViewMode } from './types';

function App() {
  const [view, setView] = useState<ViewMode>('landing');

  return (
    <div className="min-h-screen bg-space-900">
      {view === 'landing' && <LandingPage onLaunch={() => setView('dashboard')} />}
      {view === 'dashboard' && <Dashboard onExit={() => setView('landing')} />}
    </div>
  );
}

export default App;
