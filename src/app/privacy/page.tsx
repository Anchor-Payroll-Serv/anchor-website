import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: (
      <>
        <p className="mb-4">We collect the following categories of information when you use Anchor:</p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-ink mb-1">Account &amp; Identity Information</h3>
            <p>When you register, we collect your full name, business email address, phone number, company name, and business registration details. This is required to create and verify your account.</p>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-1">Employee Payroll Data</h3>
            <p>To process payroll on your behalf, we collect employee names, national ID numbers (NRC), mobile money wallet numbers (MTN, Airtel, or Zamtel), employment type, salary and allowance details, tax identification numbers (TPIN), and bank account details where applicable.</p>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-1">Transaction &amp; Financial Records</h3>
            <p>We record all payroll runs, disbursement amounts, payment timestamps, and transaction statuses for every payment processed through the platform. These records form your payroll audit trail.</p>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-1">Usage &amp; Technical Data</h3>
            <p>When you use Anchor, we automatically collect IP addresses, browser type and version, operating system, pages visited, time spent, and session identifiers. This helps us maintain security and improve the platform.</p>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-1">Communications</h3>
            <p>If you contact our support team or submit a form on our website, we retain the content of those communications to help resolve your query.</p>
          </div>
          <div className="rounded-lg border-l-4 border-amber bg-amber-light/30 p-4">
            <p className="text-sm text-ink font-medium">⚠️ Legal Review Required: National ID numbers and financial data are sensitive personal information under Zambian data protection law. Ensure your data handling agreements with payment processors and MNOs cover this data category explicitly.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "how-we-collect",
    title: "2. How We Collect Information",
    content: (
      <>
        <p className="mb-4">We collect information through three main methods:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Directly from you:</strong> When you register, set up your company profile, add employees, run payroll, or contact support.</li>
          <li><strong className="text-ink">Automatically:</strong> Our servers log technical data (IP address, browser, device) each time you access the platform. We also use session cookies to keep you logged in.</li>
          <li><strong className="text-ink">From third parties:</strong> Mobile network operators (MTN, Airtel, Zamtel) may send us transaction confirmation data when a disbursement is processed. This is limited to payment status information.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="mb-4">We use the information we collect specifically to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and maintain your Anchor account and company profile</li>
          <li>Calculate, verify, and process payroll runs on your behalf</li>
          <li>Disburse payments to employees via mobile money networks</li>
          <li>Generate payslips, payroll summaries, and statutory reports (NAPSA, PAYE)</li>
          <li>Verify your identity and prevent fraudulent activity</li>
          <li>Send transactional notifications: payment confirmations, payroll run alerts, and account security messages</li>
          <li>Respond to support requests and resolve disputes</li>
          <li>Comply with Zambian tax, labour, and financial regulations</li>
          <li>Improve platform reliability, identify bugs, and develop new features based on aggregate usage patterns</li>
        </ul>
        <p className="mt-4">We do <strong>not</strong> use your data to serve you third-party advertisements or sell your information to marketing companies.</p>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "4. Legal Basis for Processing",
    content: (
      <>
        <p className="mb-4">We process your personal data on the following legal grounds:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="text-ink">Contract performance:</strong> Most processing is necessary to deliver the payroll service you have contracted with us to provide.</li>
          <li><strong className="text-ink">Legal obligation:</strong> Zambian law requires employers to maintain payroll records, remit PAYE to ZRA, and submit NAPSA contributions. We process data as necessary to help you meet these obligations.</li>
          <li><strong className="text-ink">Legitimate interests:</strong> We process technical and usage data to maintain platform security, detect fraud, and improve the Service. These interests do not override your rights.</li>
          <li><strong className="text-ink">Consent:</strong> Where we send marketing or product update communications, we will ask for your explicit consent and you may withdraw it at any time.</li>
        </ul>
        <div className="mt-4 rounded-lg border-l-4 border-amber bg-amber-light/30 p-4">
          <p className="text-sm text-ink font-medium">⚠️ Legal Review Required: Confirm the legal basis for each processing activity aligns with the Data Protection Act of Zambia and any sector-specific regulations from the Bank of Zambia or Securities &amp; Exchange Commission.</p>
        </div>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "5. Data Sharing and Third Parties",
    content: (
      <>
        <p className="mb-4">We do not sell your personal information. We share data only as necessary to operate the Service:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="text-ink">Mobile Network Operators (MTN, Airtel, Zamtel):</strong> We transmit employee wallet numbers and disbursement amounts to process mobile money payments. MNOs receive only the data required to execute a transfer.</li>
          <li><strong className="text-ink">Cloud infrastructure providers:</strong> Our platform is hosted on cloud infrastructure. These providers have access to data only as data processors acting on our instructions and under data processing agreements.</li>
          <li><strong className="text-ink">Accounting and statutory integrations:</strong> If you connect Anchor to a third-party accounting system, we will share payroll data with that system as directed by you.</li>
          <li><strong className="text-ink">Legal authorities:</strong> We may disclose information when required by a court order, government directive, or applicable Zambian law — including to the Zambia Revenue Authority (ZRA) or NAPSA.</li>
          <li><strong className="text-ink">Business transfers:</strong> If Anchor is acquired or merges with another entity, your data may be transferred as part of that transaction. We will notify you in advance.</li>
        </ul>
      </>
    ),
  },
  {
    id: "international-transfer",
    title: "6. International Data Transfers",
    content: (
      <>
        <p>Your information is primarily processed and stored on servers located within or serving the Republic of Zambia. Where we use cloud service providers with infrastructure outside Zambia, we ensure contractual safeguards are in place to protect your data to a standard equivalent to Zambian data protection requirements.</p>
        <div className="mt-4 rounded-lg border-l-4 border-amber bg-amber-light/30 p-4">
          <p className="text-sm text-ink font-medium">⚠️ Legal Review Required: Confirm that cross-border transfer mechanisms comply with the Data Protection Act of Zambia and identify whether any adequacy decisions or standard contractual clauses apply to your specific cloud provider agreements.</p>
        </div>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: (
      <>
        <p className="mb-4">We retain your data for the following periods:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Account data:</strong> Retained for the duration of your account. Upon account closure, account data is deleted within 90 days unless a longer retention period is required by law.</li>
          <li><strong className="text-ink">Payroll and transaction records:</strong> Retained for a minimum of 7 years in accordance with Zambian tax regulations (Income Tax Act) and NAPSA requirements.</li>
          <li><strong className="text-ink">Employee personal data:</strong> Retained for the period your employees are listed on your payroll, plus 7 years after their final payroll entry for statutory compliance purposes.</li>
          <li><strong className="text-ink">Usage logs:</strong> Technical logs are retained for 12 months for security monitoring purposes, then deleted.</li>
          <li><strong className="text-ink">Support communications:</strong> Retained for 2 years after resolution, or longer if required for ongoing legal matters.</li>
        </ul>
      </>
    ),
  },
  {
    id: "user-rights",
    title: "8. Your Rights",
    content: (
      <>
        <p className="mb-4">You have the following rights regarding your personal information, subject to applicable Zambian law:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="text-ink">Right to access:</strong> You may request a copy of the personal information we hold about you or your employees.</li>
          <li><strong className="text-ink">Right to correction:</strong> You may update inaccurate or incomplete information at any time through your account settings or by contacting us.</li>
          <li><strong className="text-ink">Right to deletion:</strong> You may request that we delete your personal information. Note that statutory retention obligations (7-year payroll records) may prevent full deletion.</li>
          <li><strong className="text-ink">Right to restrict processing:</strong> You may ask us to limit how we use your information in certain circumstances.</li>
          <li><strong className="text-ink">Right to data portability:</strong> You may request an export of your payroll data in a machine-readable format (CSV or JSON).</li>
          <li><strong className="text-ink">Right to withdraw consent:</strong> Where processing is based on consent (e.g., marketing emails), you may withdraw consent at any time without affecting past processing.</li>
        </ul>
        <p className="mt-4">To exercise any of these rights, email <a href="mailto:hello@anchorpay.co.zm" className="text-brand hover:underline">hello@anchorpay.co.zm</a>. We will respond within 30 days.</p>
        <div className="mt-4 rounded-lg border-l-4 border-amber bg-amber-light/30 p-4">
          <p className="text-sm text-ink font-medium">⚠️ Legal Review Required: Verify these rights and response timeframes align with the current Data Protection Act of Zambia and confirm whether a Data Protection Officer (DPO) appointment is required for your scale of processing.</p>
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    title: "9. Cookies and Tracking",
    content: (
      <>
        <p className="mb-4">We use the following types of cookies:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="text-ink">Strictly necessary cookies:</strong> Required to keep you logged in and maintain session security. These cannot be disabled without breaking core functionality.</li>
          <li><strong className="text-ink">Analytics cookies:</strong> We use privacy-respecting analytics to understand which features are used most and where users encounter difficulties. These do not track you across other websites.</li>
          <li><strong className="text-ink">Preference cookies:</strong> Store your account settings (e.g., display language, date format preferences).</li>
        </ul>
        <p className="mt-4">We do <strong>not</strong> use advertising or cross-site tracking cookies. You can manage cookie settings in your browser, but disabling necessary cookies will prevent you from logging in.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "10. Security",
    content: (
      <>
        <p className="mb-4">We implement the following security measures to protect your data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>TLS encryption for all data in transit between your browser and our servers</li>
          <li>Encryption at rest for sensitive data including national ID numbers and financial records</li>
          <li>Role-based access controls so only authorized personnel can access specific data</li>
          <li>Multi-factor authentication available for all user accounts</li>
          <li>Regular security assessments and penetration testing</li>
          <li>Incident response procedures to detect, contain, and notify you of any data breach</li>
        </ul>
        <p className="mt-4">No system is 100% secure. In the event of a data breach that affects your rights or those of your employees, we will notify you as required by law — and in any case within 72 hours of discovery.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "11. Children's Privacy",
    content: (
      <p>The Anchor platform is designed for business use by individuals who are 18 years of age or older. We do not knowingly collect personal information from children under 18. If we learn that we have inadvertently done so, we will delete that information promptly. If you believe a minor's data has been submitted, please contact us immediately.</p>
    ),
  },
  {
    id: "third-party-links",
    title: "12. Third-Party Links",
    content: (
      <p>The Anchor platform may contain links to third-party websites or integrations (such as mobile banking portals or accounting software). This Privacy Policy does not apply to those external services. We encourage you to review the privacy policies of any third-party services you connect to Anchor.</p>
    ),
  },
  {
    id: "policy-changes",
    title: "13. Changes to This Policy",
    content: (
      <>
        <p>We may update this Privacy Policy as our services evolve or as required by law. When we make material changes, we will:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Update the "Last updated" date at the top of this page</li>
          <li>Send a notification to your registered email address at least 14 days before the change takes effect</li>
          <li>Display an in-app banner for logged-in users</li>
        </ul>
        <p className="mt-4">Continued use of the Service after the effective date of the revised policy constitutes your acceptance of the changes.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "14. Contact Us",
    content: (
      <>
        <p className="mb-4">For privacy-related questions, data access requests, or concerns about how we handle your information, please contact:</p>
        <div className="rounded-xl border border-border bg-white p-6 text-sm space-y-1">
          <p className="font-semibold text-ink">Anchor Payroll Services</p>
          <p className="text-ink-muted">Lusaka, Republic of Zambia</p>
          <p className="text-ink-muted">
            Email:{" "}
            <a href="mailto:hello@anchorpay.co.zm" className="text-brand hover:underline">
              hello@anchorpay.co.zm
            </a>
          </p>
          <p className="text-ink-muted">We aim to respond to all privacy requests within 30 days.</p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-brand-deep pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">Legal</p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm">Last updated: April 2026</p>
          <p className="text-white/50 text-xs mt-3 max-w-xl">
            This policy explains exactly what data Anchor collects, why we collect it, who we share it with, and your rights over it. We&apos;ve written it in plain language — no legalese.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-3xl px-5 md:px-8">

          {/* Summary box */}
          <div className="mb-12 rounded-2xl border border-border bg-white p-6 text-sm space-y-3">
            <p className="font-semibold text-ink text-base">Quick summary</p>
            <ul className="space-y-2 text-ink-muted">
              <li className="flex gap-2"><span className="text-brand font-bold">→</span> We collect account info, employee payroll data, transaction records, and basic usage logs.</li>
              <li className="flex gap-2"><span className="text-brand font-bold">→</span> We use this data to run payroll and comply with Zambian law (ZRA, NAPSA). Nothing more.</li>
              <li className="flex gap-2"><span className="text-brand font-bold">→</span> We share data only with MTN/Airtel/Zamtel to process payments and with authorities when legally required.</li>
              <li className="flex gap-2"><span className="text-brand font-bold">→</span> We never sell your data or use it for advertising.</li>
              <li className="flex gap-2"><span className="text-brand font-bold">→</span> Payroll records are kept for 7 years as required by Zambian tax law.</li>
              <li className="flex gap-2"><span className="text-brand font-bold">→</span> You can access, correct, or request deletion of your data by emailing <a href="mailto:hello@anchorpay.co.zm" className="text-brand hover:underline">hello@anchorpay.co.zm</a>.</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="mb-10 rounded-xl border border-amber/40 bg-amber-light/20 p-4 text-sm text-ink-muted">
            <strong className="text-ink">Note:</strong> Sections marked ⚠️ Legal Review Required are placeholders that need review by a qualified data privacy attorney before this policy is published as a legally binding document.
          </div>

          <div className="space-y-12 text-ink-muted leading-relaxed">
            {sections.map((s) => (
              <div key={s.id} id={s.id}>
                <h2 className="font-display text-xl font-bold text-ink mb-4">{s.title}</h2>
                {s.content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
