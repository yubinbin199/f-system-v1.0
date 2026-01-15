import React, { useState, useEffect } from 'react';
import { X, Search, Check } from 'lucide-react';
import { ALL_COLUMNS } from '../data/mockData';

interface ColumnSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColumnIds: string[];
  onSave: (newSelectedIds: string[]) => void;
}

export function ColumnSelectorModal({ isOpen, onClose, selectedColumnIds, onSave }: ColumnSelectorModalProps) {
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Reset temp state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelected([...selectedColumnIds]);
      setSearchTerm('');
    }
  }, [isOpen, selectedColumnIds]);

  if (!isOpen) return null;

  const handleToggleColumn = (id: string) => {
    if (tempSelected.includes(id)) {
      setTempSelected(tempSelected.filter(colId => colId !== id));
    } else {
      setTempSelected([...tempSelected, id]);
    }
  };

  const handleRemoveColumn = (id: string) => {
    setTempSelected(tempSelected.filter(colId => colId !== id));
  };

  const filteredColumns = ALL_COLUMNS.filter(col => 
    col.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    col.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-[900px] h-[600px] flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">选择列</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left: Available Columns */}
          <div className="w-1/2 border-r border-gray-100 flex flex-col p-4 bg-gray-50/50">
            <div className="mb-2 text-sm text-gray-500 font-medium">选择您想要在表中显示的列。</div>
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索列" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 pr-2">
              {filteredColumns.map(col => {
                const isSelected = tempSelected.includes(col.id);
                return (
                  <div 
                    key={col.id} 
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                    onClick={() => handleToggleColumn(col.id)}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-sm font-medium">{col.label}</span>
                    <span className="text-xs text-gray-400 ml-auto font-mono">{col.id}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Columns */}
          <div className="w-1/2 flex flex-col p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">已选 选择列 ({tempSelected.length})</span>
              <button 
                onClick={() => setTempSelected([])}
                className="text-xs text-red-500 hover:text-red-600"
              >
                清空
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
               {/* Since order matters in the requirement but the input is just toggling, 
                   I'll display them in the order they were selected or default order.
                   For now, let's just map the tempSelected ids to labels. 
               */}
               {tempSelected.map(id => {
                 const col = ALL_COLUMNS.find(c => c.id === id);
                 if (!col) return null;
                 return (
                   <div key={id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white shadow-sm group hover:border-blue-300 transition-colors">
                      <span className="text-sm font-medium text-gray-700">{col.label}</span>
                      <button 
                        onClick={() => handleRemoveColumn(id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                   </div>
                 );
               })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={() => {
              onSave(tempSelected);
              onClose();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            保存
          </button>
        </div>

      </div>
    </div>
  );
}

