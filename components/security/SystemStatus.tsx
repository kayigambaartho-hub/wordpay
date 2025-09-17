import React from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';
import { ComplianceStatus, Vulnerability } from '../../types';

const mockVulnerabilities: Vulnerability[] = [
    { id: '1', description: 'Outdated dependency "image-parser"', severity: 'Medium', status: 'Open' },
];
const mockCompliance: ComplianceStatus[] = [
    { regulation: 'GDPR', isCompliant: true },
    { regulation: 'PCI DSS', isCompliant: true },
    { regulation: 'AML', isCompliant: true },
];

const SystemStatus: React.FC = () => {
    const openVulnerabilities = mockVulnerabilities.filter(v => v.status === 'Open');

    return (
        <Card>
            <h3 className="font-bold text-lg text-white mb-4">System Security & Compliance</h3>

            <div className="p-4 rounded-lg bg-green-500/10 text-green-300 flex items-center">
                <Icon name="shield" className="w-6 h-6 mr-3"/>
                <div>
                    <h4 className="font-semibold">All Systems Secure</h4>
                    <p className="text-xs">Last checked: 5 minutes ago</p>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="font-semibold text-md text-gray-200 mb-2">Vulnerability Scan</h4>
                <div className="text-sm p-3 rounded-lg bg-slate-700/50">
                    {openVulnerabilities.length > 0 ? (
                        <div>
                             <p>{openVulnerabilities.length} open issue(s) found.</p>
                             {openVulnerabilities.map(v => (
                                 <p key={v.id} className="text-xs mt-1 text-yellow-400">
                                    <span className="font-bold">{v.severity}:</span> {v.description}
                                </p>
                             ))}
                        </div>
                    ) : (
                        <p>No open vulnerabilities found.</p>
                    )}
                </div>
            </div>

            <div className="mt-6">
                 <h4 className="font-semibold text-md text-gray-200 mb-2">Compliance Status</h4>
                 <ul className="space-y-2">
                    {mockCompliance.map(item => (
                         <li key={item.regulation} className="flex items-center text-sm">
                            <Icon name="check" className="w-4 h-4 mr-2 text-green-400" />
                            <span className="font-medium text-gray-300">{item.regulation}:</span>
                            <span className="ml-2 font-semibold text-green-400">Compliant</span>
                         </li>
                    ))}
                 </ul>
            </div>
        </Card>
    );
};

export default SystemStatus;