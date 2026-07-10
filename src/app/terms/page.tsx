import Link from "next/link";
import type { Metadata } from "next";
import { LegalDoc, LegalList, LegalSection } from "@/components/legal-doc";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that govern your use of the Anchor payroll platform and website, under the laws of the Republic of Zambia.",
};

const linkStyle = { color: "var(--primary)", textDecoration: "underline" };

export default function TermsPage() {
  return (
    <LegalDoc title="Terms of service" lastUpdated="9 July 2026">
      <LegalSection heading="1. The agreement">
        <p style={{ margin: 0 }}>
          These terms are a contract between you and Anchor (Automated Money Solutions), Lusaka, Zambia, and govern your use of the Anchor
          platform and website. By creating an account or using the service you accept these terms. Contracts and notices made electronically
          through the platform are valid under the Electronic Communications and Transactions Act, No. 4 of 2021.
        </p>
      </LegalSection>

      <LegalSection heading="2. What Anchor is (and is not)">
        <p style={{ margin: 0 }}>
          Anchor is a payroll platform: a wallet you fund, a list of the people you pay, and disbursements to their mobile money accounts.
          Anchor is not a bank and does not take deposits. Wallet funds are held and moved through licensed payment service providers
          regulated by the Bank of Zambia under the National Payment Systems Act. Mobile money payouts are currently made through MTN Mobile
          Money; other networks will be added and announced on the website.
        </p>
      </LegalSection>

      <LegalSection heading="3. Your account">
        <p style={{ margin: 0 }}>
          You must be at least 18, able to enter a contract, and provide accurate information when registering, including any identification
          we are required by law to collect. You are responsible for keeping your login details safe and for everything done under your
          account. Tell us immediately if you suspect unauthorised access.
        </p>
      </LegalSection>

      <LegalSection heading="4. Your wallet and payments">
        <LegalList>
          <li>Your wallet balance is yours. No payment leaves it without your approval.</li>
          <li>
            You are responsible for the accuracy of payee names, mobile money numbers, and amounts. A payment sent to the number you confirmed
            is a completed payment.
          </li>
          <li>If a payout fails, the money returns to your wallet and you can retry.</li>
          <li>
            You may withdraw your wallet balance back to your own account at any time, subject to our partners&apos; processing times.
          </li>
          <li>We may delay or decline a transaction where the law requires it, including under anti-money-laundering rules.</li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="5. Your responsibilities as an employer">
        <p style={{ margin: 0 }}>
          Anchor moves money and keeps records; it does not make you compliant with employment law. You remain responsible for your
          obligations to the people you pay, including under the Employment Code Act, No. 3 of 2019, and any statutory contributions or taxes
          that apply to you. You also confirm you have a lawful basis to share your payees&apos; personal data with us, as described in our{" "}
          <Link href="/privacy" style={linkStyle}>
            privacy policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="6. Fees">
        <p style={{ margin: 0 }}>
          Anchor is in early access and pricing is being finalised with founding customers. Any fee that applies to a payroll run will always
          be shown to you before you approve the run. We will give you reasonable notice before introducing or changing fees.
        </p>
      </LegalSection>

      <LegalSection heading="7. Acceptable use">
        <p style={{ margin: 0 }}>
          You may not use Anchor for anything unlawful — including money laundering, financing of crime, paying people for illegal work, or
          sending payments to someone without their knowledge in circumstances that suggest fraud. We may suspend an account while we
          investigate suspected misuse, and we cooperate with lawful requests from Zambian authorities.
        </p>
      </LegalSection>

      <LegalSection heading="8. Service availability">
        <p style={{ margin: 0 }}>
          We work to keep Anchor available and reliable, but we depend on mobile networks and payment partners, and — as an early-access
          product — features may change. Where planned maintenance affects you, we will give notice. Your money is not affected by downtime of
          the app: balances and records are preserved.
        </p>
      </LegalSection>

      <LegalSection heading="9. Liability">
        <p style={{ margin: 0 }}>
          Nothing in these terms excludes liability that cannot be excluded under Zambian law, including under the Competition and Consumer
          Protection Act, No. 24 of 2010. Beyond that, our liability is limited to the fees you paid us in the twelve months before the event,
          and we are not liable for indirect losses, or for losses caused by incorrect payee details you confirmed, or by events outside our
          reasonable control.
        </p>
      </LegalSection>

      <LegalSection heading="10. Ending the agreement">
        <p style={{ margin: 0 }}>
          You can close your account at any time; we will return your wallet balance and give you your payment records. We may suspend or
          close an account for breach of these terms, with notice where the law requires it. Sections that by their nature survive (records,
          liability, disputes) continue after closure.
        </p>
      </LegalSection>

      <LegalSection heading="11. Governing law and disputes">
        <p style={{ margin: 0 }}>
          These terms are governed by the laws of the Republic of Zambia. If we have a dispute, talk to us first — most things can be resolved
          directly. Failing that, disputes are subject to the jurisdiction of the courts of Zambia.
        </p>
      </LegalSection>

      <LegalSection heading="12. Changes and contact">
        <p style={{ margin: 0 }}>
          We may update these terms as the product and the law evolve. We will post changes here with a new date and notify you of material
          changes before they take effect. Questions: reach us through the{" "}
          <Link href="/get-started" style={linkStyle}>
            contact page
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
