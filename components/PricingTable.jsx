"use client";

import { useEffect } from "react";

const PricingTable = () => {
  console.log(process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <stripe-pricing-table
        pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        // client-reference-id="user_123"
        // customer-email=""
        // theme="light"
        // fonts='{"google": "Inter"}'
      ></stripe-pricing-table>
    </div>
  );
};

export default PricingTable;
