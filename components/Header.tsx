import React from 'react';
import Icon from './common/Icon';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 lg:px-8 flex-shrink-0">
        <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
        <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                />
            </div>
            <button className="p-2 rounded-full hover:bg-slate-800/50">
                <Icon name="bell" className="w-6 h-6 text-gray-400" />
            </button>
            <div className="flex items-center space-x-3">
                <img src="https://picsum.photos/40/40" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-slate-600" />
                <div className="hidden lg:block">
                    <p className="font-semibold text-sm text-white">Alex Turner</p>
                    <p className="text-xs text-gray-400">alex.t@example.com</p>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;