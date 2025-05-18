import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsAndConditions(){
  return (
    <div className="max-w-3xl mx-auto p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 underline text-black">Terms and Conditions</h1>
      {/* <p className="text-sm text-gray-500 text-center mb-6">Last Updated: [Today's Date]</p> */}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">1. Acceptance of Terms</h2>
        <p>By accessing or using SM Scents, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our site or services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">2. Purchases and Payment</h2>
        <p>All payments are processed securely. By placing an order, you confirm that the payment details provided are accurate, and you authorize us to process the payment for your order.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">3. Product Information</h2>
        <p>We strive to display accurate product descriptions. However, we cannot guarantee that the descriptions or other content are error-free. Please contact us if you have any questions regarding our products.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">4. Returns and Refunds</h2>
        <p>Our return and refund policy applies to all purchases. Please review our <Link to="/refund-and-exchange-policy" className="text-blue-500">Return Policy</Link> for more details.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">5. Intellectual Property</h2>
        <p>All content on SM Scents, including logos, images, and text, is the property of SM Scents and protected by copyright laws. Unauthorized use of this content is prohibited.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">6. User Conduct</h2>
        <p>By using our website, you agree not to engage in any activity that may harm SM Scents, other users, or third parties. Any misuse may result in restricted access to our services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">7. Limitation of Liability</h2>
        <p>SM Scents is not liable for any damages that arise from the use of our site or products. Your use of the website and products is at your own risk.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">8. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our site after any modification constitutes acceptance of the revised terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">9. Contact Us</h2>
        <p>If you have questions about these Terms and Conditions, please reach out to us:</p>
        <p><strong>Email:</strong> <a href="mailto:officialsmscents@gmail.com" className="text-blue-500">officialsmscents@gmail.com</a></p>
        <p><strong>Phone:</strong>+92-302-1953486</p>
      </section>
    </div>
  );
};


