
import React from 'react';
import { Settings, Database, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="backdrop-blur-md bg-white/20 dark:bg-black/40 border-b border-white/20 dark:border-white/10 px-6 py-4 flex items-center justify-between mb-8 animate-fade-in shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
          <Activity size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Predictive Maintenance</h1>
          <p className="text-sm text-muted-foreground">Extion Infotech | Manufacturing Intelligence</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border-white/20 dark:border-white/10">
          <Database size={16} />
          <span className="hidden sm:inline">Data Source</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border-white/20 dark:border-white/10">
          <Settings size={16} />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
