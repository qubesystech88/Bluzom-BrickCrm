import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, RefreshCw } from 'lucide-react';

const InvoiceGenerator = () => {
    const [formData, setFormData] = useState({
        invoiceNo: 'INV-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        billToName: '',
        billToAddress: '',
        vehicle: '',
        timing: '',
        rate: '',
        gst: '18',
        lumpSum: '',
        total: '',
        isLumpSum: false
    });

    const invoiceRef = useRef();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: type === 'checkbox' ? checked : value };
            return newData;
        });
    };

    const calculateTotal = () => {
        if (formData.isLumpSum) {
            setFormData(prev => ({ ...prev, total: prev.lumpSum }));
        } else {
            const rate = parseFloat(formData.rate) || 0;
            const gstPercent = parseFloat(formData.gst) || 0;
            const gstAmount = (rate * gstPercent) / 100;
            const total = rate + gstAmount;
            setFormData(prev => ({ ...prev, total: total.toFixed(2) }));
        }
    };

    const downloadPDF = async () => {
        const element = invoiceRef.current;
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
        pdf.save(`Invoice-${formData.invoiceNo}.pdf`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Invoice Generator</h1>
                    <p className="text-slate-500 dark:text-slate-400">Create professional invoices for Kunal Land Developers</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white border-b pb-2 dark:border-slate-700">Invoice Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Invoice Number</label>
                                <input
                                    type="text"
                                    name="invoiceNo"
                                    value={formData.invoiceNo}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bill To (Name/Company)</label>
                                <input
                                    type="text"
                                    name="billToName"
                                    value={formData.billToName}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    placeholder="Client Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Address</label>
                                <textarea
                                    name="billToAddress"
                                    value={formData.billToAddress}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    placeholder="Client Address"
                                />
                            </div>

                            <div className="border-t pt-4 dark:border-slate-700">
                                <h3 className="font-medium text-slate-800 dark:text-white mb-2">Job Details</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vehicle Used</label>
                                        <select
                                            name="vehicle"
                                            value={formData.vehicle}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        >
                                            <option value="">Select Vehicle</option>
                                            <option value="JCB 3DX">JCB 3DX</option>
                                            <option value="Poclain 210">Poclain 210</option>
                                            <option value="Hitachi 200">Hitachi 200</option>
                                            <option value="Tractor Compressor">Tractor Compressor</option>
                                            <option value="Crane 12T">Crane 12T</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timing / Hours</label>
                                        <input
                                            type="text"
                                            name="timing"
                                            value={formData.timing}
                                            onChange={handleChange}
                                            placeholder="e.g. 8 hours or 9:00 AM - 5:00 PM"
                                            className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium text-slate-800 dark:text-white">Pricing</h3>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isLumpSum"
                                            name="isLumpSum"
                                            checked={formData.isLumpSum}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="isLumpSum" className="text-sm text-slate-600 dark:text-slate-400">Lump Sum?</label>
                                    </div>
                                </div>

                                {formData.isLumpSum ? (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Lump Sum Amount</label>
                                        <input
                                            type="number"
                                            name="lumpSum"
                                            value={formData.lumpSum}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rate</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-slate-500">₹</span>
                                                <input
                                                    type="number"
                                                    name="rate"
                                                    value={formData.rate}
                                                    onChange={handleChange}
                                                    className="w-full pl-8 rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GST %</label>
                                            <input
                                                type="number"
                                                name="gst"
                                                value={formData.gst}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={calculateTotal}
                                    className="mt-4 w-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" /> Calculate Total
                                </button>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Total Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                                        <input
                                            type="text"
                                            name="total"
                                            value={formData.total}
                                            onChange={handleChange}
                                            className="w-full pl-8 rounded-lg border-primary border-2 font-bold text-lg dark:bg-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={downloadPDF}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 mt-6 transition-all"
                        >
                            <Download className="w-5 h-5" /> Download Invoice PDF
                        </button>
                    </div>
                </div>

                {/* Preview Area (A4 aspect ratio approximately) */}
                <div className="lg:col-span-8 overflow-auto bg-slate-100 dark:bg-slate-900 p-8 rounded-xl flex justify-center">
                    <div
                        ref={invoiceRef}
                        className="bg-white text-slate-900 w-[210mm] min-h-[297mm] px-12 py-8 shadow-2xl relative border-t-8 border-orange-500"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        {/* Religious Header */}
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold text-orange-600">|| श्री गणेशाय नम: ||</h2>
                        </div>

                        {/* Company Header */}
                        <div className="border-[3px] border-slate-800 p-4 rounded-lg mb-6 relative">
                            <div className="flex flex-col items-center justify-center text-center">
                                <h1 className="text-3xl font-extrabold uppercase tracking-wider text-slate-900 mb-1">Kunal Land Developers & Compressors</h1>
                                <div className="flex items-center justify-center gap-3 text-slate-500 my-1">
                                    <span className="h-px w-8 bg-slate-400"></span>
                                    <span className="font-semibold text-sm">&</span>
                                    <span className="h-px w-8 bg-slate-400"></span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-700">AK Aerial Solutions</h2>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-bold">Heavy Earth Movers & Compressor Services</p>

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

                        {/* Invoice Title & Meta */}
                        <div className="flex justify-between items-end mb-6 border-b-2 border-slate-800 pb-2">
                            <div className="w-1/2">
                                <span className="inline-block bg-slate-800 text-white px-4 py-1 font-bold tracking-widest text-lg mb-2">INVOICE</span>
                                <div className="text-sm font-medium text-slate-600">
                                    <p className="flex items-start gap-1">
                                        <span className="font-bold text-slate-900 w-16">Bill To:</span>
                                        <span className="font-bold text-slate-800 flex-1">{formData.billToName || '____________________'}</span>
                                    </p>
                                    <p className="flex items-start gap-1 mt-1">
                                        <span className="font-bold text-slate-900 w-16">Address:</span>
                                        <span className="text-slate-600 flex-1">{formData.billToAddress || '________________________'}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/2 text-right">
                                <div className="flex justify-end gap-2 mb-1">
                                    <span className="font-bold text-slate-700">Invoice No:</span>
                                    <span className="font-bold text-red-600">{formData.invoiceNo}</span>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <span className="font-bold text-slate-700">Date:</span>
                                    <span>{formData.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mb-8 min-h-[300px]">
                            <table className="w-full border-collapse border border-slate-300">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="border border-slate-300 py-2 px-3 text-center text-xs font-bold text-slate-800 uppercase w-12">Sr.No.</th>
                                        <th className="border border-slate-300 py-2 px-3 text-left text-xs font-bold text-slate-800 uppercase">Particulars</th>
                                        <th className="border border-slate-300 py-2 px-3 text-center text-xs font-bold text-slate-800 uppercase w-32">HSN/SAC</th>
                                        <th className="border border-slate-300 py-2 px-3 text-center text-xs font-bold text-slate-800 uppercase w-24">Timing/Qty</th>
                                        <th className="border border-slate-300 py-2 px-3 text-right text-xs font-bold text-slate-800 uppercase w-32">Rate</th>
                                        <th className="border border-slate-300 py-2 px-3 text-right text-xs font-bold text-slate-800 uppercase w-32">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="h-16">
                                        <td className="border border-slate-300 py-3 px-3 text-center align-top">01</td>
                                        <td className="border border-slate-300 py-3 px-3 align-top">
                                            <p className="font-bold text-slate-800">{formData.vehicle || 'Equipment/Service'}</p>
                                            <p className="text-xs text-slate-500 mt-1">Hiring Charges</p>
                                        </td>
                                        <td className="border border-slate-300 py-3 px-3 text-center align-top text-slate-500">-</td>
                                        <td className="border border-slate-300 py-3 px-3 text-center align-top font-medium">{formData.timing || '-'}</td>
                                        <td className="border border-slate-300 py-3 px-3 text-right align-top">
                                            {formData.isLumpSum ? '-' : `₹${formData.rate}`}
                                        </td>
                                        <td className="border border-slate-300 py-3 px-3 text-right align-top font-bold">
                                            {formData.isLumpSum ? `₹${formData.lumpSum}` : `₹${formData.rate}`}
                                        </td>
                                    </tr>
                                    {/* GST Row if applicable */}
                                    {!formData.isLumpSum && formData.rate && (
                                        <>
                                            <tr>
                                                <td className="border border-slate-300 py-2 px-3"></td>
                                                <td className="border border-slate-300 py-2 px-3 text-sm font-medium text-slate-600 text-right">CGST ({parseFloat(formData.gst) / 2}%)</td>
                                                <td className="border border-slate-300"></td>
                                                <td className="border border-slate-300"></td>
                                                <td className="border border-slate-300"></td>
                                                <td className="border border-slate-300 py-2 px-3 text-right text-sm">
                                                    ₹{((parseFloat(formData.rate) * (parseFloat(formData.gst) / 2)) / 100).toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-300 py-2 px-3"></td>
                                                <td className="border border-slate-300 py-2 px-3 text-sm font-medium text-slate-600 text-right">SGST ({parseFloat(formData.gst) / 2}%)</td>
                                                <td className="border border-slate-300"></td>
                                                <td className="border border-slate-300"></td>
                                                <td className="border border-slate-300"></td>
                                                <td className="border border-slate-300 py-2 px-3 text-right text-sm">
                                                    ₹{((parseFloat(formData.rate) * (parseFloat(formData.gst) / 2)) / 100).toFixed(2)}
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                    {/* Empty rows to fill space */}
                                    <tr className="h-24"><td className="border border-slate-300" colSpan="6"></td></tr>
                                </tbody>
                                <tfoot>
                                    <tr className="bg-slate-50">
                                        <td className="border border-slate-300 py-3 px-4 text-right font-bold text-slate-800" colSpan="5">Total Amount</td>
                                        <td className="border border-slate-300 py-3 px-4 text-right font-bold text-xl text-slate-900">₹{formData.total || '0.00'}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="mt-2 text-xs font-bold text-slate-500 italic">
                                * Value includes all applicable taxes if specified.
                            </div>
                        </div>

                        {/* Footer / Signature */}
                        <div className="flex justify-between items-end pt-8 mt-auto">
                            <div className="w-1/2 text-xs space-y-2">
                                <h4 className="font-bold text-slate-800 decoration-underline underline">Terms & Conditions:</h4>
                                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                                    <li>Payment to be made within 15 days from the date of invoice.</li>
                                    <li>Interest @ 24% p.a. will be charged on delayed payments.</li>
                                    <li>Subject to Pune Jurisdiction only.</li>
                                </ul>
                                <div className="mt-4 pt-4 border-t border-slate-300">
                                    <p className="font-bold text-slate-800">Bank Details:</p>
                                    <p className="text-slate-600">Bank: Bank of Maharashtra</p>
                                    <p className="text-slate-600">A/c Name: Kunal Land Developers</p>
                                </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
