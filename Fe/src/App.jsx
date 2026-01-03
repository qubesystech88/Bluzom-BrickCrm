import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
// Import actual components, not stubs
import Work from './pages/Work';
import Payments from './pages/Payments';
import Fuel from './pages/Fuel';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import InvoiceGenerator from './pages/InvoiceGenerator';
import QuotationGenerator from './pages/QuotationGenerator';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route path="/" element={
                            <PrivateRoute>
                                <Layout />
                            </PrivateRoute>
                        }>
                            <Route index element={<Dashboard />} />
                            <Route path="vehicles" element={<Vehicles />} />
                            <Route path="work" element={<Work />} />
                            <Route path="payments" element={<Payments />} />
                            <Route path="fuel" element={<Fuel />} />
                            <Route path="customers" element={<Customers />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="invoices" element={<InvoiceGenerator />} />
                            <Route path="quotations" element={<QuotationGenerator />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
