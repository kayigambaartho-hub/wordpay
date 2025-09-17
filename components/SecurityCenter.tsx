import React from 'react';
import FraudAlerts from './security/FraudAlerts';
import LoginActivity from './security/LoginActivity';
import SystemStatus from './security/SystemStatus';

const SecurityCenter: React.FC = () => {
    return (
        <div className="space-y-8">
            <FraudAlerts />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <LoginActivity />
                <SystemStatus />
            </div>
        </div>
    );
};

export default SecurityCenter;