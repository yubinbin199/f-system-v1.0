import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AccountRow {
  id: string;
  name: string;
  amount: number | null; // null for section headers
  level: number;
  children?: AccountRow[];
  isTotal?: boolean;
}

const MOCK_BS_DATA: AccountRow[] = [
  {
    id: 'assets',
    name: 'Assets',
    amount: null,
    level: 0,
    children: [
      {
        id: 'current-assets',
        name: 'Current Assets',
        amount: null,
        level: 1,
        children: [
          {
            id: 'ar',
            name: 'Accounts Receivable',
            amount: null,
            level: 2,
            children: [
              { id: 'ar-adyen', name: 'Accounts receivable/Adyen', amount: -2017843, level: 3 },
              { id: 'ar-boa', name: 'Accounts receivable/BoaCayman', amount: -155564, level: 3 },
              { id: 'ar-cayman', name: 'Accounts receivable/Cayman', amount: 3405, level: 3 },
              { id: 'ar-ctwhk', name: 'Accounts receivable/CTWHK', level: 3, amount: 801295 },
              { id: 'ar-total', name: 'Total for Accounts Receivable', amount: 4186744, level: 2, isTotal: true },
            ]
          },
          { id: 'bank-citi-jpy', name: 'Citi Bank (JPY)', amount: 20, level: 2 },
          { id: 'bank-citi-sgd', name: 'Citi Bank (SGD)', amount: 23190, level: 2 },
          { id: 'bank-citi-usd', name: 'Citi Bank (USD)', amount: 405, level: 2 },
          { id: 'bank-eastwest', name: 'EastWest Bank (USD)', amount: 2014741, level: 2 },
          { id: 'prepaid', name: 'Prepaid Expenses', amount: 1141808, level: 2 },
          { id: 'current-assets-total', name: 'Total for Current Assets', amount: 8277346, level: 1, isTotal: true },
        ]
      },
      {
        id: 'long-term',
        name: 'Long-term assets',
        amount: null,
        level: 1,
        children: [
           { id: 'loan-rec', name: 'Long Term Loan Receivable', amount: 200000, level: 2 },
           { id: 'long-term-total', name: 'Total for Long-term assets', amount: 200000, level: 1, isTotal: true },
        ]
      },
      { id: 'assets-total', name: 'Total for Assets', amount: 8477346, level: 0, isTotal: true },
    ]
  },
  {
    id: 'liabilities',
    name: 'Liabilities and Shareholder\'s Equity',
    amount: null,
    level: 0,
    children: [
      {
        id: 'current-liabilities',
        name: 'Current Liabilities',
        amount: null,
        level: 1,
        children: [
          {
             id: 'ap',
             name: 'Accounts Payable',
             amount: null,
             level: 2,
             children: [
                { id: 'ap-mvpi', name: 'Accounts Payable MVPI', amount: 90, level: 3 },
                { id: 'ap-total', name: 'Total for Accounts Payable', amount: 90, level: 2, isTotal: true },
             ]
          },
          { id: 'accrued-ctw', name: 'Accrued expenses/CTW', amount: 182043, level: 2 },
          { id: 'deferred', name: 'Deferred Income', amount: 145000, level: 2 },
          { id: 'current-liab-total', name: 'Total for Current Liabilities', amount: 327043, level: 1, isTotal: true },
        ]
      },
      {
        id: 'non-current',
        name: 'Non-current Liabilities',
        amount: null,
        level: 1,
        children: [
           { id: 'long-term-borrow', name: 'LONG TERM BORROWING', amount: 10497456, level: 2 },
           { id: 'non-current-total', name: 'Total for Non-current Liabilities', amount: 10497456, level: 1, isTotal: true },
        ]
      },
      {
        id: 'equity',
        name: 'Shareholder\'s Equity',
        amount: null,
        level: 1,
        children: [
           { id: 'capital', name: 'Capital', amount: 74313, level: 2 },
           { id: 'retained', name: 'Retained earnings', amount: -1163913, level: 2 },
           { id: 'net-income', name: 'Net Income', amount: -1256553, level: 2 },
           { id: 'equity-total', name: 'Total for Shareholder\'s Equity', amount: -2347153, level: 1, isTotal: true },
        ]
      },
      { id: 'liab-equity-total', name: 'Total for Liabilities and Shareholder\'s Equity', amount: 8477346, level: 0, isTotal: true },
    ]
  }
];

const ReportRow = ({ row }: { row: AccountRow }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = row.children && row.children.length > 0;

  return (
    <>
      <div 
        className={`flex items-center justify-between py-1.5 px-4 hover:bg-gray-50 border-b border-gray-50 text-sm ${
          row.isTotal ? 'font-bold bg-gray-50/50' : ''
        } ${row.level === 0 ? 'font-bold' : ''}`}
        style={{ paddingLeft: `${row.level * 20 + 16}px` }}
      >
        <div className="flex items-center gap-2 flex-1">
          {hasChildren && !row.isTotal && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
          {!hasChildren && <div className="w-4" />} {/* Spacer for alignment */}
          <span className="text-gray-800">{row.name}</span>
        </div>
        
        <div className="text-right w-32 tabular-nums">
          {row.amount !== null ? row.amount.toLocaleString(undefined, { minimumFractionDigits: 0 }) : ''}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {row.children?.map(child => (
            <ReportRow key={child.id} row={child} />
          ))}
        </div>
      )}
    </>
  );
};

export function BalanceSheet() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Filters Header - Simplified */}
      <div className="p-4 border-b border-gray-200 bg-white space-y-4 w-full">
        <div className="flex items-center gap-4 text-gray-600 w-full">
           <div className="flex flex-col gap-1">
             <label className="text-xs font-medium text-gray-500 uppercase">Company</label>
             <select className="border border-gray-300 rounded px-2 py-1 bg-white min-w-[150px]" defaultValue="SG">
               <option value="JP">JP</option>
               <option value="SG">SG</option>
               <option value="Cayman">Cayman</option>
             </select>
           </div>
           <div className="flex flex-col gap-1">
             <label className="text-xs font-medium text-gray-500 uppercase">Report period</label>
             <select className="border border-gray-300 rounded px-2 py-1 bg-white min-w-[150px]">
               <option>This year-to-date</option>
             </select>
           </div>
           <div className="flex flex-col gap-1">
             <label className="text-xs font-medium text-gray-500 uppercase">Time</label>
             <input type="date" value="2026-01-15" className="border border-gray-300 rounded px-2 py-1" readOnly />
           </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 overflow-auto p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-200 min-h-[500px] p-8">
           {/* Report Header */}
           <div className="text-center mb-8">
             <h1 className="text-xl font-bold text-gray-900">Balance Sheet</h1>
             <div className="text-gray-600 font-medium mt-1">CTW G 123 SINGAPORE PTE. LTD.</div>
             <div className="text-gray-500 text-sm mt-1">As of January 15, 2026</div>
           </div>

           {/* Report Table Header */}
           <div className="border-b border-gray-200 flex justify-between px-4 py-2 font-bold text-gray-600 text-xs uppercase tracking-wider mb-2">
             <span>Account</span>
             <span>Total</span>
           </div>

           {/* Report Rows */}
           <div className="border-b border-gray-200 pb-4">
             {MOCK_BS_DATA.map(row => (
               <ReportRow key={row.id} row={row} />
             ))}
           </div>

           <div className="mt-4 text-xs text-center text-gray-400">
             Accrual Basis | Thursday, January 15, 2026 11:12 AM GMT+08:00
           </div>
        </div>
      </div>
    </div>
  );
}

