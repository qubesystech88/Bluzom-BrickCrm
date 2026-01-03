import React from 'react';

const Settings = () => {
    return (
        <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Account Settings</h2>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Profile Details</h3>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Business Email</label>
                        <input
                            type="email"
                            defaultValue="admin@kunalconstructions.com"
                            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Change Password</label>
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white mb-3"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white"
                        />
                    </div>
                    <div className="pt-4">
                        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
