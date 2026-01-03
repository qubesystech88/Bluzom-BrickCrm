import React from 'react';
const Placeholder = ({ title }) => (
    <div className="p-8 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-center h-96">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
            <p className="text-slate-500">Module under development.</p>
        </div>
    </div>
);

export const Work = () => <Placeholder title="Work Management" />;
export const Payments = () => <Placeholder title="Payments & Invoices" />;
export const Fuel = () => <Placeholder title="Fuel & Expenses" />;
export const Customers = () => <Placeholder title="Customers" />;
export const Reports = () => <Placeholder title="Reports & Analytics" />;
export const Settings = () => <Placeholder title="Settings" />;
