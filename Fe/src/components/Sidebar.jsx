import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    CreditCard,
    Truck,
    Fuel,
    Users,
    BarChart3,
    Settings,
    X,
    FileText,
    FileSpreadsheet
} from 'lucide-react';

const Sidebar = ({ closeSidebar }) => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/work', icon: Briefcase, label: 'Work Mgmt' },
        { to: '/payments', icon: CreditCard, label: 'Payments' },
        { to: '/vehicles', icon: Truck, label: 'Vehicles' },
        { to: '/fuel', icon: Fuel, label: 'Fuel & Expenses' },
        { to: '/customers', icon: Users, label: 'Customers' },
        { to: '/invoices', icon: FileText, label: 'Invoice Gen.' },
        { to: '/quotations', icon: FileSpreadsheet, label: 'Quotation Gen.' },
        { to: '/reports', icon: BarChart3, label: 'Reports' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-colors duration-300">
            <div className="p-6 h-16 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
                <h1 className="text-xl font-bold text-primary dark:text-blue-400 truncate">Bluzom BrickCRM</h1>
                <button onClick={closeSidebar} className="lg:hidden text-slate-500 dark:text-slate-400">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                onClick={closeSidebar} // Close on mobile navigation
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-primary/10 text-primary dark:bg-blue-500/20 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl">
                    <img
                        src="/1767458482383.png"
                        alt="Company Logo"
                        className="h-16 w-auto object-contain mb-2"
                        onError={(e) => { e.target.style.display = 'none' }} // Fallback if image fails
                    />
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider">POWERED BY BLUZOM</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
