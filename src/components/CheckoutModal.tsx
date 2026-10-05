import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard, Banknote, ArrowLeft, Printer } from 'lucide-react';
import { CartItem, OrderConfirmation } from '../types/toy';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderComplete: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [fullName, setFullName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [street, setStreet] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Portland');
  const [postalCode, setPostalCode] = useState('97201');
  const [country, setCountry] = useState('United States');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !street || !city || !postalCode) return;
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `WK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderConfirmation = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...items],
      subtotal,
      shipping: deliverySpeed === 'express' ? shipping + 12 : shipping,
      discount,
      total: total + (deliverySpeed === 'express' ? 12 : 0),
      shippingAddress: {
        fullName,
        street,
        city,
        postalCode,
        country
      },
      deliveryEstimate: deliverySpeed === 'express' ? '2 business days (Priority Courier)' : '4-6 business days (Standard Courier)'
    };

    setConfirmedOrder(newOrder);
    onOrderComplete(newOrder);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <span className="font-serif text-lg font-bold text-stone-900">
              {step === 'confirmed' ? 'Order Confirmed' : 'Wunderkind Checkout'}
            </span>
          </div>
          {step !== 'confirmed' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Checkout Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                  Recipient & Courier Delivery Address
                </h3>
                <p className="text-xs text-stone-500">
                  Please provide shipping details for certified insured courier delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email (for Tracking)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street and apartment or suite"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                  />
                </div>
              </div>

              {/* Delivery Speed Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Courier Speed</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliverySpeed('standard')}
                    className={`p-3 border rounded-lg cursor-pointer text-xs ${
                      deliverySpeed === 'standard' ? 'border-amber-800 bg-amber-50/50' : 'border-stone-200 bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between font-semibold text-stone-900">
                      <span>Standard Courier</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-0.5 block">4-6 business days</span>
                  </div>

                  <div
                    onClick={() => setDeliverySpeed('express')}
                    className={`p-3 border rounded-lg cursor-pointer text-xs ${
                      deliverySpeed === 'express' ? 'border-amber-800 bg-amber-50/50' : 'border-stone-200 bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between font-semibold text-stone-900">
                      <span>Priority Air Courier</span>
                      <span>+${shipping + 12}</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-0.5 block">2 business days</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                <span className="text-xs text-stone-500">
                  Total: <strong className="text-stone-900 tabular-nums">${total + (deliverySpeed === 'express' ? 12 : 0)}</strong>
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Continue to Payment &rarr;
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <span className="text-stone-300">|</span>
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Payment Method
                  </h3>
                </div>
                <p className="text-xs text-stone-500">
                  Select payment instrument for Order Total: <strong className="text-stone-900 tabular-nums">${total + (deliverySpeed === 'express' ? 12 : 0)}</strong>
                </p>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-left border rounded-lg text-xs cursor-pointer ${
                    paymentMethod === 'card' ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-700' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-stone-700 mb-1" />
                  <span className="font-semibold block text-stone-900">Credit / Debit</span>
                  <span className="text-[10px] text-stone-500">Visa, MC, Amex</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 text-left border rounded-lg text-xs cursor-pointer ${
                    paymentMethod === 'cod' ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-700' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-stone-700 mb-1" />
                  <span className="font-semibold block text-stone-900">Pay on Delivery</span>
                  <span className="text-[10px] text-stone-500">Cash / Card at door</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('digital')}
                  className={`p-3 text-left border rounded-lg text-xs cursor-pointer ${
                    paymentMethod === 'digital' ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-700' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <span className="w-4 h-4 text-stone-700 mb-1 block font-bold">⚡</span>
                  <span className="font-semibold block text-stone-900">Apple / GPay</span>
                  <span className="text-[10px] text-stone-500">Instant One-Click</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded font-mono text-stone-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded font-mono text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        defaultValue="882"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded font-mono text-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-amber-50/60 rounded-lg border border-amber-200 text-xs text-stone-700 space-y-1">
                  <span className="font-semibold text-stone-900 block">Verified Cash on Delivery (COD)</span>
                  <p className="text-[11px] text-stone-600">
                    Pay upon receipt when the courier delivers your package to <strong>{street}, {city}</strong>. You may inspect the package seal prior to payment.
                  </p>
                </div>
              )}

              {paymentMethod === 'digital' && (
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-1">
                  <span className="font-semibold text-stone-900 block">Biometric Digital Wallet</span>
                  <p className="text-[11px] text-stone-600">
                    You will be prompted to authenticate with Touch ID / Face ID upon placing order.
                  </p>
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="p-3 bg-stone-100 rounded text-xs space-y-1 text-stone-600">
                <div className="flex justify-between">
                  <span>Shipping To:</span>
                  <span className="font-medium text-stone-800">{fullName} ({city})</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Count:</span>
                  <span className="font-medium text-stone-800 tabular-nums">{items.reduce((a, b) => a + b.quantity, 0)} playthings</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-stone-200">
                  <span>Final Amount Charged:</span>
                  <span className="tabular-nums font-serif text-sm">${total + (deliverySpeed === 'express' ? 12 : 0)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authorize & Place Order (${total + (deliverySpeed === 'express' ? 12 : 0)})</span>
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold block">
                  Artisanal Order Confirmed
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  Thank You, {confirmedOrder.shippingAddress.fullName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Order <strong className="font-mono text-stone-800">{confirmedOrder.orderNumber}</strong> has been transmitted to our workshop.
                </p>
              </div>

              {/* Courier Tracking Status Bar */}
              <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-lg text-left text-xs space-y-2">
                <div className="flex items-center justify-between text-stone-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-800" />
                    <span className="font-semibold text-stone-900">Shipment Status: Preparing at Workshop</span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-500">Tracking: TRK-9941824</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Estimated Delivery: <strong className="text-stone-800">{confirmedOrder.deliveryEstimate}</strong> to {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}.
                </p>
              </div>

              {/* Order Receipt Breakdown */}
              <div className="border border-stone-200 rounded-lg p-4 text-left text-xs space-y-2">
                <span className="font-serif font-bold text-stone-900 block pb-1 border-b border-stone-100">
                  Receipt Summary ({confirmedOrder.date})
                </span>
                {confirmedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-stone-700 py-0.5">
                    <span>{item.quantity}× {item.product.title}</span>
                    <span className="tabular-nums font-semibold">${item.product.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900">
                  <span>Total Paid:</span>
                  <span className="tabular-nums font-serif text-sm">${confirmedOrder.total}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-stone-900 text-white hover:bg-stone-800 rounded text-xs font-semibold cursor-pointer"
                >
                  Return to Toy Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
