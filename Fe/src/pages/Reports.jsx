import React from 'react';
import { Download } from 'lucide-react';

const Reports = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Reports & Analytics</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-2">Quarterly Summary Report</h3>
                <p className="text-blue-100 mb-8 max-w-xl">
                    Get a detailed overview of your business performance, highlighting revenue, major expenses, and operational efficiency metrics.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center hover:bg-blue-50 transition-colors">
                    <Download className="w-5 h-5 mr-2" /> Download Full Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Monthly Expense Breakdown', 'Vehicle Service History', 'Driver Performance'].map((report) => (
                    <div key={report} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary cursor-pointer transition-colors group">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{report}</h4>
                        <p className="text-sm text-slate-500 mb-4">Generated on 01 Jan 2026</p>
                        <button className="text-sm font-medium text-primary hover:underline">Download PDF</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
