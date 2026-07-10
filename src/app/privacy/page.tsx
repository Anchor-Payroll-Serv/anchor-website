import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { LegalCallout, LegalDoc, LegalList, LegalSection } from "@/components/legal-doc";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Anchor collects, uses, and protects personal data, in line with the Data Protection Act, No. 3 of 2021 of the laws of Zambia.",
};

const linkStyle = { color: "var(--primary)", textDecoration: "underline" };

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy policy"
      lastUpdated="9 July 2026"
      callout={
        <LegalCallout>
          <Icon name="shield-check" size={18} style={{ color: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            The short version: we collect only what payroll needs, we never sell your data, and you can ask us at any time what we hold about
            you. This policy is written to comply with the Data Protection Act, No. 3 of 2021 of the laws of Zambia.
          </p>
        </LegalCallout>
      }
    >
      <LegalSection heading="1. Who we are">
        <p style={{ margin: 0 }}>
          Anchor (Automated Money Solutions) is a payroll and salary-disbursement platform based in Lusaka, Zambia. For the purposes of the
          Data Protection Act, No. 3 of 2021 (&ldquo;the Act&rdquo;), Anchor is a data controller for the information you give us about
          yourself and your business, and a data processor for the personal data of the people you pay through the platform. We are
          registered with the Office of the Data Protection Commissioner as required by the Act.
        </p>
      </LegalSection>

      <LegalSection heading="2. What we collect">
        <p style={{ margin: "0 0 10px" }}>
          We collect only what is needed to run payroll, in line with the Act&apos;s data-minimisation principle:
        </p>
        <LegalList>
          <li>
            <strong>Account information</strong> — your name, business name, phone number, and email address.
          </li>
          <li>
            <strong>Payee information</strong> — the names, mobile money numbers, and pay amounts of the people you add. You are responsible
            for having a lawful basis to share this with us (see section 4).
          </li>
          <li>
            <strong>Transaction records</strong> — wallet top-ups, payroll runs, individual payouts, and their references.
          </li>
          <li>
            <strong>Technical data</strong> — device and log information needed to keep your account secure.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="3. Why we process it">
        <p style={{ margin: "0 0 10px" }}>We process personal data on the lawful bases recognised by the Act:</p>
        <LegalList>
          <li>
            <strong>To perform our contract with you</strong> — running payroll, moving money to your payees, and keeping payment records.
          </li>
          <li>
            <strong>To meet legal obligations</strong> — including record-keeping and anti-money-laundering checks required of payment
            services in Zambia.
          </li>
          <li>
            <strong>With your consent</strong> — for anything beyond the above, such as product updates. You can withdraw consent at any time
            and we will stop.
          </li>
        </LegalList>
        <p style={{ margin: "10px 0 0" }}>We do not sell personal data, and we do not use payee data for marketing.</p>
      </LegalSection>

      <LegalSection heading="4. The people you pay">
        <p style={{ margin: 0 }}>
          When you add employees or workers to Anchor, you confirm that you have informed them and have a lawful basis to share their details
          with us. We process their data only to make and record the payments you instruct, and each payee receives a payment record for money
          sent to them. If a payee contacts us about their data, we will refer the request to you where the Act requires it, or handle it
          directly where we are able to.
        </p>
      </LegalSection>

      <LegalSection heading="5. Who we share it with">
        <p style={{ margin: "0 0 10px" }}>Only where it is necessary to deliver the service:</p>
        <LegalList>
          <li>
            <strong>Mobile network operators</strong> — currently MTN Mobile Money, so payments can reach your payees&apos; wallets.
          </li>
          <li>
            <strong>Regulated payment partners</strong> — the licensed institutions that hold and move wallet funds under Bank of Zambia
            oversight.
          </li>
          <li>
            <strong>Authorities</strong> — where the law requires disclosure, such as under a lawful order.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="6. Where your data lives">
        <p style={{ margin: 0 }}>
          Personal data is stored in Zambia. We do not transfer personal data outside Zambia except as permitted by Part X of the Act — with
          your consent, or subject to safeguards and any approval required from the Data Protection Commissioner. Sensitive personal data is
          not transferred outside Zambia without the data subject&apos;s consent.
        </p>
      </LegalSection>

      <LegalSection heading="7. How long we keep it">
        <p style={{ margin: 0 }}>
          We keep personal data only as long as it is needed for the purpose it was collected, plus the retention period the Act allows, and
          any longer period that payment-services and tax laws require for transaction records. When data is no longer needed, we delete or
          anonymise it.
        </p>
      </LegalSection>

      <LegalSection heading="8. Your rights">
        <p style={{ margin: "0 0 10px" }}>Under the Act, you and your payees have the right to:</p>
        <LegalList>
          <li>be informed about how personal data is collected and used;</li>
          <li>access the personal data we hold;</li>
          <li>have inaccurate or incomplete data corrected;</li>
          <li>request erasure, subject to the records we must keep by law;</li>
          <li>object to, or restrict, certain processing;</li>
          <li>receive data in a portable format; and</li>
          <li>withdraw consent at any time, without affecting processing already done.</li>
        </LegalList>
        <p style={{ margin: "10px 0 0" }}>
          To exercise any of these rights, contact us and we will respond within the timelines the Act prescribes.
        </p>
      </LegalSection>

      <LegalSection heading="9. Security and breaches">
        <p style={{ margin: 0 }}>
          We protect personal data with appropriate technical and organisational measures, consistent with the Act, the Electronic
          Communications and Transactions Act, No. 4 of 2021, and the Cyber Security and Cyber Crimes Act, No. 2 of 2021. If a breach puts
          your rights at risk, we will notify the Data Protection Commissioner and affected people as the Act requires.
        </p>
      </LegalSection>

      <LegalSection heading="10. Complaints">
        <p style={{ margin: 0 }}>
          If you are unhappy with how we handle your data, please contact us first — we take this seriously and will respond quickly. You also
          have the right to lodge a complaint with the Office of the Data Protection Commissioner in Zambia.
        </p>
      </LegalSection>

      <LegalSection heading="11. Changes and contact">
        <p style={{ margin: 0 }}>
          If we change this policy, we will post the new version here with a new date, and tell you about material changes before they take
          effect. Questions or requests: reach us through the{" "}
          <Link href="/get-started" style={linkStyle}>
            contact page
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
