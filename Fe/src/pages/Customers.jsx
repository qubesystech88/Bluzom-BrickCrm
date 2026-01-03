import React, { useState } from 'react';
import { Trash2, Plus, Phone, Mail, Building } from 'lucide-react';

const Customers = () => {
    const [customers, setCustomers] = useState([
        { id: 1, name: 'Tech Solutions Ltd', email: 'contact@techsol.com', phone: '080-12345678', address: 'Bangalore' },
        { id: 2, name: 'BuildWell Constructions', email: 'info@buildwell.com', phone: '080-87654321', address: 'Mysore' }
    ]);
    const [showForm, setShowForm] = useState(false);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Customer Database</h2>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                    <Plus className="w-4 h-4 mr-2" /> Add Customer
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Company / Customer Name" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                        <input placeholder="Phone" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                        <input placeholder="Email" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                        <input placeholder="Address" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                        <button className="md:col-span-2 bg-primary text-white py-2 rounded-lg">Save Profile</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customers.map(c => (
                    <div key={c.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{c.name}</h3>
                            <div className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {c.email}</p>
                                <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {c.phone}</p>
                                <p className="flex items-center"><Building className="w-4 h-4 mr-2" /> {c.address}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(c.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customers;
