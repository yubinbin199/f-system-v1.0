import { Share2, Printer } from 'lucide-react';

export function ProfitLoss() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Filters Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex flex-wrap gap-4 items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-gray-600">
           <div className="flex flex-col gap-1">
             <label className="text-xs font-medium">Report period</label>
             <select className="border border-gray-300 rounded px-2 py-1 bg-white">
               <option>This Month-to-date</option>
             </select>
           </div>
           <button className="self-end px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50">Run Report</button>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="p-2 hover:bg-gray-100 rounded text-gray-500"><Share2 size={16} /></button>
           <button className="p-2 hover:bg-gray-100 rounded text-gray-500"><Printer size={16} /></button>
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 overflow-auto p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-200 min-h-[500px] p-8">
           {/* Report Header */}
           <div className="text-center mb-8">
             <h1 className="text-xl font-bold text-gray-900">Profit and Loss</h1>
             <div className="text-gray-600 font-medium mt-1">CTW G 123 SINGAPORE PTE. LTD.</div>
             <div className="text-gray-500 text-sm mt-1">For the Month of January 2026</div>
           </div>

           {/* Placeholder Content */}
           <div className="text-center text-gray-400 py-20 border border-dashed border-gray-200 rounded-lg">
             <p>No data available for this period.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

