import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Plus, Trash2 } from 'lucide-react';

const QuotationGenerator = () => {
    const [formData, setFormData] = useState({
        quotationNo: 'QTN-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        recipientName: '',
        recipientAddress: '',
        items: [
            { description: 'Service Charge', quantity: 1, price: 0 }
        ]
    });

    // Derived state for calculations
    const subtotal = formData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const gst = subtotal * 0.18; // Default 18%
    const total = subtotal + gst;

    const quotationRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = field === 'description' ? value : parseFloat(value) || 0;
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (index) => {
        if (formData.items.length > 1) {
            setFormData(prev => ({
                ...prev,
                items: prev.items.filter((_, i) => i !== index)
            }));
        }
    };

    const downloadPDF = async () => {
        const element = quotationRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Quotation-${formData.quotationNo}.pdf`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Quotation Generator</h1>
                    <p className="text-slate-500 dark:text-slate-400">Generate professional quotations and estimates.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white border-b pb-2 dark:border-slate-700">Quotation Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quotation No</label>
                                <input
                                    type="text"
                                    name="quotationNo"
                                    value={formData.quotationNo}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">To (Client Name)</label>
                                <input
                                    type="text"
                                    name="recipientName"
                                    value={formData.recipientName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    placeholder="Client Name Company"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Address</label>
                                <input
                                    type="text"
                                    name="recipientAddress"
                                    value={formData.recipientAddress}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    placeholder="Address"
                                />
                            </div>

                            <div className="border-t pt-4 dark:border-slate-700">
                                <h3 className="font-medium text-slate-800 dark:text-white mb-2">Items</h3>
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                    {formData.items.map((item, index) => (
                                        <div key={index} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg relative group">
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Description"
                                                    value={item.description}
                                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                    className="w-full text-sm rounded border-gray-300 dark:border-gray-600 dark:bg-slate-700 mb-2"
                                                />
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="Qty"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                        className="w-16 text-sm rounded border-gray-300 dark:border-gray-600 dark:bg-slate-700"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Price per unit"
                                                        value={item.price}
                                                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                                        className="flex-1 text-sm rounded border-gray-300 dark:border-gray-600 dark:bg-slate-700"
                                                    />
                                                </div>
                                            </div>
                                            {formData.items.length > 1 && (
                                                <button
                                                    onClick={() => removeItem(index)}
                                                    className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={addItem}
                                    className="mt-3 text-sm text-primary flex items-center font-medium hover:underline"
                                >
                                    <Plus className="w-4 h-4 mr-1" /> Add Another Item
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={downloadPDF}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-lg shadow-indigo-200 mt-6 flex items-center justify-center gap-2 transition-all"
                        >
                            <Download className="w-5 h-5" /> Download Quotation PDF
                        </button>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-8 overflow-auto bg-slate-100 dark:bg-slate-900 p-8 rounded-xl flex justify-center">
                    <div
                        ref={quotationRef}
                        className="bg-white text-slate-900 w-[210mm] min-h-[297mm] px-12 py-8 shadow-2xl relative border-t-8 border-orange-500"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        {/* Religious Header */}
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold text-orange-600">|| श्री गणेशाय नम: ||</h2>
                        </div>

                        {/* Company Header - Reusing similar branding */}
                        <div className="border-[3px] border-slate-800 p-4 rounded-lg mb-6 relative">
                            <div className="flex flex-col items-center justify-center text-center">
                                <h1 className="text-3xl font-extrabold uppercase tracking-wider text-slate-900 mb-1">Kunal Land Developers & Compressors</h1>
                                <div className="flex items-center justify-center gap-3 text-slate-500 my-1">
                                    <span className="h-px w-8 bg-slate-400"></span>
                                    <span className="font-semibold text-sm">&</span>
                                    <span className="h-px w-8 bg-slate-400"></span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-700">AK Aerial Solutions</h2>

                                <div className="mt-4 text-sm text-slate-700 font-medium leading-tight">
                                    <p>Gat No 85, Gairan, Malwadi, Mawal, Talegaon Dabhade,</p>
                                    <p>Pune-410506, Maharashtra, India</p>
                                </div>
                                <div className="flex gap-6 mt-2 text-sm font-bold text-slate-800">
                                    <p>GST No: 27AFZPD0898M1ZI</p>
                                    <p>Mob: 9822457705</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-6 border-b-2 border-slate-800 pb-2">
                            <div className="w-1/2">
                                <span className="inline-block bg-slate-800 text-white px-4 py-1 font-bold tracking-widest text-lg mb-2">QUOTATION</span>
                                <div className="text-sm font-medium text-slate-600">
                                    <p className="flex items-start gap-1">
                                        <span className="font-bold text-slate-900 w-24">Quotation For:</span>
                                        <span className="font-bold text-slate-800 flex-1">{formData.recipientName || '____________________'}</span>
                                    </p>
                                    <p className="flex items-start gap-1 mt-1">
                                        <span className="font-bold text-slate-900 w-24">Address:</span>
                                        <span className="text-slate-600 flex-1">{formData.recipientAddress || '________________________'}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/2 text-right">
                                <h2 className="text-2xl font-light text-slate-400 uppercase tracking-widest mb-1">Estimate</h2>
                                <p className="font-bold text-slate-800">{formData.quotationNo}</p>
                                <p className="text-xs text-slate-500">Date: {formData.date}</p>
                                <p className="text-xs text-slate-500">Valid Until: {formData.validUntil}</p>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mb-8 min-h-[300px]">
                            <table className="w-full border-collapse border border-slate-300">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="border border-slate-300 py-3 px-2 text-left text-xs font-bold text-slate-900 uppercase tracking-wider">Item Description</th>
                                        <th className="border border-slate-300 py-3 px-2 text-center text-xs font-bold text-slate-900 uppercase tracking-wider w-20">Qty</th>
                                        <th className="border border-slate-300 py-3 px-2 text-right text-xs font-bold text-slate-900 uppercase tracking-wider w-32">Unit Price</th>
                                        <th className="border border-slate-300 py-3 px-2 text-right text-xs font-bold text-slate-900 uppercase tracking-wider w-32">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.items.map((item, index) => (
                                        <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                            <td className="border border-slate-300 py-4 px-2 text-slate-700">
                                                {item.description || 'Item Description'}
                                            </td>
                                            <td className="border border-slate-300 py-4 px-2 text-center text-slate-600">{item.quantity}</td>
                                            <td className="border border-slate-300 py-4 px-2 text-right text-slate-600">₹{parseFloat(item.price).toFixed(2)}</td>
                                            <td className="border border-slate-300 py-4 px-2 text-right font-medium text-slate-900">
                                                ₹{(item.quantity * item.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Empty rows to fill space */}
                                    <tr className="h-24"><td className="border border-slate-300" colSpan="4"></td></tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="border border-slate-300 py-2 px-4 text-right font-bold text-slate-600" colSpan="3">Subtotal</td>
                                        <td className="border border-slate-300 py-2 px-4 text-right font-medium text-slate-700">₹{subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-300 py-2 px-4 text-right font-bold text-slate-600" colSpan="3">GST (18%)</td>
                                        <td className="border border-slate-300 py-2 px-4 text-right font-medium text-slate-700">₹{gst.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-slate-100">
                                        <td className="border border-slate-300 py-3 px-4 text-right font-bold text-slate-800" colSpan="3">Grand Total</td>
                                        <td className="border border-slate-300 py-3 px-4 text-right font-bold text-xl text-primary">₹{total.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Footer / Signature */}
                        <div className="flex justify-between items-end pt-8 mt-auto">
                            <div className="w-1/2 text-center">
                                {/* Optional: Client signature space */}
                            </div>

                            <div className="w-1/3 text-center relative">
                                <p className="text-sm font-bold text-slate-800 mb-8">For Kunal Land Developers</p>

                                <div className="h-24 flex items-center justify-center relative my-2">
                                    {/* Circular Stamp Implementation */}
                                    <div className="w-24 h-24 rounded-full border-2 border-slate-500 text-slate-500 flex items-center justify-center rotate-[-12deg] opacity-80" style={{ borderStyle: 'double', borderWidth: '4px' }}>
                                        <div className="text-[10px] uppercase font-bold text-center leading-tight">
                                            Kunal Land<br />Developers<br />&<br />AK Aerial
                                        </div>
                                    </div>
                                    {/* Digital Sign */}
                                    <div className="absolute bottom-1 right-2 text-slate-800 font-serif italic text-lg transform -rotate-6">Kunal Dabhade</div>
                                </div>

                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 pt-2 border-t border-slate-300">Authorized Signatory</p>
                                <p className="text-xs font-bold text-slate-800 mt-1">9822457705</p>
                            </div>
                        </div>

                        {/* Contact info footer */}
                        <div className="absolute bottom-6 left-0 right-0 text-center">
                            <p className="text-[10px] text-slate-400">This is a system generated quotation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default QuotationGenerator;
