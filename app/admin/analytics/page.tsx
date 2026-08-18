'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign, Package } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '@/lib/utils';

export default function AdminAnalyticsPage() {
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  const salesData = [
    { name: 'Santal Impérial', count: 48, revenue: 408000, color: '#C6A15B' },
    { name: 'Oud Nocturne', count: 36, revenue: 403200, color: '#181716' },
    { name: 'Rose Éthérée', count: 29, revenue: 214600, color: '#E29578' },
    { name: 'Bleu Céleste', count: 24, revenue: 165600, color: '#2B6CB0' },
    { name: 'Ambre Doré', count: 18, revenue: 176400, color: '#D97706' },
    { name: 'Cuir Majestueux', count: 14, revenue: 147000, color: '#4A3525' },
  ];

  const totalUnits = salesData.reduce((acc, item) => acc + item.count, 0);
  const totalRevenue = salesData.reduce((acc, item) => acc + item.revenue, 0);

  const downloadReportPDF = () => {
    const doc = new jsPDF() as any;
    const today = new Date().toISOString().split('T')[0];

    // Header styling
    doc.setFillColor(11, 11, 11);
    doc.rect(0, 0, 210, 38, 'F');

    doc.setTextColor(245, 241, 232);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('AURA SOVEREIGN HAUTE PARFUMERIE', 14, 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(198, 161, 91);
    doc.text('EXECUTIVE REVENUE & SELLING PERFORMANCE AUDIT', 14, 26);

    doc.setTextColor(245, 241, 232);
    doc.setFontSize(9);
    doc.text(`Generated: ${today}`, 150, 22);
    doc.text(`Period: ${selectedMonth === 'ALL' ? 'Annual Comprehensive' : `Month: ${selectedMonth}`}`, 150, 28);

    // Table Data
    const tableColumns = ['Flacon / Fragrance', 'Units Sold', 'Unit Price', 'Gross Sales (INR)'];
    const tableRows = salesData.map((item) => [
      item.name,
      item.count.toString(),
      `Rs. ${(item.revenue / item.count).toFixed(2)}`,
      `Rs. ${item.revenue.toLocaleString('en-IN')}`,
    ]);

    doc.autoTable({
      startY: 48,
      head: [tableColumns],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [24, 23, 22],
        textColor: [245, 241, 232],
        fontSize: 10,
        fontStyle: 'bold',
      },
      bodyStyles: {
        textColor: [40, 40, 40],
        fontSize: 9,
      },
    });

    const finalY = doc.lastAutoTable.finalY + 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(11, 11, 11);
    doc.text(`Total Flacons Distributed: ${totalUnits} units`, 14, finalY);
    doc.text(`Total Gross Revenue: Rs. ${totalRevenue.toLocaleString('en-IN')}`, 14, finalY + 7);

    doc.save(`Aura_Sovereign_Selling_Report_${today}.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold block">
            Financial Intelligence
          </span>
          <h1 className="text-3xl font-serif font-light text-ivory-light">
            Sales & Revenue Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-obsidian border border-white/10 text-smoke rounded-full px-4 py-2 text-xs font-mono focus:outline-none focus:border-gold"
          >
            <option value="ALL">All Periods</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <button
            onClick={downloadReportPDF}
            className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-mono font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md shadow-gold/10"
          >
            <Download size={14} /> Export Report PDF
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-charcoal/80 border border-white/10 space-y-2">
          <span className="text-xs font-mono text-smoke uppercase">Total Gross Revenue</span>
          <p className="font-serif text-3xl text-gold font-bold">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="p-6 rounded-3xl bg-charcoal/80 border border-white/10 space-y-2">
          <span className="text-xs font-mono text-smoke uppercase">Total Flacons Distributed</span>
          <p className="font-serif text-3xl text-ivory font-bold">{totalUnits} units</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pie Chart: Distribution by Flacon */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-charcoal/70 border border-white/10 space-y-4">
          <h3 className="font-serif text-lg text-ivory font-medium">
            Volume Distribution by Flacon
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={3}
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#181716', borderColor: '#C6A15B', borderRadius: '12px', fontSize: '11px', color: '#F5F1E8' }}
                  itemStyle={{ color: '#F5F1E8' }}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value) => <span className="text-xs font-mono text-smoke">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Revenue Comparison */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-charcoal/70 border border-white/10 space-y-4">
          <h3 className="font-serif text-lg text-ivory font-medium">
            Gross Sales by Creation (₹)
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="name" stroke="#77736D" fontSize={10} tickLine={false} />
                <YAxis stroke="#77736D" fontSize={10} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181716', borderColor: '#C6A15B', borderRadius: '12px', fontSize: '11px', color: '#F5F1E8' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Gross Revenue']}
                />
                <Bar dataKey="revenue" fill="#C6A15B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
