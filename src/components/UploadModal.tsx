import { useState, useRef } from 'react';
import { Upload, X, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 银行列表选项
// Bank list options
const banks = [
  '三井住友（法人）',
  '三井住友銀行　外貨口座',
  '三菱ＵＦＪ',
  '三井住友　担保定期預金',
  '三井住友CreditCard',
  'EastWest Bank（checking）',
  'Citi Bank（USD）',
  'Citi Bank（SGD）',
];

// 上传弹窗组件
// Upload Modal Component
export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [selectedBank, setSelectedBank] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 如果没有打开，返回 null (Render nothing if not open)
  if (!isOpen) return null;

  // 处理文件选择 (Handle file selection)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 模拟上传处理 (Simulate upload process)
  const handleUpload = () => {
    if (!selectedBank) {
      alert('请先选择银行 (Please select a bank first)');
      return;
    }
    if (!file) {
      alert('请选择要上传的CSV文件 (Please select a CSV file)');
      return;
    }
    
    // 模拟上传 (Simulation of upload)
    alert(`Uploading ${file.name} for ${selectedBank}... Success!`);
    onClose();
    setFile(null);
    setSelectedBank('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        
        {/* 关闭按钮 (Close Button) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* 标题 (Title) */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Upload className="text-blue-600" />
          Upload CSV
        </h2>

        <div className="space-y-4">
          
          {/* 银行选择下拉框 (Bank Selection Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
            <select 
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="" disabled>-- Select --</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          {/* 文件上传区域 (File Upload Area) */}
          <div 
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept=".csv"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            {file ? (
              <>
                <FileSpreadsheet size={40} className="text-green-600 mb-2" />
                <span className="font-medium text-green-800">{file.name}</span>
                <span className="text-xs text-green-600 mt-1">Click to change file</span>
              </>
            ) : (
              <>
                <Upload size={40} className="text-gray-400 mb-2" />
                <span className="font-medium text-gray-600">Click to upload CSV</span>
                <span className="text-xs text-gray-400 mt-1">Supports .csv</span>
              </>
            )}
          </div>

          {/* 确认上传按钮 (Confirm Upload Button) */}
          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!selectedBank || !file}
          >
            {file ? <CheckCircle2 size={18} /> : <Upload size={18} />}
            Confirm Upload
          </button>

        </div>
      </div>
    </div>
  );
}
