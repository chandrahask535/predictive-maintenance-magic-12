
import React from 'react';
import { Settings, Database, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="glass-panel border-b border-white/10 px-6 py-3 flex items-center justify-between mb-8 animate-fade-in">
      <div className="flex items-center space-x-2">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Activity size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-medium">Predictive Maintenance</h1>
          <p className="text-sm text-muted-foreground">Manufacturing Equipment Analysis</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Database size={16} />
          <span className="hidden sm:inline">Data Source</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings size={16} />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
