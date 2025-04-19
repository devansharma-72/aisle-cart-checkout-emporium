
import React from "react";
import MainLayout from "@/components/layout/MainLayout";

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to FreshMart, your trusted destination for fresh, high-quality groceries delivered right to your doorstep.
          </p>
          <p className="mb-6">
            Founded with a vision to make fresh produce and groceries accessible to everyone, FreshMart has grown from a small local store to a trusted online grocery platform.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            To provide our customers with the freshest, highest-quality groceries while making the shopping experience convenient and enjoyable.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Quality: We source only the best products for our customers</li>
            <li className="mb-2">Freshness: Our products are delivered fresh from trusted suppliers</li>
            <li className="mb-2">Sustainability: We prioritize eco-friendly packaging and practices</li>
            <li className="mb-2">Customer Service: We're dedicated to providing excellent service</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
