import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Truck, Plus, Trash2 } from 'lucide-react';

const Vehicles = () => {
    const [activeTab, setActiveTab] = useState('vehicles');
    const [showForm, setShowForm] = useState(false);

    // Mock Data
    const [vehicles] = useState([
        { id: 1, make: 'Toyota', model: 'Hilux', reg: 'KA-01-HH-1234', status: 'Active', driver: 'Raju Kumar' },
        { id: 2, make: 'Ford', model: 'Transit', reg: 'KA-05-AB-9876', status: 'Maintenance', driver: null },
    ]);

    const [drivers] = useState([
        { id: 1, name: 'Raju Kumar', phone: '9988776655', assigned: 'KA-01-HH-1234', experience: '5 Years' },
        { id: 2, name: 'Mahesh B', phone: '9876543210', assigned: null, experience: '3 Years' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Fleet Management</h2>
                <div className="flex gap-3">
                    <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-lg flex">
                        <button onClick={() => setActiveTab('vehicles')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'vehicles' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'text-slate-500'}`}>Vehicles</button>
                        <button onClick={() => setActiveTab('drivers')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'drivers' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'text-slate-500'}`}>Drivers</button>
                    </div>

                    <button onClick={() => setShowForm(!showForm)} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                        <Plus className="w-4 h-4 mr-2" /> {activeTab === 'vehicles' ? 'Add Vehicle' : 'Add Driver'}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-4">
                    {activeTab === 'vehicles' ? (
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input placeholder="Make (e.g. Toyota)" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                            <input placeholder="Model" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                            <input placeholder="Registration Number" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                            <select className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white">
                                <option>Select Driver</option>
                                <option>Raju Kumar</option>
                            </select>
                            <button className="md:col-span-2 bg-primary text-white py-2 rounded-lg">Save Vehicle</button>
                        </form>
                    ) : (
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input placeholder="Driver Name" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                            <input placeholder="Phone Number" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                            <input placeholder="License Number" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                            <input placeholder="Years of Experience" className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white" />
                            <button className="md:col-span-2 bg-primary text-white py-2 rounded-lg">Save Driver</button>
                        </form>
                    )}
                </div>
            )}

            {/* Content Area */}
            {activeTab === 'vehicles' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(v => (
                        <div key={v.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${v.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{v.status}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{v.make} {v.model}</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">{v.reg}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                                    <User className="w-4 h-4 mr-2" /> Driver: <span className="text-slate-900 dark:text-white ml-1 font-medium">{v.driver || 'Unassigned'}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drivers.map(d => (
                        <div key={d.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-lg">
                                    {d.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{d.name}</h3>
                                    <p className="text-xs text-slate-500">Exp: {d.experience}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center"><Phone className="w-4 h-4 mr-2 text-slate-400" /> {d.phone}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center"><Truck className="w-4 h-4 mr-2 text-slate-400" /> {d.assigned || 'No Vehicle'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Vehicles;
