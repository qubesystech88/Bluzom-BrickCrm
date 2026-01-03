import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { formatCurrency } from '../utils/helpers';

// Register ALL necessary components for Bar and Pie charts
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const Dashboard = () => {
    const metrics = [
        { label: 'Total Revenue', value: 1250000, color: 'bg-emerald-500' },
        { label: 'Total Employees', value: 24, color: 'bg-blue-500' },
        { label: 'Total Vehicles', value: 12, color: 'bg-orange-500' },
        { label: 'Pending Works', value: 5, color: 'bg-purple-500' },
    ];

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Income',
                data: [450000, 520000, 480000, 600000, 550000, 700000],
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
            },
            {
                label: 'Expense',
                data: [300000, 350000, 320000, 400000, 380000, 450000],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1,
            }
        ],
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg text-sm font-medium border border-yellow-200 dark:border-yellow-700">
                    🚀 High Priority: 3 Vehicles due for Service next week
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                    <div key={metric.label} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{metric.label}</p>
                        <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">
                            {metric.label.includes('Revenue') ? formatCurrency(metric.value) : metric.value}
                        </p>
                        <div className={`h-1.5 w-full mt-4 rounded-full ${metric.color} bg-opacity-10`}>
                            <div className={`h-1.5 w-3/4 rounded-full ${metric.color}`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Financial Statistics</h3>
                    <div className="h-80">
                        <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#33415520' } } } }} />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Task Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                        <Pie data={{
                            labels: ['Completed', 'Pending', 'In Progress'],
                            datasets: [{
                                data: [65, 15, 20],
                                backgroundColor: ['#10b981', '#f59e0b', '#3b82f6'],
                                borderWidth: 0
                            }]
                        }} options={{ plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } } }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
