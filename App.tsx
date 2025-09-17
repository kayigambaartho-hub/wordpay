import React, { useState } from 'react';
import { NavView } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import InternationalTransfer from './components/InternationalTransfer';
import PayBills from './components/PayBills';
import FinancialAssistant from './components/FinancialAssistant';
import SecurityCenter from './components/SecurityCenter';
import GovernmentServices from './components/GovernmentServices';
import Header from './components/Header';
import LinkedAccounts from './components/LinkedAccounts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavView>(NavView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case NavView.DASHBOARD:
        return <Dashboard />;
      case NavView.SEND_MONEY:
        return <SendMoney />;
      case NavView.LINKED_ACCOUNTS:
        return <LinkedAccounts />;
      case NavView.INTERNATIONAL:
        return <InternationalTransfer />;
      case NavView.PAY_BILLS:
        return <PayBills />;
      case NavView.ASSISTANT:
        return <FinancialAssistant />;
      case NavView.SECURITY_CENTER:
        return <SecurityCenter />;
      case NavView.GOVERNMENT_SERVICES:
        return <GovernmentServices />;
      default:
        return <Dashboard />;
    }
  };
  
  const viewTitles: { [key in NavView]: string } = {
    [NavView.DASHBOARD]: 'Dashboard',
    [NavView.SEND_MONEY]: 'Send & Request Money',
    [NavView.LINKED_ACCOUNTS]: 'Linked Accounts',
    [NavView.INTERNATIONAL]: 'International Transfer',
    [NavView.PAY_BILLS]: 'Pay Bills',
    [NavView.ASSISTANT]: 'AI Financial Assistant',
    [NavView.SECURITY_CENTER]: 'Security Center',
    [NavView.GOVERNMENT_SERVICES]: 'Government Services',
  };

  return (
    <div className="flex h-screen bg-transparent text-gray-200 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <Header title={viewTitles[currentView]} />
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;