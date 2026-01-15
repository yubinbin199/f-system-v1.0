import { useState } from 'react';
import { Globe, DollarSign, LogOut, ChevronRight, Check } from 'lucide-react';

// 类型定义 (Type definitions)
type Language = 'ZH' | 'ZH-TW' | 'EN' | 'JP';
type Currency = 'CNY' | 'TWD' | 'USD' | 'JPY';

// 语言选项配置 (Language Options)
const languages: { code: Language; label: string }[] = [
  { code: 'ZH', label: '简体中文' },
  { code: 'ZH-TW', label: '繁體中文' },
  { code: 'EN', label: 'English' },
  { code: 'JP', label: '日本語' },
];

// 币种选项配置 (Currency Options)
const currencies: { code: Currency; label: string }[] = [
  { code: 'CNY', label: '人民币 (CNY)' },
  { code: 'TWD', label: '新台币 (TWD)' },
  { code: 'USD', label: '美元 (USD)' },
  { code: 'JPY', label: '日币 (JPY)' },
];

// 用户资料与菜单组件
// User Profile & Menu Component
export function UserProfile() {
  // 状态管理 (State Management)
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'main' | 'language' | 'currency'>('main');
  const [language, setLanguage] = useState<Language>('ZH');
  const [currency, setCurrency] = useState<Currency>('CNY');

  // 切换菜单显示 (Toggle Menu Visibility)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveMenu('main');
  };

  // 退出登录处理 (Handle Logout)
  const handleLogout = () => {
    alert('Logged out');
    setIsOpen(false);
  };

  return (
    <div className="relative mt-auto p-4 border-t border-gray-700">
      {/* 弹出菜单 (Popover Menu) */}
      {isOpen && (
        <div className="absolute bottom-full left-4 mb-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden text-gray-800 z-50">
          
          {/* 主菜单 (Main Menu) */}
          {activeMenu === 'main' && (
            <div className="py-2">
              <button 
                onClick={() => setActiveMenu('currency')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1"><DollarSign size={20} /></div>
                  <span className="font-medium text-base">元/月 (币种)</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button 
                onClick={() => setActiveMenu('language')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1"><Globe size={20} /></div>
                  <span className="font-medium text-base">语言</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <div className="h-px bg-gray-100 my-1 mx-4"></div>

              <button 
                onClick={handleLogout}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-red-600"
              >
                <div className="p-1"><LogOut size={20} /></div>
                <span className="font-medium text-base">登出</span>
              </button>
            </div>
          )}

          {/* 语言选择菜单 (Language Selection Menu) */}
          {activeMenu === 'language' && (
            <div>
              <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => setActiveMenu('main')}>
                <div className="rotate-180"><ChevronRight size={18} /></div>
                <span className="font-bold">选择语言</span>
              </div>
              <div className="py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setActiveMenu('main');
                    }}
                    className="w-full px-6 py-2 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span>{lang.label}</span>
                    {language === lang.code && <Check size={16} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 币种选择菜单 (Currency Selection Menu) */}
          {activeMenu === 'currency' && (
            <div>
              <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => setActiveMenu('main')}>
                <div className="rotate-180"><ChevronRight size={18} /></div>
                <span className="font-bold">选择币种</span>
              </div>
              <div className="py-2">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                      setActiveMenu('main');
                    }}
                    className="w-full px-6 py-2 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span>{curr.label}</span>
                    {currency === curr.code && <Check size={16} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* 用户信息按钮 (User Info Button) */}
      <button 
        onClick={toggleMenu}
        className="flex items-center gap-3 w-full hover:bg-white/10 p-2 rounded-lg transition-colors text-white"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
             {/* 头像占位符 (Avatar Placeholder) */}
             <img src="https://ui-avatars.com/api/?name=Yu+Bin&background=random" alt="User" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center justify-between w-full overflow-hidden">
          <span className="text-sm font-medium truncate">yu.bin@ctw.inc</span>
          <ChevronRight size={16} className="text-gray-400 rotate-90 ml-2 flex-shrink-0" /> 
        </div>
      </button>
    </div>
  );
}
