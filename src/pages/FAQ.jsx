import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Moti jewellery?",
      answer: "Moti jewellery refers to jewelry made with pearls (Moti in Hindi). Our pieces feature high-quality freshwater and cultured pearls, handcrafted using traditional techniques passed down through generations."
    },
    {
      question: "Are your products handmade?",
      answer: "Yes, absolutely! Every piece in our collection is 100% handcrafted by skilled artisans. Each bead is carefully selected and threaded by hand, making every piece unique."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! Shipping costs and delivery times vary depending on the destination. We use reliable courier services to ensure your jewellery reaches you safely."
    },
    {
      question: "How do I care for my Moti jewellery?",
      answer: "Keep your Moti jewellery away from perfumes, hairsprays, and chemicals. Wipe with a soft cloth after wearing and store in a fabric-lined jewelry box. Avoid exposing to extreme temperatures."
    },
    {
      question: "Can I customize a piece?",
      answer: "Absolutely! We love creating custom pieces. Contact us with your requirements, and we'll work with you to design something special."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy on unused items in original condition. Custom orders are non-returnable. Contact us within 7 days of receiving your order to initiate a return."
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-playfair font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and more.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;