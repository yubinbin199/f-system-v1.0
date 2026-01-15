import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';

export type Page = 'bank-details' | 'je' | 'reports-bs' | 'reports-pl';

// 主应用组件
// Main App component
function App() {
  const [activePage, setActivePage] = useState<Page>('bank-details');

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* 左侧侧边栏 Sidebar on the left */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      {/* 右侧主内容区域 Main content on the right */}
      <MainContent activePage={activePage} />
    </div>
  );
}

export default App;
