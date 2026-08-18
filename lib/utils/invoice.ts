import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Order } from '@/lib/types';

export function generateOrderInvoicePDF(order: Order) {
  const doc = new jsPDF() as any;
  const brandName = 'AURA SOVEREIGN HAUTE PARFUMERIE';
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Background / Border Header
  doc.setFillColor(11, 11, 11); // Obsidian
  doc.rect(0, 0, 210, 40, 'F');

  // Brand Header
  doc.setTextColor(245, 241, 232); // Warm Ivory
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(brandName, 14, 20);

  doc.setFontSize(9);
  doc.setTextColor(198, 161, 91); // Gold
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL CLIENT INVOICE & CERTIFICATE OF AUTHENTICITY', 14, 30);

  // Bill To & Order Info
  doc.setTextColor(24, 23, 22); // Charcoal
  doc.setFontSize(10);
  doc.text(`Invoice Ref: #${order.orderNumber}`, 14, 55);
  doc.text(`Date Issued: ${orderDate}`, 14, 62);
  doc.text(`Payment Status: ${order.paymentStatus}`, 14, 69);
  doc.text(`Fulfillment: ${order.status}`, 14, 76);

  doc.text(`Client Name: ${order.customerName}`, 130, 55);
  doc.text(`Contact: ${order.customerEmail}`, 130, 62);
  doc.text(`Shipping: ${order.shippingAddress || 'Client Residence'}`, 130, 69);

  // Line Item Table
  const tableData = order.items.map((item) => [
    item.productNameSnapshot || 'Pure Perfume Extrait',
    '100ml Extrait Flacon',
    item.quantity.toString(),
    `Rs. ${item.priceSnapshot.toFixed(2)}`,
    `Rs. ${(item.priceSnapshot * item.quantity).toFixed(2)}`,
  ]);

  doc.autoTable({
    startY: 85,
    head: [['Fragrance Selection', 'Volume', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [24, 23, 22],
      textColor: [223, 195, 138],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: [38, 38, 38],
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [250, 249, 246],
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY || 150;

  // Subtotal & Total
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text(`Subtotal: Rs. ${order.subtotal.toFixed(2)}`, 140, finalY + 12);
  doc.setFontSize(12);
  doc.setTextColor(11, 11, 11);
  doc.text(`Total Amount: Rs. ${order.total.toFixed(2)}`, 140, finalY + 20);

  // Footer seal
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(119, 115, 109);
  doc.text(
    'Thank you for selecting Aura Sovereign. Each flacon is crafted with pure essences and hand-inspected for perfection.',
    14,
    280
  );
  doc.text('Aura Sovereign Fragrance Concierge • www.aurasovereign.com • support@aurasovereign.com', 14, 285);

  doc.save(`Aura_Sovereign_Invoice_${order.orderNumber}.pdf`);
}
