import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8 text-black underline">Privacy Policy</h1>
      {/* <p className="text-sm text-gray-500 text-center mb-6">Last Updated: [Today's Date]</p> */}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">1. Introduction</h2>
        <p>Welcome to SM Scents. We are dedicated to safeguarding your privacy and protecting your personal data. This policy explains our data collection, usage, and sharing practices when you interact with us online.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">2. Information We Collect</h2>
        <p>We may collect:</p>
        <ul className="list-disc list-inside ml-4">
          <li className='text-black'><strong>Personal Information:</strong> Name, contact details, shipping and billing addresses, and payment information for orders.</li>
          <li className='text-black'><strong>Usage Information:</strong> Details about your interactions with our site, such as pages visited and time spent.</li>
          <li className='text-black'><strong>Cookies and Tracking:</strong> Technologies for analyzing website performance and user experience.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">3. How We Use Your Information</h2>
        <p>We use this information to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Process and ship your orders, and communicate order details.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>Send marketing updates with your consent.</li>
          <li>Improve our website and customer experience.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">4. How We Share Your Information</h2>
        <p>We only share information to:</p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Service Providers:</strong> For order fulfillment, payment processing, and email communications.</li>
          <li><strong>Legal Requirements:</strong> If necessary, to comply with legal requests.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">5. Cookies and Tracking</h2>
        <p>Our site uses cookies for functionality and analytics. You may control cookie preferences via browser settings, but disabling cookies may limit site features.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">6. Data Security</h2>
        <p>We apply security measures to protect your data, though absolute security cannot be guaranteed.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">7. Your Rights</h2>
        <p>If applicable, you may access, modify, or delete your personal information. Contact us to exercise these rights.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">8. Changes to This Policy</h2>
        <p>We may update this policy periodically. Changes will be posted on this page with an updated date.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">9. Contact Us</h2>
        <p>For any questions, please contact us:</p>
        <p><strong>Email:</strong> <a href="mailto:officialsmscents@gmail.com" className="text-blue-500">officialsmscents@gmail.com</a></p>
        <p><strong>Phone:</strong>+92-302-1953486</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
