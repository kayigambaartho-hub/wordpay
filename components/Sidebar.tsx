import React from 'react';
import { NavView } from '../types';
import Icon from './common/Icon';

interface SidebarProps {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: NavView.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { view: NavView.SEND_MONEY, label: 'Send & Request', icon: 'send' },
    { view: NavView.LINKED_ACCOUNTS, label: 'Linked Accounts', icon: 'link' },
    { view: NavView.INTERNATIONAL, label: 'International', icon: 'globe' },
    { view: NavView.PAY_BILLS, label: 'Pay Bills', icon: 'receipt' },
    { view: NavView.GOVERNMENT_SERVICES, label: 'Gov Services', icon: 'building' },
    { view: NavView.ASSISTANT, label: 'AI Assistant', icon: 'sparkles' },
    { view: NavView.SECURITY_CENTER, label: 'Security Center', icon: 'shield' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-slate-900/60 backdrop-blur-md flex flex-col transition-all duration-300 border-r border-slate-700 z-10">
      <div className="flex items-center justify-center lg:justify-start h-20 px-6 border-b border-slate-700">
        <div className="w-9 h-9 bg-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(0,245,212,0.7)]">
          <div className="w-6 h-6 bg-cyan-200 rounded-full"></div>
        </div>
        <h1 className="text-xl font-bold ml-3 hidden lg:block text-white tracking-wider">WordyPay</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.view}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView(item.view);
            }}
            className={`flex items-center justify-center lg:justify-start p-3 rounded-lg text-sm font-medium transition-colors relative ${
              currentView === item.view
                ? 'bg-slate-700/50 text-white'
                : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            {currentView === item.view && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-full"></div>}
            <Icon name={item.icon} className="w-6 h-6" />
            <span className="ml-4 hidden lg:block">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-slate-700">
        <a
            href="#"
            className={`flex items-center justify-center lg:justify-start p-3 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:bg-slate-800/50 hover:text-white`}
        >
            <Icon name="logout" className="w-6 h-6" />
            <span className="ml-4 hidden lg:block">Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;