"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { toast } from "react-hot-toast";
import { Loader2, Coins } from "lucide-react";

type Plan = {
  id: string;
  title: string;
  description: string;
  tokens: number;
  price: number;
};

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/admin/plans");
        const data = await res.json();
        if (data.success) {
          setPlans(data.plans);
        } else {
          toast.error("Failed to load plans");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePurchase = async (plan: Plan) => {
    setProcessingId(plan.id);

    try {
      const orderRes = await fetch("/api/payments/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });
      
      const orderData = await orderRes.json();
      
      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // Step B: Initialize Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is in your .env.local
        amount: orderData.order.amount, // in paise
        currency: orderData.order.currency,
        name: "Your Platform Name",
        description: `Purchase: ${plan.title}`,
        order_id: orderData.order.id, 
        
        handler: async function (response: any) {
          toast.loading("Verifying payment...", { id: "verify" });
          
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              transactionId: orderData.transactionId,
            }),
          });
          
          const verifyData = await verifyRes.json();
          
          if (verifyData.success) {
            toast.success("Payment successful! Tokens added to your wallet.", { id: "verify" });
          } else {
            toast.error(verifyData.message || "Verification failed", { id: "verify" });
          }
        },
        theme: {
          color: "#2563EB", 
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        toast.error(response.error.description || "Payment failed or cancelled");
      });
      
      rzp.open();

    } catch (error: any) {
      toast.error(error.message || "Something went wrong during checkout");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Load Razorpay SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Purchase Tokens</h1>
          <p className="text-gray-500">Select a plan to add tokens to your wallet and enter tournaments.</p>
        </div>

        {plans.length === 0 ? (
          <p className="text-center text-gray-500">No active plans available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                  
                  <div className="flex items-center space-x-2 text-blue-600 font-bold bg-blue-50 w-fit px-3 py-1 rounded-full">
                    <Coins className="w-5 h-5" />
                    <span>{plan.tokens} Tokens</span>
                  </div>
                  
                  <div className="text-3xl font-black text-gray-900">
                    ₹{plan.price}
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={processingId === plan.id}
                  className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-bold transition-all flex justify-center items-center shadow-lg shadow-blue-600/20"
                >
                  {processingId === plan.id ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}