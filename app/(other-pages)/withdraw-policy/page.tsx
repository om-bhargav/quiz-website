"use client";
import React from "react";
import { info } from "@/lib/info";

export default function WithdrawalPolicy() {
  return (
    <section className="w-full bg-background text-gray-900 dark:bg-black dark:text-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10 leading-relaxed">

        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Withdrawal Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: March 2026
          </p>
        </header>

        {/* Intro */}
        <p>
          This Withdrawal Policy explains the rules and procedures related to
          withdrawing winnings from <strong>OLOBIX</strong>. By requesting a
          withdrawal, you agree to comply with this policy.
        </p>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Eligibility for Withdrawal
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Only verified users aged 18 years or above may withdraw funds.</li>
            <li>Withdrawals are allowed only from winnings earned through quizzes.</li>
            <li>Wallet balance added by the user is not withdrawable.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. KYC Verification
          </h2>
          <p>
            To comply with legal and regulatory requirements, users may be
            required to complete Know Your Customer (KYC) verification before
            initiating withdrawals.
          </p>
          <p>
            KYC may include PAN details, bank account information, and identity
            verification. Withdrawal requests may be rejected if KYC is
            incomplete or invalid.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Withdrawal Process
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Withdrawal requests must be initiated from the app wallet.</li>
            <li>Approved withdrawals are processed to the user’s verified bank account.</li>
            <li>Once initiated, withdrawal requests cannot be cancelled or reversed.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Processing Time
          </h2>
          <p>
            Withdrawal requests are generally processed within 3–7 business
            days. Delays may occur due to bank processing times or verification
            requirements.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Fraud & Policy Violations
          </h2>
          <p>
            OLOBIX reserves the right to suspend withdrawals or
            withhold winnings in cases of suspected fraud, misuse, or violation
            of platform policies.
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