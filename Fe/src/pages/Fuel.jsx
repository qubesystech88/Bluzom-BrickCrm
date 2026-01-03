import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Fuel as FuelIcon, Plus } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register components for Bar chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Fuel = () => {
    const [activeTab, setActiveTab] = useState('weekly');
    const [showForm, setShowForm] = useState(false);

    // Mock chart data
    const chartData = {
        labels: ['Vehicle A', 'Vehicle B', 'Truck 1', 'Truck 2', 'GenSet'],
        datasets: [{
            label: 'Fuel Cost (INR)',
            data: [5000, 3200, 8000, 7500, 2000],
            backgroundColor: '#f59e0b',
            borderRadius: 4,
        }]
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Fuel & Expenses</h2>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                    <Plus className="w-4 h-4 mr-2" /> Add Entry
                </button>
            </div>

            {/* Add Fuel Form */}
            {showForm && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">New Fuel Entry</h3>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white">
                            <option>Select Vehicle</option>
                            <option>KA-01-HH-1234</option>
                        </select>
                        <input type="number" placeholder="Liters filled" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                        <input type="number" placeholder="Cost (INR)" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                        <select className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white">
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>Engine Oil</option>
                        </select>
                        <input type="date" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                        <button type="submit" className="md:col-span-1 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Save Record</button>
                    </form>
                </div>
            )}

            {/* Stats with Tabs */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Consumption Overview</h3>
                    <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                        {['weekly', 'monthly', 'quarterly'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-80">
                    <Bar
                        data={chartData}
                        options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: '#33415520' } } } }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Fuel;
