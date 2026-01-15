import { useState } from 'react';
import { Upload } from 'lucide-react';
import { UploadModal } from './UploadModal';
import { BankDetails } from './BankDetails';
import { JournalEntries } from './JournalEntries';
import { BalanceSheet } from './Reports/BalanceSheet';
import { ProfitLoss } from './Reports/ProfitLoss';

type Page = 'bank-details' | 'je' | 'reports-bs' | 'reports-pl';

interface MainContentProps {
  activePage: Page;
}

export function MainContent({ activePage }: MainContentProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Router Logic
  if (activePage === 'je') {
    return <JournalEntries />;
  }
  
  if (activePage === 'reports-bs') {
    return <BalanceSheet />;
  }

  if (activePage === 'reports-pl') {
    return <ProfitLoss />;
  }

  // Default is Bank Details page
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50">
      {/* 上传弹窗组件 */}
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />

      {/* 顶部头部区域 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Bank Details</h1>
          
          {/* 表格上传按钮 */}
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
          >
            <Upload size={16} />
            Upload CSV
          </button>
      </header>

      {/* 主要内容区域 - 银行明细组件 */}
      <main className="flex-1 overflow-hidden">
        <BankDetails />
      </main>
    </div>
  );
}
