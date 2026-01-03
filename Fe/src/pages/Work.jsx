import React, { useState } from 'react';
import { Download, Plus, CheckCircle, Clock, MapPin } from 'lucide-react';
import { downloadCSV } from '../utils/helpers';

const Work = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Inspect Generator', assignee: 'Rajesh', location: 'Site A', status: 'Pending', desc: 'Check oil levels' },
        { id: 2, title: 'Deliver Cement', assignee: 'Mohan', location: 'Site B', status: 'Completed', desc: '50 Bags delivery' },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', assignee: '', location: '', desc: '' });

    const handleDownload = () => {
        downloadCSV(tasks, 'work_tasks.csv');
    };

    const addTask = (e) => {
        e.preventDefault();
        setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: 'Pending' }]);
        setNewTask({ title: '', assignee: '', location: '', desc: '' });
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Work Management</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage daily tasks and schedules</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleDownload} className="flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </button>
                    <button onClick={() => setShowForm(!showForm)} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
                        <Plus className="w-4 h-4 mr-2" /> Add Task
                    </button>
                </div>
            </div>

            {/* Add Task Form */}
            {showForm && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Assign New Task</h3>
                    <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Task Title"
                            className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white"
                            value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} required
                        />
                        <input
                            placeholder="Assignee Name"
                            className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white"
                            value={newTask.assignee} onChange={e => setNewTask({ ...newTask, assignee: e.target.value })} required
                        />
                        <input
                            placeholder="Location"
                            className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white"
                            value={newTask.location} onChange={e => setNewTask({ ...newTask, location: e.target.value })} required
                        />
                        <input
                            placeholder="Description"
                            className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white"
                            value={newTask.desc} onChange={e => setNewTask({ ...newTask, desc: e.target.value })}
                        />
                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Save Task</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Today's Work List */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Today's Tasks</h3>
            <div className="grid grid-cols-1 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                {task.status === 'Completed' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{task.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{task.desc}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {task.location}</span>
                                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">Assigned to: {task.assignee}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <select className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg p-2 focus:ring-primary focus:border-primary">
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Work;
