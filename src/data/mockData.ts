import React from 'react';

export type Transaction = {
  id: string;
  bank_name: string;
  branch_name?: string;
  account_type: string;
  account_number?: string;
  currency: string;
  transaction_date: string;
  posting_date?: string;
  statement_date?: string;
  timezone?: string;
  direction?: 'DEBIT' | 'CREDIT';
  amount: number;
  balance_after?: number;
  exchange_rate?: number;
  amount_local?: number;
  transaction_type: string;
  bank_transaction_code?: string;
  transfer_type: string;
  clearing_code?: string;
  counterparty_name: string;
  counterparty_account?: string;
  counterparty_bank?: string;
  customer_reference?: string;
  bank_reference?: string;
  edi_info?: string;
  transaction_description: string;
  source_file?: string;
  source_row?: number;
  created_at: string;
  [key: string]: any; // Allow flexibility
};

export const ALL_COLUMNS = [
  { id: 'bank_name', label: 'Bank Name' },
  { id: 'branch_name', label: 'Branch Name' },
  { id: 'account_type', label: 'Account Type' },
  { id: 'account_number', label: 'Account Number' },
  { id: 'currency', label: 'Currency' },
  { id: 'transaction_date', label: 'Transaction Date' },
  { id: 'posting_date', label: 'Posting Date' },
  { id: 'statement_date', label: 'Statement Date' },
  { id: 'timezone', label: 'Timezone' },
  { id: 'direction', label: 'Direction' },
  { id: 'amount', label: 'Amount' },
  { id: 'balance_after', label: 'Balance After' },
  { id: 'exchange_rate', label: 'Exchange Rate' },
  { id: 'amount_local', label: 'Amount Local' },
  { id: 'transaction_type', label: 'Transaction Type' },
  { id: 'bank_transaction_code', label: 'Bank Transaction Code' },
  { id: 'transfer_type', label: 'Transfer Type' },
  { id: 'clearing_code', label: 'Clearing Code' },
  { id: 'counterparty_name', label: 'Counterparty Name' },
  { id: 'counterparty_account', label: 'Counterparty Account' },
  { id: 'counterparty_bank', label: 'Counterparty Bank' },
  { id: 'customer_reference', label: 'Customer Reference' },
  { id: 'bank_reference', label: 'Bank Reference' },
  { id: 'edi_info', label: 'EDI Info' },
  { id: 'transaction_description', label: 'Description' },
  { id: 'source_file', label: 'Source File' },
  { id: 'source_row', label: 'Source Row' },
  { id: 'created_at', label: 'Created At' },
];

export const DEFAULT_VISIBLE_COLUMNS = [
  'bank_name',
  'account_type',
  'currency',
  'transaction_date',
  'amount',
  'transaction_type',
  'transfer_type',
  'counterparty_name',
  'transaction_description',
  'created_at',
];

export const MOCK_DATA: Transaction[] = [
  {
    id: '1',
    bank_name: 'JP Morgan',
    account_type: 'Checking',
    currency: 'USD',
    transaction_date: '2024-01-15',
    amount: 5000.00,
    transaction_type: 'Wire',
    transfer_type: 'International',
    counterparty_name: 'Tech Corp LLC',
    transaction_description: 'Service Payment',
    created_at: '2024-01-15T10:00:00Z',
    branch_name: 'New York Main',
    direction: 'CREDIT',
  },
  {
    id: '2',
    bank_name: 'Citi Bank',
    account_type: 'Savings',
    currency: 'SGD',
    transaction_date: '2024-01-14',
    amount: -1200.50,
    transaction_type: 'ACH',
    transfer_type: 'Local',
    counterparty_name: 'Office Supplies Inc',
    transaction_description: 'Office Equipment',
    created_at: '2024-01-14T14:30:00Z',
    branch_name: 'Singapore CBD',
    direction: 'DEBIT',
  },
  {
    id: '3',
    bank_name: 'DBS',
    account_type: 'Corporate',
    currency: 'USD',
    transaction_date: '2024-01-16',
    amount: 15000.00,
    transaction_type: 'Wire',
    transfer_type: 'Internal',
    counterparty_name: 'DBS Internal',
    transaction_description: 'Fund Transfer',
    created_at: '2024-01-16T09:15:00Z',
    branch_name: 'Marina Bay',
    direction: 'CREDIT',
  },
   {
    id: '4',
    bank_name: 'HSBC',
    account_type: 'Multi-Currency',
    currency: 'GBP',
    transaction_date: '2024-01-10',
    amount: -500.00,
    transaction_type: 'Fee',
    transfer_type: 'Bank Charge',
    counterparty_name: 'HSBC Fees',
    transaction_description: 'Monthly Maintenance',
    created_at: '2024-01-10T00:00:00Z',
    direction: 'DEBIT',
  },
];

