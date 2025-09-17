import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Card from './common/Card';
import Icon from './common/Icon';
import { Transaction, SpendingCategory } from '../types';

const mockTransactions: Transaction[] = [
    { id: '1', type: 'Debit', description: 'Spotify Subscription', amount: 10.99, date: '2024-07-28', status: 'Completed' },
    { id: '2', type: 'Credit', description: 'Paycheck Deposit', amount: 2500.00, date: '2024-07-27', status: 'Completed' },
    { id: '3', type: 'Debit', description: 'Grocery Store', amount: 85.40, date: '2024-07-26', status: 'Completed' },
    { id: '4', type: 'Debit', description: 'Transfer to Jane Doe', amount: 150.00, date: '2024-07-25', status: 'Pending' },
    { id: '5', type: 'Credit', description: 'Refund from Amazon', amount: 32.50, date: '2024-07-24', status: 'Completed' },
];

const spendingData: SpendingCategory[] = [
    { name: 'Groceries', value: 400 },
    { name: 'Utilities', value: 150 },
    { name: 'Entertainment', value: 200 },
    { name: 'Transport', value: 120 },
    { name: 'Other', value: 300 },
];
const COLORS = ['#00F5D4', '#9D4EDD', '#00B2FF', '#FF00F5', '#3C4EDD'];


const StatusBadge: React.FC<{ status: 'Completed' | 'Pending' | 'Failed' }> = ({ status }) => {
    const baseClasses = 'px-2.5 py-0.5 text-xs font-medium rounded-full inline-flex items-center';
    const styles = {
        Completed: 'bg-green-500/10 text-green-300',
        Pending: 'bg-yellow-500/10 text-yellow-300',
        Failed: 'bg-red-500/10 text-red-300',
    };
    const icons = {
        Completed: <Icon name="check" className="w-3 h-3 mr-1" />,
        Pending: <Icon name="clock" className="w-3 h-3 mr-1" />,
        Failed: <Icon name="x" className="w-3 h-3 mr-1" />,
    }
    return <span className={`${baseClasses} ${styles[status]}`}>{icons[status]}{status}</span>;
};

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Balance Card */}
                <Card className="lg:col-span-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-400">Total Balance</p>
                            <p className="text-4xl font-bold text-white mt-1">$10,432.55</p>
                            <p className="text-sm text-green-400 flex items-center mt-2">+ $532.10 this month</p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 text-sm font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_10px_rgba(0,245,212,0.5)]">Add Money</button>
                            <button className="px-4 py-2 text-sm font-semibold text-gray-200 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">Send Money</button>
                        </div>
                    </div>
                </Card>

                {/* Spending Chart */}
                <Card>
                    <h3 className="font-bold text-lg text-white">Monthly Spending</h3>
                     <div className="w-full h-32 mt-2">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={spendingData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5} dataKey="value">
                                    {spendingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} formatter={(value: number) => `$${value}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Recent Transactions Timeline */}
            <Card>
                <h3 className="font-bold text-lg text-white mb-6">Recent Transactions</h3>
                <div className="relative pl-8">
                     <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-700 rounded"></div>
                     {mockTransactions.map((tx, index) => (
                        <div key={tx.id} className="relative mb-6">
                            <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-slate-700 border-4 border-slate-800">
                                <div className={`w-full h-full rounded-full ${tx.type === 'Credit' ? 'bg-cyan-400' : 'bg-pink-500'}`}></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-sm text-gray-200">{tx.description}</p>
                                    <p className="text-xs text-gray-400">{tx.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-semibold text-sm ${tx.type === 'Credit' ? 'text-green-400' : 'text-gray-200'}`}>
                                        {tx.type === 'Credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                                    </p>
                                    <StatusBadge status={tx.status} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;