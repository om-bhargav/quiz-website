"use client";
import React from "react";
import { info } from "@/lib/info";

export default function TermsAndConditions() {
  return (
    <section className="w-full bg-background text-gray-900 dark:bg-black dark:text-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10 leading-relaxed">

        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: March 2026
          </p>
        </header>

        {/* Intro */}
        <p>
          Welcome to <strong>OLOBIX</strong>. These Terms and Conditions (“Terms”)
          govern your access to and use of the OLOBIX mobile application,
          website, and related services (collectively, the “Platform”).
        </p>

        <p>
          By registering, accessing, or using the Platform, you agree to be
          legally bound by these Terms. If you do not agree, please do not use
          the Platform.
        </p>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Eligibility
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years old to use OLOBIX.</li>
            <li>You must be a resident of India.</li>
            <li>
              You confirm that participation in skill-based games is legal in
              your state or jurisdiction.
            </li>
            <li>
              OLOBIX reserves the right to verify eligibility and
              suspend or terminate accounts found in violation.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. Nature of the Game
          </h2>
          <p>
            OLOBIX offers skill-based quiz games where outcomes
            depend on users’ knowledge, analytical ability, and response time.
          </p>
          <p>
            The Platform does not offer gambling, betting, or games of chance.
            Results are not determined by luck.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Account Registration
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Users must provide accurate, complete, and up-to-date information.
            </li>
            <li>Only one account per user is permitted.</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              OLOBIX may suspend or terminate accounts
              involved in misuse, fraud, or policy violations.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Wallet, Tokens & Payments
          </h2>
          <p>
            Users may add money to their in-app wallet to purchase tokens
            required for participating in paid quizzes.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              All payments are processed securely via third-party payment
              gateways such as Razorpay.
            </li>
            <li>
              OLOBIX does not store card, UPI, or bank
              details.
            </li>
            <li>
              Wallet balances and tokens are non-transferable and
              non-refundable except where required by law.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Winnings & Withdrawals
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Winnings are credited to the user’s in-app wallet.
            </li>
            <li>
              Withdrawals may require successful KYC verification as per
              applicable regulations.
            </li>
            <li>
              OLOBIX reserves the right to delay or
              withhold withdrawals in case of suspected fraud or violations.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Refunds & Cancellations
          </h2>
          <p>
            Entry fees paid for quizzes are non-refundable once the quiz has
            started.
          </p>
          <p>
            In case a quiz is cancelled by OLOBIX due to
            technical issues, the entry fee will be refunded to the user’s
            wallet.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            7. Prohibited Activities
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Using bots, scripts, or automated tools.</li>
            <li>Creating multiple accounts.</li>
            <li>Exploiting bugs or system vulnerabilities.</li>
            <li>Manipulating quiz outcomes.</li>
            <li>Engaging in fraudulent or unlawful activity.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Limitation of Liability
          </h2>
          <p>
            OLOBIX shall not be liable for any indirect,
            incidental, or consequential damages arising from the use of the
            Platform.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            9. Modification of Terms
          </h2>
          <p>
            OLOBIX reserves the right to modify these
            Terms at any time. Continued use of the Platform constitutes
            acceptance of the revised Terms.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            10. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and interpreted in accordance with
            the laws of India.
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