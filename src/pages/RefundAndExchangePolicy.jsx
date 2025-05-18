import React from 'react';

export default function RefundExchangePolicy() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl underline font-bold mb-4 text-black text-center">Refund and Exchange Policy</h1>
                <p className="text-gray-600 mb-6">
                    At SM Scents, customer satisfaction is our priority. Please review our refund and exchange policy below.
                </p>
                <ul className="list-disc pl-5 space-y-4 text-gray-700">
                    <li>We accept any product with which you're not satisfied.</li>
                    <li>Return/exchange requests are accepted up to 1 week from the date of order delivery.</li>
                    <li>Products must have at least 90% remaining in the bottle to be eligible for return/exchange.</li>
                    <li>Return/Exchange requests are processed within 3-5 working days.</li>
                    <li>Delivery charges are non-refundable for exchange/return orders.</li>
                    <li>Customers are responsible for delivery charges on exchange orders.</li>
                    <li>Tester Box (Sample Box) is non-refundable, as it is solely for testing purposes.</li>
                    <li>Orders above Rs.10,000 are non-refundable and can only be exchanged.</li>
                    <li>If there is damage, leakage, or a wrong product, we will bear the delivery charges.</li>
                </ul>
                <p className="text-gray-600 mt-6">
                    For any queries, feel free to contact us through our customer support.
                </p>
            </div>
        </div>
    );
};


