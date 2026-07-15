"use client";

import { useActionState } from "react";
import { submitApplication, type ApplyState } from "./actions";

const initial: ApplyState = { ok: false, message: "" };

const fieldClass =
  "mt-1.5 w-full rounded-xl border-2 border-[#b8e4f0] bg-white px-3.5 py-2.5 text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/25";

const labelClass = "block text-sm font-bold text-ink";

export function ApplyForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initial);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <fieldset className="space-y-4">
        <legend className="font-display text-xl text-teal">Child</legend>
        <div>
          <label className={labelClass} htmlFor="childName">
            Full name
          </label>
          <input
            id="childName"
            name="childName"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Child's full name"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="childAge">
            Age
          </label>
          <select id="childAge" name="childAge" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select age
            </option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="diagnoses">
            Diagnoses
          </label>
          <textarea
            id="diagnoses"
            name="diagnoses"
            required
            rows={3}
            className={fieldClass}
            placeholder="List any diagnoses that help us support your child"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="allergies">
            Allergies
          </label>
          <textarea
            id="allergies"
            name="allergies"
            rows={2}
            className={fieldClass}
            placeholder="Food, environmental, or other allergies (or write None)"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className={fieldClass}
            placeholder="Anything else we should know"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl text-coral">Parent / Guardian</legend>
        <div>
          <label className={labelClass} htmlFor="parentName">
            Full name
          </label>
          <input
            id="parentName"
            name="parentName"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your full name"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="parentPhone">
              Phone
            </label>
            <input
              id="parentPhone"
              name="parentPhone"
              type="tel"
              required
              autoComplete="tel"
              className={fieldClass}
              placeholder="(845) 555-0123"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="parentEmail">
              Email <span className="font-normal text-ink/60">(optional)</span>
            </label>
            <input
              id="parentEmail"
              name="parentEmail"
              type="email"
              autoComplete="email"
              className={fieldClass}
              placeholder="you@example.com"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl text-ribbon">Emergency contact</legend>
        <div>
          <label className={labelClass} htmlFor="emergencyName">
            Full name
          </label>
          <input
            id="emergencyName"
            name="emergencyName"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Emergency contact name"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="emergencyPhone">
              Phone
            </label>
            <input
              id="emergencyPhone"
              name="emergencyPhone"
              type="tel"
              required
              autoComplete="tel"
              className={fieldClass}
              placeholder="(845) 555-0123"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="emergencyRelation">
              Relationship <span className="font-normal text-ink/60">(optional)</span>
            </label>
            <input
              id="emergencyRelation"
              name="emergencyRelation"
              className={fieldClass}
              placeholder="e.g. Grandparent, neighbor"
            />
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-ribbon px-6 py-3.5 font-display text-lg text-white shadow-[0_6px_0_#1a2f52] transition hover:-translate-y-0.5 hover:bg-[#355890] disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send application ★"}
      </button>

      {state.message ? (
        <p
          role="status"
          className={`rounded-xl px-4 py-3 text-sm font-semibold ${
            state.ok
              ? "bg-teal/15 text-teal"
              : "border border-coral/40 bg-coral/10 text-[#b4235a]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
