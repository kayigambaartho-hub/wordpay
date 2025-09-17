import React, { useState } from 'react';
import Card from './common/Card';
import Icon from './common/Icon';

const InternationalTransfer: React.FC = () => {
    const [sendAmount, setSendAmount] = useState(1000);
    const exchangeRate = 1.25; // Example rate: 1 USD = 1.25 CAD
    const fee = 5.00;
    const receiveAmount = (sendAmount * exchangeRate) - fee;

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <h3 className="text-lg font-bold text-white mb-6">International Money Transfer</h3>
                <div className="space-y-6">
                    {/* Amount to send */}
                    <div>
                        <label htmlFor="send-amount" className="block text-sm font-medium text-gray-300">You send</label>
                        <div className="mt-1 relative">
                            <input
                                type="number"
                                id="send-amount"
                                value={sendAmount}
                                onChange={(e) => setSendAmount(Number(e.target.value))}
                                className="w-full bg-slate-700/50 border-slate-600 border rounded-lg p-3 pr-20 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-gray-400 sm:text-sm">USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Conversion details */}
                    <div className="flex items-center justify-between text-sm text-gray-400 p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                            <Icon name="globe" className="w-4 h-4 mr-2" />
                            <span>Exchange Rate</span>
                        </div>
                        <span className="text-gray-300">1 USD ≈ {exchangeRate} CAD</span>
                    </div>
                     <div className="flex items-center justify-between text-sm text-gray-400 p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center">
                            <span>-</span>
                            <span className="ml-2">Fee</span>
                        </div>
                        <span className="text-gray-300">${fee.toFixed(2)}</span>
                    </div>

                    {/* Amount to receive */}
                    <div>
                        <label htmlFor="receive-amount" className="block text-sm font-medium text-gray-300">Recipient gets</label>
                        <div className="mt-1 relative">
                            <input
                                type="text"
                                id="receive-amount"
                                value={receiveAmount > 0 ? receiveAmount.toFixed(2) : '0.00'}
                                readOnly
                                className="w-full bg-slate-700/50 border-slate-600 border rounded-lg p-3 pr-20 text-sm font-semibold text-white"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-gray-400 sm:text-sm">CAD</span>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                    >
                        Continue to Recipient
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default InternationalTransfer;