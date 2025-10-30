
import React from 'react';
import type { SculptureSettings } from '../types';
import Slider from './Slider';

interface ControlPanelProps {
  settings: SculptureSettings;
  setSettings: React.Dispatch<React.SetStateAction<SculptureSettings>>;
  onRandomize: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, setSettings, onRandomize }) => {
  const handleSettingChange = (key: keyof SculptureSettings, value: string | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleNumericChange = (key: keyof SculptureSettings, value: string) => {
    handleSettingChange(key, Number(value));
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="hidden lg:flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-wider">Controls</h1>
        <button 
          onClick={onRandomize}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors text-sm font-semibold"
        >
          Randomize
        </button>
      </div>

      <div className="space-y-6">
        <Slider label="Element Count" min="20" max="250" step="1" value={settings.elementCount} onChange={(e) => handleNumericChange('elementCount', e.target.value)} />
        <Slider label="Sculpture Radius" min="20" max="250" step="1" value={settings.sculptureRadius} onChange={(e) => handleNumericChange('sculptureRadius', e.target.value)} />
        <Slider label="Line Length" min="10" max="200" step="1" value={settings.lineLength} onChange={(e) => handleNumericChange('lineLength', e.target.value)} />
        <Slider label="Line Width" min="0.5" max="10" step="0.1" value={settings.lineWidth} onChange={(e) => handleNumericChange('lineWidth', e.target.value)} />
        <Slider label="Base Speed" min="-50" max="50" step="1" value={settings.baseSpeed} onChange={(e) => handleNumericChange('baseSpeed', e.target.value)} />
        <Slider label="Speed Increment" min="-2" max="2" step="0.05" value={settings.speedIncrement} onChange={(e) => handleNumericChange('speedIncrement', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
        <div>
          <label htmlFor="startColor" className="block text-sm font-medium text-gray-300 mb-2">Start Color</label>
          <input id="startColor" type="color" value={settings.startColor} onChange={(e) => handleSettingChange('startColor', e.target.value)} className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer" />
        </div>
        <div>
          <label htmlFor="endColor" className="block text-sm font-medium text-gray-300 mb-2">End Color</label>
          <input id="endColor" type="color" value={settings.endColor} onChange={(e) => handleSettingChange('endColor', e.target.value)} className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer" />
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-xs pt-4 mt-auto">
        <p>Built by a world-class senior frontend React engineer.</p>
      </div>
    </div>
  );
};

export default ControlPanel;
