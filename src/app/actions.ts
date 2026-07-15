"use server";

export type ApplyState = {
  ok: boolean;
  message: string;
};

function required(value: FormDataEntryValue | null, label: string): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`${label} is required.`);
  return text;
}

function optional(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  try {
    const childName = required(formData.get("childName"), "Child's name");
    const childAge = required(formData.get("childAge"), "Child's age");
    const diagnoses = required(formData.get("diagnoses"), "Diagnoses");
    const allergies = optional(formData.get("allergies")) || "None listed";
    const notes = optional(formData.get("notes")) || "None";
    const parentName = required(formData.get("parentName"), "Parent/guardian name");
    const parentPhone = required(formData.get("parentPhone"), "Phone number");
    const parentEmail = optional(formData.get("parentEmail"));
    const emergencyName = required(formData.get("emergencyName"), "Emergency contact name");
    const emergencyPhone = required(formData.get("emergencyPhone"), "Emergency contact phone");
    const emergencyRelation = optional(formData.get("emergencyRelation")) || "Not specified";

    const ageNum = Number(childAge);
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 12) {
      throw new Error("Please select an age from 1 to 12.");
    }

    if (parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
      throw new Error("Please enter a valid email address.");
    }

    const to = process.env.EMAIL_TO?.trim();
    if (!to) {
      throw new Error(
        "Email delivery is not configured yet. Please set EMAIL_TO in .env.local.",
      );
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
      if (process.env.NODE_ENV !== "production") {
        console.log("\n--- Camp Sparkle application (email not configured) ---\n" + text + "\n");
        return {
          ok: true,
          message:
            "Application received! (Dev mode: no RESEND_API_KEY yet, so it was logged to the terminal instead of emailed.)",
        };
      }
      throw new Error(
        "Email delivery is not configured yet. Please set RESEND_API_KEY in .env.local.",
      );
    }

    const from =
      process.env.EMAIL_FROM?.trim() || "Camp Sparkle <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
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

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend error:", res.status, body);
      throw new Error("Could not send the application email. Please try again or call us.");
    }

    return {
      ok: true,
      message: "Thank you! Your application was sent. We’ll be in touch soon.",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return { ok: false, message };
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
