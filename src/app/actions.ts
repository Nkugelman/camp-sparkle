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
    const payload = {
      childName: required(formData.get("childName"), "Child's name"),
      childAge: required(formData.get("childAge"), "Child's age"),
      diagnoses: required(formData.get("diagnoses"), "Diagnoses"),
      allergies: optional(formData.get("allergies")),
      notes: optional(formData.get("notes")),
      parentName: required(formData.get("parentName"), "Parent/guardian name"),
      parentPhone: required(formData.get("parentPhone"), "Phone number"),
      parentEmail: optional(formData.get("parentEmail")),
      emergencyName: required(formData.get("emergencyName"), "Emergency contact name"),
      emergencyPhone: required(formData.get("emergencyPhone"), "Emergency contact phone"),
      emergencyRelation: optional(formData.get("emergencyRelation")),
    };

    const ageNum = Number(payload.childAge);
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 12) {
      throw new Error("Please select an age from 1 to 12.");
    }

    if (
      payload.parentEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.parentEmail)
    ) {
      throw new Error("Please enter a valid email address.");
    }

    const apiUrl = process.env.APPLY_API_URL?.trim().replace(/\/$/, "");
    if (!apiUrl) {
      throw new Error(
        "Apply API is not configured. Set APPLY_API_URL to your Railway backend URL.",
      );
    }

    const res = await fetch(`${apiUrl}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as ApplyState | null;
    if (!data || typeof data.message !== "string") {
      throw new Error("Could not reach the application service. Please try again or call us.");
    }
    return { ok: Boolean(data.ok), message: data.message };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return { ok: false, message };
  }
}
