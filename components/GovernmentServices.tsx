import React, { useState } from 'react';
import Card from './common/Card';
import Icon from './common/Icon';

const services = [
  { id: 'legal', title: 'Legal Documents', description: 'Request criminal record certificates.', icon: 'shield' },
  { id: 'vital', title: 'Vital Records', description: 'Apply for birth or marriage certificates.', icon: 'receipt' },
  { id: 'traffic', title: 'Traffic Services', description: 'Pay fines and renew vehicle documents.', icon: 'globe' },
  { id: 'property', title: 'Property Services', description: 'Pay land taxes and manage titles.', icon: 'dashboard' },
];

const GovernmentServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [nationalId, setNationalId] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setFormSubmitted(false);
    setNationalId('');
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(nationalId.trim()) {
        setFormSubmitted(true);
      }
  }

  const handleBack = () => {
    setSelectedService(null);
  }

  const currentService = services.find(s => s.id === selectedService);
  const documentType = currentService?.id === 'legal' ? 'Criminal Record Certificate' : 'Service Request';
  const serviceFee = 10.50; // Example fee

  if (selectedService && currentService) {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <button onClick={handleBack} className="flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 mb-4">
                    <Icon name="chevronRight" className="w-5 h-5 mr-1 transform rotate-180" />
                    Back to Services
                </button>

                {!formSubmitted ? (
                    <>
                        <div className="flex items-center mb-6">
                            <Icon name={currentService.icon} className="w-8 h-8 mr-4 text-cyan-400" />
                            <div>
                                <h3 className="text-lg font-bold text-white">{currentService.title}</h3>
                                <p className="text-sm text-gray-400">{currentService.description}</p>
                            </div>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nationalId" className="block text-sm font-medium text-gray-300">National ID Number</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="nationalId"
                                        id="nationalId"
                                        value={nationalId}
                                        onChange={(e) => setNationalId(e.target.value)}
                                        className="w-full bg-slate-700/50 border-slate-600 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                                        placeholder="Enter your National ID"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Your ID is used to securely verify your identity and pre-fill application details.</p>
                            </div>

                            <div className="p-4 rounded-lg bg-slate-700/50 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Service:</span>
                                    <span className="font-medium text-gray-200">{documentType}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Processing Fee:</span>
                                    <span className="font-medium text-gray-200">${serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-slate-600 my-2"></div>
                                <div className="flex justify-between font-bold text-md">
                                    <span className="text-gray-200">Total:</span>
                                    <span className="text-cyan-400">${serviceFee.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                            >
                                Pay & Submit Application
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/10 text-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="check" className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Application Submitted</h3>
                        <p className="text-sm text-gray-400 mt-2">Your request for a {documentType} has been successfully submitted. You will receive a notification once it is processed.</p>
                        <p className="text-xs text-gray-500 mt-1">Tracking Number: <span className="font-mono">WP-8A4B2Z9P</span></p>
                    </div>
                )}
            </Card>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
        <Card>
            <h3 className="text-lg font-bold text-white mb-2">Government & Social Services</h3>
            <p className="text-sm text-gray-400 mb-6">Access essential government services securely from your WordyPay account. Select a category to begin.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                    <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className="flex items-center p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700/80 cursor-pointer transition-all duration-300 group border border-slate-700 hover:border-cyan-400 hover:scale-[1.02]"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-full shadow-sm mr-4">
                            <Icon name={service.icon} className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-200 group-hover:text-cyan-300">{service.title}</p>
                            <p className="text-xs text-gray-400">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    </div>
  );
};

export default GovernmentServices;