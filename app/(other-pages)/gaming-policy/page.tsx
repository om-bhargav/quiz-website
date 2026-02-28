"use client";
import React from "react";
import { info } from "@/lib/info";

export default function ResponsibleGamingPolicy() {
  return (
    <section className="w-full bg-background text-gray-900 dark:bg-black dark:text-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10 leading-relaxed">

        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Responsible Gaming Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: March 2026
          </p>
        </header>

        {/* Intro */}
        <p>
          <strong>OLOBIX</strong> is committed to promoting responsible gaming
          practices. Our platform offers skill-based quizzes designed for
          entertainment and knowledge enhancement. We encourage users to play
          responsibly and within their limits.
        </p>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Age Restriction
          </h2>
          <p>
            OLOBIX is strictly intended for users aged 18 years
            and above. Users below this age are prohibited from accessing or
            participating in paid quizzes.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. Skill-Based Gameplay
          </h2>
          <p>
            All games on OLOBIX are skill-based. Success
            depends on knowledge, analytical ability, and response time, not on
            chance or luck.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Play Responsibly
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Play for entertainment, not as a source of income.</li>
            <li>Set personal spending and time limits.</li>
            <li>Do not chase losses.</li>
            <li>Take breaks and balance gaming with daily activities.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Self-Exclusion & Account Control
          </h2>
          <p>
            Users who feel they are spending excessive time or money may request
            temporary suspension or permanent closure of their account by
            contacting customer support.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. No Addiction Encouragement
          </h2>
          <p>
            OLOBIX does not promote excessive play or
            guarantee winnings. Any promotional content is intended for
            awareness and engagement only.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Support & Assistance
          </h2>
          <p>
            If you believe gaming is negatively affecting your life, we
            encourage you to seek professional support and limit your usage of
            the platform.
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