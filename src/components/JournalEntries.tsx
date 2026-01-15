import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Search, Folder } from 'lucide-react';

type ViewMode = 'day' | 'month' | 'year';

interface JournalEntryLine {
  id: string;
  transaction_date: string;
  transaction_type: string;
  je_number: string;
  name: string;
  description: string;
  distribution_account_number: string;
  account_full_name: string;
  debit: number | null;
  credit: number | null;
}

const MOCK_DATA: JournalEntryLine[] = [
  { id: '1', transaction_date: '2025-11-06', transaction_type: 'Journal Entry', je_number: '327', name: 'JKO/Oct', description: '', distribution_account_number: '', account_full_name: 'Accounts Receivable UKD', debit: null, credit: 22006.32 },
  { id: '2', transaction_date: '2025-11-06', transaction_type: 'Journal Entry', je_number: '327', name: 'JKO/Oct', description: '', distribution_account_number: '', account_full_name: 'Citi Bank (USD)', debit: 22006.32, credit: null },
  { id: '3', transaction_date: '2025-11-06', transaction_type: 'Journal Entry', je_number: '327', name: 'JKO/Oct', description: '', distribution_account_number: '', account_full_name: 'Banking fee', debit: 60.00, credit: null },
  { id: '4', transaction_date: '2025-11-13', transaction_type: 'Journal Entry', je_number: '340', name: 'QB fee', description: '', distribution_account_number: '', account_full_name: 'Payment fee', debit: 330.00, credit: null },
  { id: '5', transaction_date: '2025-11-13', transaction_type: 'Journal Entry', je_number: '340', name: '', description: '', distribution_account_number: '', account_full_name: 'Accounts receivable/CTWJP', debit: null, credit: 330.00 },
  { id: '6', transaction_date: '2025-11-14', transaction_type: 'Journal Entry', je_number: '338', name: '', description: '', distribution_account_number: '', account_full_name: 'Citi Bank (USD)', debit: 1930.52, credit: null },
  { id: '7', transaction_date: '2025-11-14', transaction_type: 'Journal Entry', je_number: '338', name: '', description: '', distribution_account_number: '', account_full_name: 'Banking fee', debit: 55.00, credit: null },
  { id: '8', transaction_date: '2025-11-14', transaction_type: 'Journal Entry', je_number: '338', name: '', description: '', distribution_account_number: '', account_full_name: 'Accounts receivable/CTWJP', debit: null, credit: 1985.52 },
  { id: '9', transaction_date: '2025-11-21', transaction_type: 'Journal Entry', je_number: '328', name: 'BILLING INVOICE PAID', description: 'BILLING INVOICE PAID', distribution_account_number: '', account_full_name: 'Banking fee', debit: 350.00, credit: null },
  { id: '10', transaction_date: '2025-11-21', transaction_type: 'Journal Entry', je_number: '328', name: 'BILLING INVOICE PAID', description: 'BILLING INVOICE PAID', distribution_account_number: '', account_full_name: 'Citi Bank (USD)', debit: null, credit: 350.00 },
  { id: '11', transaction_date: '2025-11-26', transaction_type: 'Journal Entry', je_number: '326', name: '[Doraemon] System Development', description: '', distribution_account_number: '', account_full_name: 'Accounts receivable/CTWJP', debit: 61072.91, credit: null },
  { id: '12', transaction_date: '2025-11-26', transaction_type: 'Journal Entry', je_number: '326', name: 'CTW SH', description: '', distribution_account_number: '', account_full_name: 'Prepaid Expenses', debit: 499570.13, credit: null },
  { id: '13', transaction_date: '2025-11-26', transaction_type: 'Journal Entry', je_number: '326', name: '', description: '', distribution_account_number: '', account_full_name: 'EastWest Bank (USD)', debit: null, credit: 560643.04 },
];

export function JournalEntries() {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // Nov 2025
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') newDate.setDate(newDate.getDate() - 1);
    if (viewMode === 'month') newDate.setMonth(newDate.getMonth() - 1);
    if (viewMode === 'year') newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') newDate.setDate(newDate.getDate() + 1);
    if (viewMode === 'month') newDate.setMonth(newDate.getMonth() + 1);
    if (viewMode === 'year') newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const getDateLabel = () => {
    if (viewMode === 'day') return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (viewMode === 'month') return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (viewMode === 'year') return currentDate.getFullYear().toString();
    return '';
  };

  const filteredData = MOCK_DATA.filter(je => {
    const jeDate = new Date(je.transaction_date);
    let matchDate = false;

    if (viewMode === 'day') {
      matchDate = jeDate.toDateString() === currentDate.toDateString();
    } else if (viewMode === 'month') {
      matchDate = jeDate.getMonth() === currentDate.getMonth() && jeDate.getFullYear() === currentDate.getFullYear();
    } else if (viewMode === 'year') {
      matchDate = jeDate.getFullYear() === currentDate.getFullYear();
    }

    const matchSearch = (je.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                        (je.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        je.je_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        je.account_full_name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchDate && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {(['day', 'month', 'year'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    viewMode === mode 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
              <button onClick={handlePrev} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <ChevronLeft size={18} />
              </button>
              <div className="px-4 font-medium text-gray-700 min-w-[120px] text-center flex items-center justify-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                {getDateLabel()}
              </div>
              <button onClick={handleNext} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-64"
            />
          </div>
        </div>
      </div>

      {/* Content Area - Table */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="min-w-max"> 
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0">Transaction date</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0">Transaction type</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0">Number</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0">Name</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0">Memo/Description</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0">Distribution account number</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0">Account full name</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0 text-right">Debit</th>
                <th className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100 last:border-r-0 text-right">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0">{row.transaction_date.replace(/-/g, '/')}</td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0">{row.transaction_type}</td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0">{row.je_number}</td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0 max-w-[200px] truncate" title={row.name}>{row.name}</td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0 max-w-[250px] truncate" title={row.description}>{row.description}</td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0">{row.distribution_account_number}</td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0">{row.account_full_name}</td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0 text-right">
                      {row.debit ? row.debit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                    </td>
                    <td className="px-4 py-2 border-r border-gray-50 last:border-r-0 text-right">
                      {row.credit ? row.credit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                       <Folder size={48} className="mb-4 opacity-20" />
                       <p>No Journal Entries found for this period.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
