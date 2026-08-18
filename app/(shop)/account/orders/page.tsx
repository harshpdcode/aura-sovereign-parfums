'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Download, User as UserIcon, MessageSquare, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Order } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { generateOrderInvoicePDF } from '@/lib/utils/invoice';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('aldenaire_orders') || '[]');
      if (savedOrders.length > 0) {
        setOrders(savedOrders);
      } else {
        // Sample order for immediate demonstration
        const sampleOrder: Order = {
          id: 'ord-sample-1',
          orderNumber: 'AS-892415',
          customerName: 'Lord Henry Sterling',
          customerEmail: 'client@aurasovereign.com',
          customerPhone: '+91 98765 43210',
          shippingAddress: '42 Altamount Road, Cumballa Hill, Mumbai 400026',
          status: 'SHIPPED',
          subtotal: 8500,
          discount: 0,
          shipping: 0,
          tax: 0,
          total: 8500,
          paymentStatus: 'PAID',
          paymentMethod: 'UPI / Google Pay',
          createdAt: new Date(Date.now() - 86400000 * 2),
          updatedAt: new Date(),
          items: [
            {
              id: 'item-1',
              orderId: 'ALD-892415',
              productNameSnapshot: 'Santal Impérial (100ml)',
              productImgSnapshot: '/Perfume/Perfume Image/6983.jpg',
              priceSnapshot: 8500,
              quantity: 1,
            },
          ],
        };
        setOrders([sampleOrder]);
      }
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="pb-6 border-b border-white/10">
          <span className="text-xs uppercase font-mono tracking-widest text-gold block">
            Client Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-ivory-light">
            Order Invoices & History
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-white/10 text-xs font-mono">
          <Link href="/account" className="pb-3 text-smoke hover:text-ivory flex items-center gap-2">
            <UserIcon size={14} /> Profile & Addresses
          </Link>
          <Link href="/account/orders" className="pb-3 border-b-2 border-gold text-gold font-semibold flex items-center gap-2">
            <Package size={14} /> Orders & Invoices
          </Link>
          <Link href="/account/feedback" className="pb-3 text-smoke hover:text-ivory flex items-center gap-2">
            <MessageSquare size={14} /> Atelier Feedback
          </Link>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-16 rounded-3xl bg-charcoal/40 border border-white/5 text-center space-y-4">
              <Package size={32} className="text-gold/60 mx-auto" />
              <h3 className="font-serif text-xl text-ivory">No orders on record</h3>
              <p className="text-xs text-smoke">Your acquisition history will appear here.</p>
              <Link href="/shop" className="inline-block pt-2 text-xs font-mono text-gold hover:underline">
                Explore Sovereign Collection
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderNumber}
                className="p-6 rounded-3xl bg-charcoal/70 border border-white/10 space-y-6 backdrop-blur-xl"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-smoke">Order Reference:</span>
                    <h3 className="font-serif text-lg font-medium text-ivory">
                      #{order.orderNumber}
                    </h3>
                    <span className="text-[10px] text-smoke block">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Status Pill */}
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 ${
                        order.status === 'DELIVERED'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                          : order.status === 'SHIPPED'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-gold/10 text-gold border border-gold/30'
                      }`}
                    >
                      {order.status === 'SHIPPED' ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {order.status}
                    </span>

                    {/* PDF Download Button */}
                    <button
                      onClick={() => generateOrderInvoicePDF(order)}
                      className="px-4 py-2 rounded-full border border-gold/40 text-gold text-xs hover:bg-gold hover:text-obsidian transition-all flex items-center gap-1.5 font-bold"
                    >
                      <Download size={13} /> Download PDF Invoice
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-obsidian flex-shrink-0">
                          <Image
                            src={item.productImgSnapshot || '/Perfume/Perfume Image/6983.jpg'}
                            alt={item.productNameSnapshot}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-ivory font-medium">
                            {item.productNameSnapshot}
                          </h4>
                          <span className="text-[11px] text-smoke font-mono">
                            Qty: {item.quantity} • {formatCurrency(item.priceSnapshot)} each
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-semibold text-gold">
                        {formatCurrency(item.priceSnapshot * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer details */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between text-[11px] text-smoke font-mono gap-2">
                  <span>Shipping Address: {order.shippingAddress}</span>
                  <span className="text-ivory font-bold">
                    Total: {formatCurrency(order.total)} ({order.paymentMethod})
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
