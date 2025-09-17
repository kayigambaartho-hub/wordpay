import React from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';
import { FlaggedTransaction } from '../../types';

const mockAlerts: FlaggedTransaction[] = [
    { id: '1', description: 'Online purchase at "SuperElectronics"', amount: 1250.00, date: '2024-07-29 10:45 PM', riskScore: 85, reason: 'High-risk: Unusual location (Moscow, RU) and new device.', status: 'Pending Review' },
    { id: '2', description: 'Withdrawal from ATM #4821', amount: 500.00, date: '2024-07-29 02:15 PM', riskScore: 60, reason: 'Medium-risk: Transaction amount is 3x user average.', status: 'Pending Review' },
    { id: '3', description: 'Transfer to "C. Harris"', amount: 20.00, date: '2024-07-28 08:30 AM', riskScore: 95, reason: 'High-risk: Recipient account has a history of flagged activity.', status: 'Blocked' },
];

const RiskScoreBar: React.FC<{ score: number }> = ({ score }) => {
    let color = 'bg-yellow-400';
    if (score >= 75) color = 'bg-red-500';
    else if (score < 50) color = 'bg-cyan-400';

    return (
        <div className="w-full bg-slate-600 rounded-full h-2">
            <div className={`${color} h-2 rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
    );
};


const FraudAlerts: React.FC = () => {
    return (
        <Card>
            <h3 className="font-bold text-lg text-white mb-4">Real-Time Fraud Alerts</h3>
            <div className="space-y-4">
                {mockAlerts.map(alert => (
                    <div key={alert.id} className="p-4 rounded-lg bg-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between border border-slate-700">
                        <div className="flex-grow">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-gray-200">{alert.description}</p>
                                <p className="font-bold text-lg text-red-400">-${alert.amount.toFixed(2)}</p>
                            </div>
                            <p className="text-xs text-gray-400">{alert.date}</p>
                            <div className="mt-2">
                                <p className="text-sm font-medium text-gray-300">Risk Score: {alert.riskScore}/100</p>
                                <RiskScoreBar score={alert.riskScore} />
                            </div>
                            <p className="text-sm mt-2 text-gray-400"><span className="font-semibold text-gray-300">Reason:</span> {alert.reason}</p>
                        </div>
                        <div className="flex space-x-2 mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                            {alert.status === 'Pending Review' && (
                                <>
                                    <button className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">Block</button>
                                    <button className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Approve</button>
                                </>
                            )}
                            {alert.status === 'Blocked' && (
                                <span className="px-3 py-1 text-xs font-semibold text-red-300 bg-red-500/10 rounded-md">Blocked</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default FraudAlerts;