import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Legal</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl mb-4">
            Terms of Service
          </h1>
          <p className="text-white/60 text-sm">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="prose prose-slate max-w-none space-y-10 text-ink-muted leading-relaxed">

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Anchor platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">2. Description of Service</h2>
              <p>
                Anchor is a payroll and workforce management platform designed for Zambian businesses. The Service enables employers to calculate payroll, manage employee records, and disburse payments via mobile money networks including MTN, Airtel, and Zamtel. Features and functionality are subject to change at our discretion.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">3. Eligibility</h2>
              <p>
                You must be at least 18 years of age and a legally registered business or individual operating within the Republic of Zambia to use the Service. By using Anchor, you represent and warrant that you meet these eligibility requirements.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">4. Account Registration</h2>
              <p>
                To access most features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information as necessary. You are responsible for safeguarding your account credentials and for all activity that occurs under your account.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">5. Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate any applicable laws or regulations, including those of the Republic of Zambia</li>
                <li>Process payroll for fictitious employees or engage in any form of payroll fraud</li>
                <li>Transmit any malicious code, viruses, or disruptive data</li>
                <li>Attempt to gain unauthorized access to any part of the Service or its related systems</li>
                <li>Reverse-engineer, decompile, or disassemble any part of the Service</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">6. Payment and Fees</h2>
              <p>
                Access to certain features of the Service may require payment of fees. All fees are quoted in Zambian Kwacha (ZMW) unless otherwise stated. Fees are non-refundable except as expressly set forth in these Terms or required by applicable law. We reserve the right to modify our fee structure with reasonable prior notice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">7. Data and Privacy</h2>
              <p>
                Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the collection and use of your data as described in the Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">8. Intellectual Property</h2>
              <p>
                The Service and all content, features, and functionality — including but not limited to software, text, graphics, logos, and icons — are the exclusive property of Anchor Payroll Services and are protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">9. Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components. Use of the Service is at your sole risk.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">10. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Anchor Payroll Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service. Our total liability for any claim arising from your use of the Service shall not exceed the fees paid by you in the three months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">11. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at our discretion, with or without notice, for conduct that we believe violates these Terms or is otherwise harmful to other users, us, or third parties. Upon termination, your right to use the Service will immediately cease.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of Zambia, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Zambia.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the "Last updated" date at the top of this page. Continued use of the Service after such changes constitutes your acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">14. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:hello@anchorpay.co.zm" className="text-brand hover:underline">
                  hello@anchorpay.co.zm
                </a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
