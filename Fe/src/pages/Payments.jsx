import React, { useState, useEffect } from 'react';
import { Download, FileText, Smartphone } from 'lucide-react';
import axios from 'axios';

import { API_URL } from '../config';

// Utility to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/payments`);
            if (res.data.success) {
                setPayments(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching payments:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 mb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Payment Records</h1>
                    <p className="text-slate-500 dark:text-slate-400">Track client payment statuses</p>
                </div>
            </header>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Client Name</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">Loading records...</td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">No payment records found.</td>
                                </tr>
                            ) : (
                                payments.map(payment => (
                                    <tr key={payment._id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 text-slate-900 dark:text-white font-medium">{payment.clientName}</td>
                                        <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">
                                            {new Date(payment.date).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="p-4 text-slate-900 dark:text-white font-bold">{formatCurrency(payment.amount)}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                                                ${payment.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                                                    payment.status === 'Active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                                                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full 
                                                    ${payment.status === 'Paid' ? 'bg-green-500' :
                                                        payment.status === 'Active' ? 'bg-blue-500' :
                                                            'bg-yellow-500'}`}></span>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-slate-400 hover:text-primary transition-colors p-2 md:hidden">
                                                <Smartphone className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;
