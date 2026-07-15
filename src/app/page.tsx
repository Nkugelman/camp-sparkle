import { ApplyForm } from "./ApplyForm";
import { BouncingPhoto } from "./BouncingPhoto";

export default function Home() {
  return (
    <div className="relative min-h-full overflow-x-hidden bg-[radial-gradient(circle_at_20%_10%,#ffe08a_0%,transparent_35%),radial-gradient(circle_at_90%_0%,#ffb7c5_0%,transparent_32%),linear-gradient(180deg,#dff6ff_0%,#fff8ef_48%,#ffe9d6_100%)]">
      <BouncingPhoto />
      <span className="star-deco animate-twinkle top-8 left-[8%] text-2xl" aria-hidden>
        ★
      </span>
      <span
        className="star-deco animate-twinkle top-24 right-[12%] text-xl text-coral"
        style={{ animationDelay: "0.6s" }}
        aria-hidden
      >
        ★
      </span>
      <span
        className="star-deco animate-twinkle top-[42%] left-[4%] text-lg text-teal"
        style={{ animationDelay: "1.1s" }}
        aria-hidden
      >
        ★
      </span>

      <main className="relative mx-auto flex w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:py-14">
        <header className="animate-fade-up flex min-h-[min(70vh,36rem)] flex-col items-center justify-center text-center">
          <h1 className="font-display text-5xl leading-none tracking-tight sm:text-7xl lg:text-8xl">
            <span className="text-[#4aa3de]">Camp </span>
            <span className="text-[#ff7a59]">Spar</span>
            <span className="text-[#3ecf7a]">kle</span>
          </h1>
          <p className="mt-4 font-display text-2xl text-ribbon sm:text-3xl">
            where every kid shines
          </p>
          <p className="mx-auto mt-4 max-w-lg text-base text-ink/80 sm:text-lg">
            A special-needs day camp — a safe place to grow, laugh &amp; shine.
          </p>
          <a
            href="#apply"
            className="mt-8 inline-flex rounded-2xl bg-ribbon px-8 py-3.5 font-display text-lg text-white shadow-[0_6px_0_#1a2f52] transition hover:-translate-y-0.5 hover:bg-[#355890]"
          >
            Apply now ★
          </a>
        </header>

        <section
          className="animate-fade-up border-t border-ribbon/10 py-12 text-center"
          style={{ animationDelay: "0.1s" }}
          aria-labelledby="session-heading"
        >
          <h2 id="session-heading" className="font-display text-3xl text-ribbon sm:text-4xl">
            August 12 – September 1
          </h2>
          <p className="mt-3 text-lg font-semibold text-ink/85">
            10:00 AM – 2:30 PM
          </p>
          <p className="mt-1 text-sm text-ink/65">Optional extended hours available</p>
        </section>

        <section
          className="animate-fade-up grid gap-10 border-t border-ribbon/10 py-12 sm:grid-cols-3 sm:gap-8"
          style={{ animationDelay: "0.18s" }}
          aria-label="What to expect"
        >
          <div>
            <p className="font-display text-xl text-teal">Lunch included</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Kids eat a full lunch with us every day — one less thing to pack.
            </p>
          </div>
          <div>
            <p className="font-display text-xl text-coral">Experienced staff</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Run by experienced teachers and staff who know how to support every child.
            </p>
          </div>
          <div>
            <p className="font-display text-xl text-ribbon">Safe &amp; joyful</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              A caring setting where children can grow, laugh, and shine together.
            </p>
          </div>
        </section>

        <section
          id="apply"
          className="animate-fade-up scroll-mt-8 border-t border-ribbon/10 py-12"
          style={{ animationDelay: "0.26s" }}
        >
          <div className="mx-auto max-w-xl rounded-[2rem] border-4 border-white bg-cream/95 p-6 shadow-[0_18px_40px_rgba(30,58,95,0.14)] sm:p-8">
            <h2 className="font-display text-3xl text-ribbon">Apply now</h2>
            <p className="mt-2 mb-6 text-sm text-ink/75">
              Tell us about your child and how to reach you. We&apos;ll send your application
              straight to camp.
            </p>
            <ApplyForm />
          </div>
        </section>

        <section
          className="animate-fade-up border-t border-ribbon/10 py-12 text-center"
          style={{ animationDelay: "0.34s" }}
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading" className="font-display text-2xl text-ribbon">
            Questions? Call to register &amp; learn more
          </h2>
          <ul className="mt-6 flex flex-col items-center gap-3 text-ink sm:flex-row sm:justify-center sm:gap-10">
            <li>
              <span className="block text-sm font-bold text-ink/70">Leah&apos;la Weber</span>
              <a
                className="font-display text-xl text-teal underline-offset-2 hover:underline"
                href="tel:8452747741"
              >
                (845) 274-7741
              </a>
            </li>
            <li>
              <span className="block text-sm font-bold text-ink/70">Leah Kugelman</span>
              <a
                className="font-display text-xl text-coral underline-offset-2 hover:underline"
                href="tel:8452747213"
              >
                (845) 274-7213
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
