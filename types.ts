export enum NavView {
  DASHBOARD = 'DASHBOARD',
  SEND_MONEY = 'SEND_MONEY',
  LINKED_ACCOUNTS = 'LINKED_ACCOUNTS',
  INTERNATIONAL = 'INTERNATIONAL',
  PAY_BILLS = 'PAY_BILLS',
  ASSISTANT = 'ASSISTANT',
  SECURITY_CENTER = 'SECURITY_CENTER',
  GOVERNMENT_SERVICES = 'GOVERNMENT_SERVICES',
}

export interface Transaction {
  id: string;
  type: 'Credit' | 'Debit';
  description: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface SpendingCategory {
    name: string;
    value: number;
    // FIX: Added index signature to be compatible with the Recharts library, which expects data objects to have a string index signature.
    [key: string]: string | number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FlaggedTransaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    riskScore: number;
    reason: string;
    status: 'Pending Review' | 'Approved' | 'Blocked';
}

export interface LoginActivity {
    id: string;
    device: string;
    location: string;
    ipAddress: string;
    timestamp: string;
    isSuspicious: boolean;
}

export interface Vulnerability {
    id: string;
    description: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Resolved';
}

export interface ComplianceStatus {
    regulation: 'GDPR' | 'PCI DSS' | 'AML';
    isCompliant: boolean;
}

export interface LinkedAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  logo: React.ReactElement;
}