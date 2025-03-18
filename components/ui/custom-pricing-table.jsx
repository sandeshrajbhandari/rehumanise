"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Button } from "./button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    price: "$9",
    interval: "month",
    features: [
      "10,000 words per month",
      "Basic writing styles",
      "Standard support",
      "Basic AI detection",
    ],
    priceId: "price_1JuVIiDrScrwd5y9uWvWqFlx", // Using existing price ID from billing.js
  },
  {
    name: "Professional",
    price: "$29",
    interval: "month",
    popular: true,
    features: [
      "50,000 words per month",
      "Advanced writing styles",
      "Priority support",
      "Advanced AI detection",
      "Custom templates",
    ],
    priceId: "price_1R3bWODrScrwd5y9qnR1VgZv", // Using existing price ID from billing.js
  },
  {
    name: "Enterprise",
    price: "Custom",
    interval: "month",
    features: [
      "Unlimited words",
      "All writing styles",
      "Dedicated support",
      "Enterprise AI detection",
      "Custom templates",
      "API access",
    ],
    contactUs: true,
  },
];

const CustomPricingTable = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId) => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-600">Choose the plan that's right for you</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.popular ? "border-2 border-blue-500" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.interval && (
                  <span className="text-gray-600 ml-2">/{plan.interval}</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.contactUs ? (
                <Button
                  onClick={() => (window.location.href = "/contact")}
                  className="w-full"
                  variant="outline"
                >
                  Contact Sales
                </Button>
              ) : (
                <Button
                  onClick={() => handleSubscribe(plan.priceId)}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Subscribe Now"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomPricingTable;
