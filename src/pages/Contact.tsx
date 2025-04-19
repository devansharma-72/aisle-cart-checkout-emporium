
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a dummy form - would need to implement actual submission logic
    alert("Message sent! (Demo only)");
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6">
              Have a question or feedback? We'd love to hear from you. Fill out the form
              below and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>support@freshmart.com</span>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2">Name</label>
                <Input type="text" placeholder="Your name" />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <Input type="email" placeholder="Your email" />
              </div>
              <div>
                <label className="block mb-2">Message</label>
                <Textarea placeholder="Your message" className="min-h-[150px]" />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
