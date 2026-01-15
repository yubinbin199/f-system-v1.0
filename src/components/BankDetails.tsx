import React, { useState, useMemo } from 'react';
import { Search, Filter, Settings, X, ChevronDown, Check, ArrowUpDown } from 'lucide-react';

// --- 类型定义 Types ---

interface Transaction {
  id: string;
  [key: string]: any; // 允许动态字段
}

interface ColumnDef {
  key: string;
  label: string;
  group: 'Default' | 'Basic' | 'Other';
}

// --- 配置数据 Configuration ---

// 所有可用列定义
// All available column definitions
const ALL_COLUMNS: ColumnDef[] = [
  // 默认展示的列
  { key: 'num', label: 'Num.', group: 'Default' }, // 新增 Num. 列
  { key: 'bank_name', label: 'Bank Name', group: 'Default' },
  { key: 'currency', label: 'Currency', group: 'Default' },
  { key: 'transaction_date', label: 'Transaction Date', group: 'Default' },
  { key: 'amount', label: 'Amount', group: 'Default' },
  { key: 'transfer_type', label: 'Transfer Type', group: 'Default' },
  { key: 'counterparty_name', label: 'Counterparty Name', group: 'Default' },
  { key: 'transaction_description', label: 'Description', group: 'Default' },
  { key: 'tag', label: 'Tag', group: 'Default' },
  { key: 'local_account', label: 'Local Account', group: 'Default' },
  { key: 'group_account', label: 'Group Account', group: 'Default' },
  { key: 'created_at', label: 'Created At', group: 'Default' },
  
  // 其他可选列
  { key: 'account_type', label: 'Account Type', group: 'Basic' },
  { key: 'transaction_type', label: 'Transaction Type', group: 'Basic' },
  { key: 'branch_name', label: 'Branch Name', group: 'Basic' },
  { key: 'account_number', label: 'Account Number', group: 'Basic' },
  { key: 'posting_date', label: 'Posting Date', group: 'Basic' },
  { key: 'statement_date', label: 'Statement Date', group: 'Basic' },
  { key: 'direction', label: 'Direction', group: 'Basic' },
  { key: 'balance', label: 'Balance', group: 'Basic' },
  { key: 'exchange_rate', label: 'Exchange Rate', group: 'Other' },
  { key: 'bank_transaction_code', label: 'Bank Tx Code', group: 'Other' },
  { key: 'clearing_system', label: 'Clearing System', group: 'Other' },
  { key: 'customer_reference', label: 'Customer Ref', group: 'Other' },
  { key: 'bank_reference', label: 'Bank Ref', group: 'Other' },
  { key: 'source_file', label: 'Source File', group: 'Other' },
];

const DEFAULT_VISIBLE_COLUMNS = [
  'num', 'bank_name', 'currency', 'transaction_date', 'amount',
  'transfer_type', 'counterparty_name', 'transaction_description', 
  'tag', 'local_account', 'group_account', 'created_at'
];

// 模拟数据
// Mock Data
const BANKS = [
  '三井住友（法人）',
  '三井住友銀行　外貨口座',
  '三菱ＵＦＪ',
  '三井住友　担保定期預金',
  '三井住友CreditCard',
  'EastWest Bank（checking）',
  'Citi Bank（USD）',
  'Citi Bank（SGD）',
];

const MOCK_DATA: Transaction[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `tx-${i + 1}`,
  num: (20240001 + i).toString(), // Multi-digit ID
  bank_name: BANKS[i % BANKS.length],
  account_type: 'Ordinary',
  currency: i % 4 === 0 ? 'USD' : 'JPY',
  transaction_date: `2024-01-${String(i + 1).padStart(2, '0')}`,
  amount: (Math.random() * 100000 * (Math.random() > 0.5 ? 1 : -1)).toFixed(0),
  transaction_type: 'Payment',
  transfer_type: 'Wire',
  counterparty_name: `Company ${String.fromCharCode(65 + i)}`,
  transaction_description: `Invoice #${1000 + i} payment`,
  created_at: '2024-01-01 10:00:00',
  branch_name: 'Tokyo Head Office',
  account_number: '1234567890',
  posting_date: `2024-01-${String(i + 1).padStart(2, '0')}`,
  tag: '', // New tag field
  local_account: i < 10 ? (i % 2 === 0 ? '前払費用' : '買掛金') : '', // First 10 have data, rest empty
  group_account: i < 10 ? (i % 2 === 0 ? 'Prepaid Expenses' : 'Accounts Payable') : '', // First 10 have data, rest empty
  status: 'Completed'
}));

// --- 子组件 Components ---

// 1. 列编辑器弹窗
// Column Editor Modal
function ColumnEditor({ 
  isOpen, 
  onClose, 
  visibleColumns, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  visibleColumns: string[]; 
  onSave: (cols: string[]) => void; 
}) {
  const [selected, setSelected] = useState<string[]>(visibleColumns);
  const [searchTerm, setSearchTerm] = useState('');

  // 重置选中状态当弹窗打开时
  // Reset selected state when modal opens
  React.useEffect(() => {
    if (isOpen) setSelected(visibleColumns);
  }, [isOpen, visibleColumns]);

  if (!isOpen) return null;

  const toggleColumn = (key: string) => {
    if (selected.includes(key)) {
      setSelected(selected.filter(k => k !== key));
    } else {
      setSelected([...selected, key]);
    }
  };

  const filteredColumns = ALL_COLUMNS.filter(col => 
    col.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedColumns = {
    Default: filteredColumns.filter(c => c.group === 'Default'),
    Basic: filteredColumns.filter(c => c.group === 'Basic'),
    Other: filteredColumns.filter(c => c.group === 'Other'),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-[900px] h-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Select Columns</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Panel: Selection Tree */}
          <div className="w-1/2 p-4 border-r border-gray-100 flex flex-col bg-gray-50/50">
            <div className="mb-4 text-sm text-gray-500">Select the columns you want to display in the table.</div>
            
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search columns..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {Object.entries(groupedColumns).map(([group, cols]) => (
                cols.length > 0 && (
                  <div key={group}>
                    <div className="flex items-center gap-2 mb-2 font-medium text-gray-700 text-sm">
                      <ChevronDown size={14} />
                      {group}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pl-2">
                      {cols.map(col => (
                        <div 
                          key={col.key} 
                          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                          onClick={() => toggleColumn(col.key)}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            selected.includes(col.key) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'
                          }`}>
                            {selected.includes(col.key) && <Check size={10} className="text-white" />}
                          </div>
                          <span className="text-sm text-gray-600 truncate" title={col.label}>{col.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Right Panel: Selected List */}
          <div className="w-1/2 p-4 flex flex-col bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-700">Selected</span>
              <span className="text-sm text-gray-500">{selected.length} Columns</span>
            </div>

            <div className="flex-1 overflow-y-auto content-start flex flex-wrap gap-2">
              {selected.map(key => {
                const col = ALL_COLUMNS.find(c => c.key === key);
                if (!col) return null;
                return (
                  <div key={key} className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700 border border-gray-200 group hover:border-red-200 hover:bg-red-50 transition-colors">
                    <span>{col.label}</span>
                    <button 
                      onClick={() => toggleColumn(key)}
                      className="ml-1 text-gray-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
              {selected.length === 0 && (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic">
                  No columns selected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => { onSave(selected); onClose(); }}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 主组件 Main Component ---

export function BankDetails() {
  const [data, setData] = useState<Transaction[]>(MOCK_DATA); // 使用 state 管理数据以便编辑
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);
  const [isColumnEditorOpen, setIsColumnEditorOpen] = useState(false);
  
  // Filters State
  const [filters, setFilters] = useState({
    bank_name: '',
    currency: '',
    startDate: '',
    endDate: '',
    amountMin: '',
    amountMax: '',
    transaction_description: '',
    counterparty_name: ''
  });

  // Handle Tag Change
  const handleTagChange = (id: string, newTag: string) => {
    setData(prevData => prevData.map(item => 
      item.id === id ? { ...item, tag: newTag } : item
    ));
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Bank Name
      if (filters.bank_name && !item.bank_name?.toLowerCase().includes(filters.bank_name.toLowerCase())) return false;
      // Currency
      if (filters.currency && item.currency !== filters.currency) return false;
      // Date Range
      if (filters.startDate && item.transaction_date < filters.startDate) return false;
      if (filters.endDate && item.transaction_date > filters.endDate) return false;
      // Amount (Basic string check for demo, ideally number comparison)
      if (filters.amountMin && Number(item.amount) < Number(filters.amountMin)) return false;
      if (filters.amountMax && Number(item.amount) > Number(filters.amountMax)) return false;
      // Description
      if (filters.transaction_description && !item.transaction_description?.toLowerCase().includes(filters.transaction_description.toLowerCase())) return false;
      // Counterparty
      if (filters.counterparty_name && !item.counterparty_name?.toLowerCase().includes(filters.counterparty_name.toLowerCase())) return false;
      
      return true;
    });
  }, [filters, data]); // Add data to dependency array

  const visibleColumns = ALL_COLUMNS.filter(c => visibleColumnKeys.includes(c.key));

  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* 1. 顶部过滤器区域 (Filters) */}
      <div className="p-4 border-b border-gray-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Filter size={20} className="text-blue-600" />
            Filter & Search
          </h2>
          <button 
            onClick={() => setIsColumnEditorOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
          >
            <Settings size={16} />
            Edit Columns
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Bank Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Bank Name</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              value={filters.bank_name}
              onChange={e => setFilters({...filters, bank_name: e.target.value})}
            >
              <option value="">All Banks</option>
              {BANKS.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Currency</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              value={filters.currency}
              onChange={e => setFilters({...filters, currency: e.target.value})}
            >
              <option value="">All</option>
              <option value="USD">USD</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Transaction Date</label>
            <div className="flex gap-2">
              <input 
                type="date" 
                className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                value={filters.startDate}
                onChange={e => setFilters({...filters, startDate: e.target.value})}
              />
              <span className="text-gray-400 self-center">-</span>
              <input 
                type="date" 
                className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                value={filters.endDate}
                onChange={e => setFilters({...filters, endDate: e.target.value})}
              />
            </div>
          </div>

          {/* Amount Range */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Amount</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                value={filters.amountMin}
                onChange={e => setFilters({...filters, amountMin: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                value={filters.amountMax}
                onChange={e => setFilters({...filters, amountMax: e.target.value})}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
            <input 
              type="text" 
              placeholder="Search description..." 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              value={filters.transaction_description}
              onChange={e => setFilters({...filters, transaction_description: e.target.value})}
            />
          </div>

          {/* Counterparty */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Counterparty</label>
            <input 
              type="text" 
              placeholder="Search name..." 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              value={filters.counterparty_name}
              onChange={e => setFilters({...filters, counterparty_name: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* 2. 数据表格 (Data Table) */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  {visibleColumns.map(col => (
                    <th key={col.key} className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider group cursor-pointer hover:bg-gray-200 transition-colors">
                      <div className="flex items-center gap-1">
                        {col.label}
                        <ArrowUpDown size={12} className="text-gray-400 opacity-0 group-hover:opacity-100" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                      {visibleColumns.map(col => (
                        <td key={col.key} className="px-6 py-4 text-sm text-gray-700 border-r border-gray-50 last:border-r-0">
                          {col.key === 'amount' ? (
                            <span className={Number(row[col.key]) < 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                              {Number(row[col.key]).toLocaleString()}
                            </span>
                          ) : col.key === 'tag' ? (
                            <input
                              type="text"
                              value={row.tag || ''}
                              onChange={(e) => handleTagChange(row.id, e.target.value)}
                              placeholder="Add tag..."
                              className="w-full min-w-[240px] px-2 py-1 border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-white hover:border-gray-300"
                            />
                          ) : col.key === 'local_account' || col.key === 'group_account' ? (
                            <span className="text-gray-400 select-none cursor-not-allowed">
                              {row[col.key] || '-'}
                            </span>
                          ) : (
                            row[col.key] || <span className="text-gray-300 italic text-xs">null</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={visibleColumns.length} className="px-6 py-12 text-center text-gray-400">
                      No transactions found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing {filteredData.length} records</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50">Prev</button>
              <button className="px-2 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* 弹窗 (Modal) */}
      <ColumnEditor 
        isOpen={isColumnEditorOpen} 
        onClose={() => setIsColumnEditorOpen(false)} 
        visibleColumns={visibleColumnKeys}
        onSave={setVisibleColumnKeys}
      />

    </div>
  );
}
