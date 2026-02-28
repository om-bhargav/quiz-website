"use client";
import React from "react";
import { info } from "@/lib/info";

export default function RefundPolicy() {
  return (
    <section className="w-full bg-background text-gray-900 dark:bg-black dark:text-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10 leading-relaxed">
        
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Refund & Cancellation Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: March 2026
          </p>
        </header>

        {/* Intro */}
        <p>
          This Refund & Cancellation Policy explains how refunds, cancellations,
          and wallet transactions are handled on <strong>OLOBIX</strong>. By
          using our platform and participating in quizzes, you agree to this
          policy. Please read it carefully before adding funds or entering paid
          contests.
        </p>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Wallet Additions
          </h2>
          <p>
            Any amount added to the OLOBIX wallet using payment
            methods such as UPI, cards, or net banking via Razorpay is
            considered final and non-refundable.
          </p>
          <p>
            Once the wallet balance is successfully credited, it cannot be
            withdrawn back to the original payment source.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. Quiz Entry Fees
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Entry fees paid to participate in quizzes are non-refundable once
              the quiz has started.
            </li>
            <li>
              If a quiz is cancelled by OLOBIX due to technical
              issues or administrative reasons, the entry fee will be refunded
              to the user's in-app wallet.
            </li>
            <li>
              No refund will be provided for user disqualification due to rule
              violations or suspicious activity.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Winnings & Withdrawals
          </h2>
          <p>
            Quiz winnings are credited to the user's in-app wallet and can be
            withdrawn subject to successful identity and KYC verification, if
            applicable.
          </p>
          <p>
            Withdrawal requests once initiated cannot be cancelled or reversed.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Failed or Duplicate Transactions
          </h2>
          <p>
            In case of failed or duplicate transactions where the amount is
            debited but not credited to the wallet, the amount will be
            automatically refunded to the original payment method by the bank
            or payment gateway within 5–7 business days.
          </p>
          <p>
            OLOBIX is not responsible for delays caused by
            banks or third-party payment providers.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Fraud & Policy Violations
          </h2>
          <p>
            OLOBIX reserves the right to deny refunds or
            withdrawals if a user is found violating platform rules, engaging
            in fraudulent activity, or attempting to exploit the system.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Policy Changes
          </h2>
          <p>
            This policy may be updated from time to time. Continued use of the
            platform after updates constitutes acceptance of the revised
            policy.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">
            Contact Us
          </h2>
          <p>
            <strong>OLOBIX</strong>
            <br />
            Email: {info.email}
            <br />
            Phone: {info.phone}
            <br />
            Location: {info.address}
          </p>
        </section>

      </div>
    </section>
  );
}