import React from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';
import { LoginActivity } from '../../types';

const mockActivity: LoginActivity[] = [
    { id: '1', device: 'Chrome on Windows', location: 'New York, USA', ipAddress: '192.168.1.1', timestamp: '2024-07-29 11:00 AM', isSuspicious: false },
    { id: '2', device: 'Safari on iPhone', location: 'New York, USA', ipAddress: '192.168.1.1', timestamp: '2024-07-29 09:30 AM', isSuspicious: false },
    { id: '3', device: 'Firefox on Linux', location: 'Dublin, Ireland', ipAddress: '89.101.163.45', timestamp: '2024-07-28 05:12 PM', isSuspicious: true },
    { id: '4', device: 'Chrome on Windows', location: 'New York, USA', ipAddress: '192.168.1.1', timestamp: '2024-07-28 01:20 PM', isSuspicious: false },
];

const LoginActivity: React.FC = () => {
    return (
        <Card>
            <h3 className="font-bold text-lg text-white mb-4">Recent Login Activity</h3>
            <ul className="space-y-3">
                {mockActivity.map(activity => (
                    <li key={activity.id} className={`flex items-center justify-between p-3 -mx-3 rounded-lg ${activity.isSuspicious ? 'bg-red-500/10' : ''}`}>
                        <div className="flex items-center">
                            <Icon name="user" className={`w-6 h-6 ${activity.isSuspicious ? 'text-red-400' : 'text-gray-400'}`} />
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-gray-200">{activity.device}</p>
                                <p className="text-xs text-gray-400">{activity.location} ({activity.ipAddress})</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{activity.timestamp}</p>
                    </li>
                ))}
            </ul>
             <button className="mt-4 w-full text-center text-sm font-medium text-cyan-400 hover:text-cyan-300">
                View Full Login History
            </button>
        </Card>
    );
};

export default LoginActivity;