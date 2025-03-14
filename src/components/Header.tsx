
import React from 'react';
import { Settings, Database, Activity, ChevronDown, Bell, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900/90 via-indigo-950/80 to-slate-900/90 border-b border-white/10 px-6 py-4 sticky top-0 z-30 backdrop-blur-lg mb-8 animate-fade-in shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="size-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-md shadow-blue-500/20 ring-1 ring-white/10">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
              Predictive Maintenance
            </h1>
            <div className="flex items-center text-sm text-blue-200/70">
              <span>Extion Infotech</span>
              <span className="mx-2">|</span>
              <span className="flex items-center gap-1">
                <BarChart2 size={14} />
                <span>ML Powered Analysis</span>
              </span>
              <span className="ml-2 bg-blue-800/30 text-blue-300 text-xs px-2 py-0.5 rounded-full border border-blue-700/30">
                Python + R Backed
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="relative bg-white/5 border-white/10 hover:bg-white/10 transition-all">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 size-2.5 bg-blue-500 rounded-full animate-pulse"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <Database size={16} />
                <span className="hidden sm:inline">Data Source</span>
                <ChevronDown size={14} className="opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-lg border-white/10">
              <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">NASA Turbofan Dataset</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">Manufacturing Sensors</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">IoT Equipment Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <Settings size={16} />
                <span className="hidden sm:inline">Settings</span>
                <ChevronDown size={14} className="opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-lg border-white/10">
              <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">Model Configuration</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">Alert Thresholds</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">API Connections</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
