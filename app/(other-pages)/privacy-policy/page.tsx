"use client";
import React from "react";
import {info} from "@/lib/info";

export default function PrivacyPolicy() {
  return (
    <section className="w-full bg-background text-gray-900 dark:bg-black dark:text-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10 leading-relaxed">
        
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: March 2026
          </p>
        </header>

        {/* Intro */}
        <p>
          At <strong>OLOBIX</strong>, we respect your privacy and are committed to
          protecting your personal data. This Privacy Policy explains how we
          collect, use, store, and protect your information when you access or
          use our quiz-based mobile application and related services. By using
          OLOBIX, you agree to the practices described in this policy.
        </p>

        <p>
          If you do not agree with this Privacy Policy, please do not use our
          platform.
        </p>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Information We Collect
          </h2>

          <div>
            <h3 className="font-medium">
              1.1 Personal Information
            </h3>
            <p>
              We may collect personal information such as your name, mobile
              number, email address, date of birth, and other details provided
              during account registration or profile setup.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              1.2 Payment & Wallet Information
            </h3>
            <p>
              When you add money to your wallet or withdraw winnings, payments
              are processed securely through third-party payment gateways such
              as Razorpay. We do not store your card, UPI, or bank details on our
              servers.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              1.3 KYC Information
            </h3>
            <p>
              To comply with legal and regulatory requirements, we may collect
              Know Your Customer (KYC) information such as PAN details, bank
              account information, or identity documents for withdrawal
              verification.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              1.4 Quiz & Usage Data
            </h3>
            <p>
              We collect data related to your quiz participation, scores,
              gameplay history, transaction history, and interactions with the
              app to ensure fair play and improve user experience.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              1.5 Device & Technical Information
            </h3>
            <p>
              We may automatically collect information such as IP address,
              device type, operating system, app version, and usage logs to
              maintain platform security and performance.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To create and manage your user account.</li>
            <li>To enable participation in quizzes and competitions.</li>
            <li>To process wallet transactions and withdrawals.</li>
            <li>To verify identity and prevent fraud.</li>
            <li>To communicate important updates, alerts, and support messages.</li>
            <li>To improve app functionality and user experience.</li>
            <li>To comply with legal, tax, and regulatory obligations.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Information Sharing & Disclosure
          </h2>
          <p>
            We do not sell or rent your personal information. Your data may be
            shared only in the following cases:
          </p>

          <div>
            <h3 className="font-medium">
              3.1 Service Providers
            </h3>
            <p>
              We may share necessary information with trusted third-party
              partners such as payment gateways, cloud service providers, and
              analytics tools strictly for service delivery and platform
              operations.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              3.2 Legal Compliance
            </h3>
            <p>
              Information may be disclosed if required by law, regulation, court
              order, or government authority, or to protect our legal rights.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              3.3 Business Transfers
            </h3>
            <p>
              In case of a merger, acquisition, or restructuring, your data may
              be transferred as part of business assets with appropriate
              safeguards.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Data Security
          </h2>
          <p>
            We implement reasonable administrative, technical, and organizational
            security measures to protect your data. However, no system is
            completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Data Retention
          </h2>
          <p>
            We retain personal data only as long as necessary to fulfill the
            purposes outlined in this policy or as required by applicable laws.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Children’s Privacy
          </h2>
          <p>
            OLOBIX is strictly intended for users aged 18 years and above. We do
            not knowingly collect personal information from minors.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            7. Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy periodically. Continued use of the
            platform after updates constitutes acceptance of the revised policy.
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