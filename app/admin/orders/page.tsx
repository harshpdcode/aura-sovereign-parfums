'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, CheckCircle2, Clock, XCircle, Trash2, Download } from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { generateOrderInvoicePDF } from '@/lib/utils/invoice';
import { useApp } from '@/context/AppContext';

export default function AdminOrdersPage() {
  const { addToast } = useApp();

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-101',
      orderNumber: 'AS-782194',
      customerName: 'Lord Henry Sterling',
      customerEmail: 'client@aurasovereign.com',
      customerPhone: '+91 98765 43210',
      shippingAddress: '42 Altamount Road, Cumballa Hill, Mumbai 400026',
      status: 'SHIPPED',
      subtotal: 19700,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 19700,
      paymentStatus: 'PAID',
      paymentMethod: 'UPI / Google Pay',
      createdAt: new Date(Date.now() - 86400000 * 2),
      updatedAt: new Date(),
      items: [
        {
          id: 'item-1',
          orderId: 'ALD-782194',
          productNameSnapshot: 'Santal Impérial (100ml)',
          productImgSnapshot: '/Perfume/Perfume Image/6983.jpg',
          priceSnapshot: 8500,
          quantity: 1,
        },
        {
          id: 'item-2',
          orderId: 'ALD-782194',
          productNameSnapshot: 'Oud Nocturne (100ml)',
          productImgSnapshot: '/Perfume/Perfume Image/bottle-perfume-that-is-made-by-company-called-perfume_1165863-13540.jpg',
          priceSnapshot: 11200,
          quantity: 1,
        },
      ],
    },
    {
      id: 'ord-102',
      orderNumber: 'ALD-782195',
      customerName: 'Lady Eleanor Vance',
      customerEmail: 'eleanor@vance.fr',
      customerPhone: '+33 6 12 34 56 78',
      shippingAddress: '14 Place Vendôme, 75001 Paris, France',
      status: 'PENDING',
      subtotal: 7400,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 7400,
      paymentStatus: 'PENDING',
      paymentMethod: 'Cash on Delivery',
      createdAt: new Date(Date.now() - 3600000 * 5),
      updatedAt: new Date(),
      items: [
        {
          id: 'item-3',
          orderId: 'ALD-782195',
          productNameSnapshot: 'Rose Éthérée (100ml)',
          productImgSnapshot: '/Perfume/Perfume Image/bottle-perfume-with-pink-flower-background_81048-5604.jpg',
          priceSnapshot: 7400,
          quantity: 1,
        },
      ],
    },
    {
      id: 'ord-103',
      orderNumber: 'ALD-782196',
      customerName: 'Julian V. de Montfort',
      customerEmail: 'julian@montfort.co.uk',
      customerPhone: '+44 20 7946 0912',
      shippingAddress: '28 Old Bond Street, Mayfair, London W1S 4DR, UK',
      status: 'DELIVERED',
      subtotal: 6900,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 6900,
      paymentStatus: 'PAID',
      paymentMethod: 'Credit/Debit Card',
      createdAt: new Date(Date.now() - 86400000 * 5),
      updatedAt: new Date(),
      items: [
        {
          id: 'item-4',
          orderId: 'ALD-782196',
          productNameSnapshot: 'Bleu Céleste (100ml)',
          productImgSnapshot: '/Perfume/Perfume Image/bottle-blue-perfume-sits-table-two-glasses_1165863-13929.jpg',
          priceSnapshot: 6900,
          quantity: 1,
        },
      ],
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Order status updated to ${newStatus}.`, 'success');
  };

  const handlePaymentStatusChange = (orderId: string, newPaymentStatus: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o))
    );
    addToast(`Payment status updated to ${newPaymentStatus}.`, 'success');
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to remove this order from records?')) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      addToast('Order record removed.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold block">
            Fulfillment Center
          </span>
          <h1 className="text-3xl font-serif font-light text-ivory-light">
            Customer Orders ({orders.length})
          </h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-3xl bg-charcoal/70 border border-white/10 space-y-6"
          >
            {/* Order Meta Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono">
              <div>
                <span className="text-smoke">Order #{order.orderNumber}</span>
                <h3 className="font-serif text-lg font-medium text-ivory">
                  {order.customerName}
                </h3>
                <span className="text-[10px] text-smoke block">
                  {order.customerEmail} • {order.customerPhone}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Status Dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  className="bg-obsidian border border-gold/40 text-gold rounded-full px-3 py-1 text-xs font-mono focus:outline-none"
                >
                  <option value="PENDING">Status: PENDING</option>
                  <option value="PROCESSING">Status: PROCESSING</option>
                  <option value="SHIPPED">Status: SHIPPED</option>
                  <option value="DELIVERED">Status: DELIVERED</option>
                  <option value="CANCELLED">Status: CANCELLED</option>
                </select>

                {/* Payment Status Dropdown */}
                <select
                  value={order.paymentStatus}
                  onChange={(e) => handlePaymentStatusChange(order.id, e.target.value as PaymentStatus)}
                  className="bg-obsidian border border-white/10 text-smoke rounded-full px-3 py-1 text-xs font-mono focus:outline-none"
                >
                  <option value="PENDING">Payment: PENDING</option>
                  <option value="PAID">Payment: PAID</option>
                  <option value="FAILED">Payment: FAILED</option>
                  <option value="REFUNDED">Payment: REFUNDED</option>
                </select>

                {/* PDF Invoice Export */}
                <button
                  onClick={() => generateOrderInvoicePDF(order)}
                  className="p-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition-all"
                  title="Generate Official PDF Invoice"
                >
                  <Download size={14} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="p-2 rounded-full border border-white/10 text-smoke hover:text-red-400 transition-colors"
                  title="Delete Order"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Item list */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-obsidian flex-shrink-0">
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
                      <span className="text-[10px] text-smoke">
                        Qty: {item.quantity} • {formatCurrency(item.priceSnapshot)}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-gold">
                    {formatCurrency(item.priceSnapshot * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Address & Total */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between text-[11px] text-smoke font-mono gap-2">
              <span>Destination: {order.shippingAddress}</span>
              <span className="text-ivory font-bold">
                Total: {formatCurrency(order.total)} ({order.paymentMethod})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
