import React from 'react';
import Card from './common/Card';
import Icon from './common/Icon';

const billers = [
  { name: 'Electricity', icon: 'sparkles' },
  { name: 'Water', icon: 'sparkles' },
  { name: 'Internet', icon: 'globe' },
  { name: 'Mobile Recharge', icon: 'send' },
  { name: 'Credit Card', icon: 'dashboard' },
  { name: 'Insurance', icon: 'receipt' },
];

const BillerCard: React.FC<{ name: string, icon: string }> = ({ name, icon }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700/80 cursor-pointer transition-colors group border border-slate-700 hover:border-cyan-400">
        <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-full shadow-sm mb-3">
            <Icon name={icon} className="w-6 h-6 text-cyan-400" />
        </div>
        <p className="text-sm font-semibold text-gray-300 group-hover:text-cyan-300">{name}</p>
    </div>
);

const PayBills: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Pay Bills</h3>
          <a href="#" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
            View All Billers
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {billers.map(biller => (
            <BillerCard key={biller.name} name={biller.name} icon={biller.icon} />
          ))}
        </div>
      </Card>
      
      <Card className="mt-8">
        <h3 className="text-lg font-bold text-white mb-4">Scheduled Payments</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-700/50">
            <div>
              <p className="font-semibold text-sm">Netflix Subscription</p>
              <p className="text-xs text-gray-400">Next payment: Aug 5, 2024</p>
            </div>
            <p className="font-bold text-sm text-white">$15.49</p>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-700/50">
            <div>
              <p className="font-semibold text-sm">AT&T Internet</p>
              <p className="text-xs text-gray-400">Next payment: Aug 12, 2024</p>
            </div>
            <p className="font-bold text-sm text-white">$60.00</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PayBills;