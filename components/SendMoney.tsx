import React from 'react';
import Card from './common/Card';

const SendMoney: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h3 className="text-lg font-bold text-white mb-6">Send Money</h3>
        <form className="space-y-6">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-300">Recipient</label>
            <div className="mt-1">
              <input
                type="text"
                name="recipient"
                id="recipient"
                className="w-full bg-slate-700/50 border-slate-600 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                placeholder="Name, @username, email, or phone"
              />
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount</label>
            <div className="mt-1 relative rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <span className="text-gray-400 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="amount"
                id="amount"
                className="w-full bg-slate-700/50 border-slate-600 border rounded-lg p-3 pl-7 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                placeholder="0.00"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-gray-400 sm:text-sm">USD</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-300">Note (Optional)</label>
            <div className="mt-1">
              <textarea
                id="note"
                name="note"
                rows={3}
                className="w-full bg-slate-700/50 border-slate-600 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                placeholder="What's this for?"
              ></textarea>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              Send Payment
            </button>
            <button
              type="button"
              className="flex-1 inline-flex justify-center py-3 px-4 border border-slate-600 shadow-sm text-sm font-medium rounded-md text-gray-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              Request
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SendMoney;