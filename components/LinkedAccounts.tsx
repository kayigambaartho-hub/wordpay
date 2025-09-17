import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Icon from './common/Icon';
import { LinkedAccount } from '../types';

// Bank logos as React components for better control and performance
const BankLogos: { [key: string]: React.ReactElement } = {
    bk: <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><path fill="#0033A0" d="M0 0h200v200H0z"/><path fill="#FFFFFF" d="M60 60h80v20H80v60H60V60zm60 40h-20v40h40V80h-20v20z"/></svg>,
    bpr: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><rect width="100" height="100" fill="#E30613"/><text x="50" y="60" fontFamily="Arial, sans-serif" fontSize="40" fill="white" textAnchor="middle" fontWeight="bold">BPR</text></svg>,
    ecobank: <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><path fill="#0047AB" d="M0 0h200v200H0z"/><path fill="#FFFFFF" d="M40 80 Q100 40, 160 80 L160 120 Q100 160, 40 120 Z"/></svg>,
    im: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><rect width="100" height="100" fill="#AA1D36"/><text x="50" y="65" fontFamily="Impact, sans-serif" fontSize="45" fill="white" textAnchor="middle">I&amp;M</text></svg>,
    equity: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><rect width="100" height="100" fill="#F58220"/><path fill="white" d="M20 50 L50 20 L80 50 L50 80 Z"/></svg>,
};

const MOCK_BANKS = [
  { id: 'bk', name: 'Bank of Kigali', logo: BankLogos.bk },
  { id: 'bpr', name: 'BPR Bank Rwanda', logo: BankLogos.bpr },
  { id: 'ecobank', name: 'Ecobank Rwanda', logo: BankLogos.ecobank },
  { id: 'im', name: 'I&M Bank Rwanda', logo: BankLogos.im },
  { id: 'equity', name: 'Equity Bank Rwanda', logo: BankLogos.equity },
];

const MOCK_INITIAL_ACCOUNTS: LinkedAccount[] = [
  { id: '1', bankName: 'Bank of Kigali', accountNumber: '**** 1234', balance: 5210.45, logo: BankLogos.bk },
];

const LinkedAccounts: React.FC = () => {
    const [viewState, setViewState] = useState<'list' | 'select_bank' | 'success'>('list');
    const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>(MOCK_INITIAL_ACCOUNTS);
    const [selectedBank, setSelectedBank] = useState<{id: string, name: string, logo: React.ReactElement} | null>(null);

    const totalBalance = useMemo(() => linkedAccounts.reduce((sum, acc) => sum + acc.balance, 0), [linkedAccounts]);

    const handleSelectBank = (bank: {id: string, name: string, logo: React.ReactElement}) => {
        setSelectedBank(bank);
        // Simulate a secure linking process
        setTimeout(() => {
            const newAccount: LinkedAccount = {
                id: (linkedAccounts.length + 2).toString(),
                bankName: bank.name,
                accountNumber: `**** ${Math.floor(1000 + Math.random() * 9000)}`,
                balance: Math.floor(500 + Math.random() * 10000),
                logo: bank.logo,
            };
            setLinkedAccounts(prev => [...prev, newAccount]);
            setViewState('success');
        }, 1500);
    };

    const handleFinish = () => {
        setViewState('list');
        setSelectedBank(null);
    };

    if (viewState === 'select_bank') {
        return (
            <Card className="max-w-3xl mx-auto">
                <button onClick={() => setViewState('list')} className="flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 mb-4">
                    <Icon name="chevronRight" className="w-5 h-5 mr-1 transform rotate-180" />
                    Back
                </button>
                <h3 className="text-lg font-bold text-white mb-2">Link a New Account</h3>
                <p className="text-sm text-gray-400 mb-6">Select your bank to securely connect your account. We use an encrypted, tokenized process and never store your credentials.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {MOCK_BANKS.map(bank => (
                        <div key={bank.id} onClick={() => handleSelectBank(bank)} className="flex flex-col items-center p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700/80 cursor-pointer transition-all duration-300 group border border-slate-700 hover:border-cyan-400">
                            <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-full mb-3 overflow-hidden">
                                {bank.logo}
                            </div>
                            <p className="text-sm font-semibold text-center text-gray-300 group-hover:text-cyan-300">{bank.name}</p>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }
    
    if (viewState === 'success' && selectedBank) {
        return (
            <Card className="max-w-lg mx-auto">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/10 text-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="check" className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Account Linked Successfully!</h3>
                    <p className="text-sm text-gray-400 mt-2">Your {selectedBank.name} account has been securely added to WordyPay.</p>
                    <button
                        onClick={handleFinish}
                        className="mt-6 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Card>
                <p className="text-sm text-gray-400">Aggregated Balance</p>
                <p className="text-4xl font-bold text-white mt-1">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </Card>
            
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Your Linked Accounts</h3>
                    <button onClick={() => setViewState('select_bank')} className="px-4 py-2 text-sm font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_10px_rgba(0,245,212,0.5)]">
                        Link New Account
                    </button>
                </div>
                <div className="space-y-3">
                    {linkedAccounts.map(account => (
                        <div key={account.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                            <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-full mr-4 overflow-hidden">
                                    {account.logo}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-gray-200">{account.bankName}</p>
                                    <p className="text-xs text-gray-400">{account.accountNumber}</p>
                                </div>
                            </div>
                            <p className="font-bold text-sm text-white">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default LinkedAccounts;