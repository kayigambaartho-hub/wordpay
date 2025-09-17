import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamFinancialAdvice } from '../services/geminiService';
import Card from './common/Card';
import Icon from './common/Icon';

const FinancialAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    // Add a placeholder for the model's response
    setMessages((prev) => [...prev, { role: 'model', text: '' }]);

    try {
      const stream = await streamFinancialAdvice(input);
      let text = '';
      for await (const chunk of stream) {
        text += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: text };
            return newMessages;
        });
      }
    } catch (err) {
      const errorMessage = 'Sorry, I am having trouble connecting. Please try again later.';
      setError(errorMessage);
      setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: errorMessage };
          return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto">
        <Card className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400">
                        <Icon name="sparkles" className="w-12 h-12 mx-auto mb-2 text-cyan-400" />
                        <h2 className="text-lg font-semibold text-white">Welcome to your AI Financial Assistant!</h2>
                        <p className="text-sm">Ask me anything about budgeting, savings, or general financial topics.</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && (
                             <div className="w-8 h-8 rounded-full bg-cyan-400 flex-shrink-0 flex items-center justify-center text-slate-900 font-bold text-sm shadow-[0_0_10px_rgba(0,245,212,0.7)]">F</div>
                        )}
                        <div className={`px-4 py-2 rounded-2xl max-w-md ${
                            msg.role === 'user'
                                ? 'bg-purple-600 text-white rounded-br-none'
                                : 'bg-slate-700 text-gray-200 rounded-bl-none'
                        }`}>
                           <p className="text-sm whitespace-pre-wrap">{msg.text}{isLoading && msg.role === 'model' && index === messages.length -1 && '...'}</p>
                        </div>
                         {msg.role === 'user' && (
                             <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                                <Icon name="user" className="w-5 h-5 text-gray-300" />
                             </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {error && <div className="p-2 text-center text-sm text-red-400">{error}</div>}
            <div className="p-4 border-t border-slate-700 flex items-center gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a financial question..."
                    className="flex-1 bg-slate-700/50 border-slate-600 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="p-3 bg-cyan-400 text-slate-900 rounded-lg disabled:bg-cyan-400/50 disabled:cursor-not-allowed hover:bg-cyan-300 transition-colors"
                >
                    <Icon name="send" className="w-5 h-5" />
                </button>
            </div>
        </Card>
    </div>
  );
};

export default FinancialAssistant;