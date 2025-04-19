
import React from "react";
import MainLayout from "@/components/layout/MainLayout";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-6">Last updated: April 19, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p className="mb-6">
            We collect information you provide directly to us, including name, email address,
            delivery address, and payment information when you create an account or place an order.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">To process and deliver your orders</li>
            <li className="mb-2">To send you order confirmations and updates</li>
            <li className="mb-2">To improve our services and customer experience</li>
            <li className="mb-2">To send you marketing communications (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p className="mb-6">
            We implement appropriate security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact us at
            privacy@freshmart.com
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
