import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) throw new Error("Missing Google service account credentials.");
  return new JWT({ email, key, scopes: SCOPES });
}

async function appendToSheet(sheetTitle: string, row: Record<string, string>) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error("Missing GOOGLE_SHEET_ID env var.");
  const doc = new GoogleSpreadsheet(sheetId, getAuth());
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetTitle];
  if (!sheet) throw new Error(`Sheet "${sheetTitle}" not found.`);
  await sheet.addRow(row);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ ok: true });
    }

    const { type, ...fields } = body as { type: "contact" | "demo"; [k: string]: string };

    const timestamp = new Date().toISOString();

    if (type === "contact") {
      await appendToSheet("Contact", {
        Timestamp: timestamp,
        Name: fields.name ?? "",
        Email: fields.email ?? "",
        Phone: fields.phone ?? "",
        Message: fields.message ?? "",
      });
    } else if (type === "demo") {
      await appendToSheet("Demo Requests", {
        Timestamp: timestamp,
        "Full Name": fields.fullName ?? "",
        Organization: fields.organization ?? "",
        Email: fields.email ?? "",
        Phone: fields.phone ?? "",
        "Org Type": fields.orgType ?? "",
        "Worker Count": fields.workerCount ?? "",
        "Payroll Type": fields.payrollType ?? "",
        "Payment Channels": fields.paymentChannels ?? "",
        Message: fields.message ?? "",
      });
    } else {
      return NextResponse.json({ error: "Unknown form type." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[submit]", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
