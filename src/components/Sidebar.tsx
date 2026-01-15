import { Landmark, BookOpen, PieChart, ChevronDown, ChevronRight } from 'lucide-react';
import { UserProfile } from './UserProfile';
import { useState } from 'react';

type Page = 'bank-details' | 'je' | 'reports-bs' | 'reports-pl';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

// 侧边栏组件
// Sidebar Component
export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [isReportsOpen, setIsReportsOpen] = useState(true);

  return (
    <div className="w-64 bg-[#0B1120] text-white flex flex-col h-full flex-shrink-0">
      {/* 顶部 Logo 区域 (Top Logo Area) */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
          F
        </div>
        <span className="font-bold text-lg tracking-wide">F SYSTEM</span>
      </div>

      {/* 导航菜单 (Navigation Menu) */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {/* 银行明细 (Bank Details) */}
        <div 
          onClick={() => onNavigate('bank-details')}
          className={`px-4 py-3 rounded-lg flex items-center gap-3 font-medium cursor-pointer transition-colors relative ${
            activePage === 'bank-details' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
            <Landmark size={20} />
            <span>Bank Details</span>
        </div>

        {/* JE Menu Item */}
        <div 
          onClick={() => onNavigate('je')}
          className={`px-4 py-3 rounded-lg flex items-center gap-3 font-medium cursor-pointer transition-colors relative ${
            activePage === 'je' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
            <BookOpen size={20} />
            <span>JE</span>
        </div>

        {/* Reports Menu Group */}
        <div>
          <div 
            onClick={() => setIsReportsOpen(!isReportsOpen)}
            className="px-4 py-3 rounded-lg flex items-center justify-between font-medium cursor-pointer text-gray-400 hover:text-white transition-colors"
          >
             <div className="flex items-center gap-3">
               <PieChart size={20} />
               <span>Reports</span>
             </div>
             {isReportsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>

          {isReportsOpen && (
            <div className="mt-1 space-y-1">
              <div 
                onClick={() => onNavigate('reports-bs')}
                className={`pl-12 pr-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                  activePage === 'reports-bs' ? 'text-white bg-white/10' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Balance Sheet
              </div>
              <div 
                onClick={() => onNavigate('reports-pl')}
                className={`pl-12 pr-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                  activePage === 'reports-pl' ? 'text-white bg-white/10' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Profit and Loss
              </div>
            </div>
          )}
        </div>

      </nav>

      {/* 底部用户信息 (Bottom User Profile) */}
      <UserProfile />
    </div>
  );
}
