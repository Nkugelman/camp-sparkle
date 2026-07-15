import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT) || 4000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "32kb" }));

function required(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`${label} is required.`);
  return text;
}

function optional(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/apply", async (req, res) => {
  try {
    const body = req.body || {};
    const childName = required(body.childName, "Child's name");
    const childAge = required(body.childAge, "Child's age");
    const diagnoses = required(body.diagnoses, "Diagnoses");
    const allergies = optional(body.allergies) || "None listed";
    const notes = optional(body.notes) || "None";
    const parentName = required(body.parentName, "Parent/guardian name");
    const parentPhone = required(body.parentPhone, "Phone number");
    const parentEmail = optional(body.parentEmail);
    const emergencyName = required(body.emergencyName, "Emergency contact name");
    const emergencyPhone = required(body.emergencyPhone, "Emergency contact phone");
    const emergencyRelation = optional(body.emergencyRelation) || "Not specified";

    const ageNum = Number(childAge);
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 12) {
      throw new Error("Please select an age from 1 to 12.");
    }

    if (parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
      throw new Error("Please enter a valid email address.");
    }

    const to = process.env.EMAIL_TO?.trim();
    if (!to) {
      throw new Error("Email delivery is not configured yet.");
    }

    const subject = `Camp Sparkle application — ${childName}`;
    const text = [
      "New Camp Sparkle application",
      "",
      "CHILD",
      `Name: ${childName}`,
      `Age: ${childAge}`,
      `Diagnoses: ${diagnoses}`,
      `Allergies: ${allergies}`,
      `Notes: ${notes}`,
      "",
      "PARENT / GUARDIAN",
      `Name: ${parentName}`,
      `Phone: ${parentPhone}`,
      `Email: ${parentEmail || "Not provided"}`,
      "",
      "EMERGENCY CONTACT",
      `Name: ${emergencyName}`,
      `Phone: ${emergencyPhone}`,
      `Relationship: ${emergencyRelation}`,
      "",
      `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`,
    ].join("\n");

    const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif;color:#1e3a5f;line-height:1.5">
        <h2 style="margin:0 0 12px">New Camp Sparkle application</h2>
        <h3 style="margin:16px 0 6px;color:#2bbbad">Child</h3>
        <p style="margin:0"><strong>Name:</strong> ${escapeHtml(childName)}<br/>
        <strong>Age:</strong> ${escapeHtml(childAge)}<br/>
        <strong>Diagnoses:</strong> ${escapeHtml(diagnoses)}<br/>
        <strong>Allergies:</strong> ${escapeHtml(allergies)}<br/>
        <strong>Notes:</strong> ${escapeHtml(notes)}</p>
        <h3 style="margin:16px 0 6px;color:#ff8fab">Parent / Guardian</h3>
        <p style="margin:0"><strong>Name:</strong> ${escapeHtml(parentName)}<br/>
        <strong>Phone:</strong> ${escapeHtml(parentPhone)}<br/>
        <strong>Email:</strong> ${escapeHtml(parentEmail || "Not provided")}</p>
        <h3 style="margin:16px 0 6px;color:#f4a261">Emergency contact</h3>
        <p style="margin:0"><strong>Name:</strong> ${escapeHtml(emergencyName)}<br/>
        <strong>Phone:</strong> ${escapeHtml(emergencyPhone)}<br/>
        <strong>Relationship:</strong> ${escapeHtml(emergencyRelation)}</p>
      </div>
    `;

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      throw new Error("Email delivery is not configured yet.");
    }

    const from =
      process.env.EMAIL_FROM?.trim() || "Camp Sparkle <onboarding@resend.dev>";

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(parentEmail ? { reply_to: parentEmail } : {}),
        subject,
        text,
        html,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error("Resend error:", emailRes.status, errBody);
      throw new Error("Could not send the application email. Please try again or call us.");
    }

    res.json({
      ok: true,
      message: "Thank you! Your application was sent. We’ll be in touch soon.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    const status = message.includes("required") || message.includes("valid") || message.includes("age")
      ? 400
      : 500;
    res.status(status).json({ ok: false, message });
  }
});

app.listen(port, () => {
  console.log(`Camp Sparkle API listening on :${port}`);
});
