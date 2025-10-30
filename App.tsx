
import React, { useState, useCallback } from 'react';
import KineticSculpture from './components/KineticSculpture';
import ControlPanel from './components/ControlPanel';
import type { SculptureSettings } from './types';

const App: React.FC = () => {
  const [settings, setSettings] = useState<SculptureSettings>({
    elementCount: 120,
    sculptureRadius: 150,
    lineLength: 100,
    lineWidth: 2,
    baseSpeed: 10,
    speedIncrement: 0.5,
    startColor: '#ffffff',
    endColor: '#cccccc',
  });

  const randomizeSettings = useCallback(() => {
    const randomHex = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setSettings({
      elementCount: Math.floor(Math.random() * 160) + 40, // 40-200
      sculptureRadius: Math.floor(Math.random() * 100) + 50, // 50-150
      lineLength: Math.floor(Math.random() * 100) + 20, // 20-120
      lineWidth: Math.random() * 3 + 1, // 1-4
      baseSpeed: Math.random() * 40 - 20, // -20 to 20
      speedIncrement: Math.random() * 2 - 1, // -1 to 1
      startColor: randomHex(),
      endColor: randomHex(),
    });
  }, []);

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-900 font-sans overflow-hidden">
      <header className="w-full lg:hidden p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white tracking-wider">Kinetic Sculpture</h1>
        <button 
          onClick={randomizeSettings}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors text-sm font-semibold"
        >
          Randomize
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center relative overflow-hidden p-4">
        <div className="w-full h-full max-w-full max-h-full aspect-square relative">
          <KineticSculpture {...settings} />
        </div>
      </main>

      <aside className="w-full lg:w-80 lg:min-w-80 lg:max-w-xs bg-gray-800/50 backdrop-blur-sm lg:border-l lg:border-gray-700 p-6 overflow-y-auto">
        <ControlPanel settings={settings} setSettings={setSettings} onRandomize={randomizeSettings} />
      </aside>
    </div>
  );
};

export default App;