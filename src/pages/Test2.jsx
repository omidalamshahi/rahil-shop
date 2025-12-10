import React, { useState } from 'react';

// Single-file React component for a simple one-item shop page.
// Tailwind CSS classes are used for styling (no import needed in this file).
// Replace placeholders (IMAGE_SRC, PAYMENT_LINK, BUSINESS DETAILS) with your own values.

export default function PaintingShop() {
  const [qty, setQty] = useState(1);
  const priceNet = 500.0; // net price (EUR) — change as needed
  const vatRate = 0.19; // 19% VAT for Germany
  const priceGross = (priceNet * (1 + vatRate)).toFixed(2);
  const totalGross = (priceNet * qty * (1 + vatRate)).toFixed(2);
  const [showLegal, setShowLegal] = useState(false);

  // PAYMENT_LINK option: easiest for no-backend setup.
  // Create a Payment Link via Stripe or your payment provider and paste it here.
  const PAYMENT_LINK = `https://buy.stripe.com/test_eVq00i2HK51t4D051I0sU00`;

  // If you have a backend for creating checkout sessions, change buyNow() to call it.
  function buyNow() {
    if (
      PAYMENT_LINK &&
      PAYMENT_LINK !== 'YOUR_STRIPE_PAYMENT_LINK_OR_OTHER_PAYMENT_URL'
    ) {
      // send customer to the payment link (fastest, no secret keys in frontend)
      window.location.href = PAYMENT_LINK;
      return;
    }

    // Fallback: attempt to call a local API endpoint that creates a Stripe Checkout session.
    // You'll need a backend route that returns { url: 'https://checkout.stripe.com/...' }
    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: {
          id: 'painting-001',
          name: 'Original Painting',
          unit_amount: Math.round(priceNet * 100),
          quantity: qty,
        },
        vat_rate: vatRate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.url) window.location.href = data.url;
        else
          alert(
            'Payment link not configured. Please set PAYMENT_LINK or backend /api/create-checkout-session.'
          );
      })
      .catch(() =>
        alert('Payment failed to start. Check console for details.')
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Image */}
        <div className="p-6 flex flex-col gap-4">
          <div className="rounded-lg overflow-hidden shadow-sm">
            <img
              src="/images/painting.jpg" /* replace with your image path */
              alt="Original painting"
              className="w-full h-[420px] object-cover"
            />
          </div>

          <div className="flex gap-3">
            <img
              src="/images/painting-thumb1.jpg"
              alt="thumb1"
              className="w-20 h-20 object-cover rounded"
            />
            <img
              src="/images/painting-thumb2.jpg"
              alt="thumb2"
              className="w-20 h-20 object-cover rounded"
            />
            <img
              src="/images/painting-thumb3.jpg"
              alt="thumb3"
              className="w-20 h-20 object-cover rounded"
            />
          </div>

          <div className="text-sm text-gray-600 mt-2">
            <strong>Shipping:</strong> Ships worldwide. Shipping costs
            calculated at checkout.
          </div>
        </div>

        {/* Right: Details & Checkout */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              Original Painting — "Morning Light"
            </h1>
            <p className="mt-2 text-gray-600">
              A one-of-a-kind oil on canvas, 60 x 80 cm. Signed by the artist.
            </p>

            <div className="mt-4">
              <div className="flex items-baseline gap-3">
                <div className="text-xl font-medium">
                  €{priceGross}{' '}
                  <span className="text-sm text-gray-500">(incl. VAT)</span>
                </div>
                <div className="text-sm text-gray-500">
                  Net: €{priceNet.toFixed(2)}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <label className="text-sm text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-20 border rounded px-2 py-1"
                />
              </div>

              <div className="mt-4 text-lg">
                <strong>Total: €{totalGross}</strong>
                <div className="text-xs text-gray-500">
                  Includes {Math.round(vatRate * 100)}% VAT
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={buyNow}
                  className="px-5 py-3 rounded-2xl shadow-md font-semibold hover:opacity-95"
                >
                  Buy now
                </button>

                <button
                  onClick={() => alert('Added to wishlist (demo)')}
                  className="px-4 py-3 rounded-2xl border"
                >
                  Add to wishlist
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <strong>Payment:</strong> Card, SEPA, PayPal, and local methods
                supported depending on payment provider.
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <div className="flex items-center justify-between">
              <button onClick={() => setShowLegal(true)} className="underline">
                Legal & privacy
              </button>
              <div>
                Business:{' '}
                <span className="font-medium">Your Name / Your Studio</span>
              </div>
            </div>

            <div className="mt-2">
              Prices include VAT for consumer sales in Germany. Invoice included
              with shipment.
            </div>
          </div>
        </div>
      </div>

      {/* Legal modal */}
      {showLegal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold">
              Impressum & Datenschutzerklärung
            </h2>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div>
                <strong>Impressum (Example)</strong>
                <div>
                  Your Name / Business Name
                  <br />
                  Street Address
                  <br />
                  ZIP City
                  <br />
                  Germany
                </div>
                <div>Contact: email@example.com | +49 123 456789</div>
                <div>VAT ID: DE123456789 (if available)</div>
              </div>

              <div>
                <strong>Datenschutzerklärung (Example)</strong>
                <div>
                  We process personal data to complete orders and communicate
                  with customers. Payment data is handled by the chosen payment
                  provider and is not stored on this site.
                </div>
              </div>

              <div>
                <strong>Widerrufsbelehrung</strong>
                <div>
                  Consumers have a 14-day right of withdrawal for distance
                  sales. For unique original artworks the right of withdrawal
                  may be limited — check German law and consider custom return
                  rules for original art.
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowLegal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
