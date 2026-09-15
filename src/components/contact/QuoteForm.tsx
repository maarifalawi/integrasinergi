import { useRef, useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { commercialContact, office } from "@/data/contacts";

const EMAIL = commercialContact.email;

const serviceOptions = ["Sea Freight", "Air Freight", "Inland"];

type FieldName =
  "nama" | "perusahaan" | "email" | "telepon" | "layanan" | "asal" | "tujuan" | "volume" | "detail";

const labels: Record<FieldName, string> = {
  nama: "Nama Lengkap",
  perusahaan: "Perusahaan",
  email: "Email",
  telepon: "Nomor Telepon",
  layanan: "Jenis Layanan",
  asal: "Pelabuhan atau Kota Asal",
  tujuan: "Pelabuhan atau Kota Tujuan",
  volume: "Perkiraan Volume",
  detail: "Detail Tambahan",
};

const order: FieldName[] = [
  "nama",
  "perusahaan",
  "email",
  "telepon",
  "layanan",
  "asal",
  "tujuan",
  "volume",
  "detail",
];

const required: FieldName[] = [
  "nama",
  "perusahaan",
  "email",
  "telepon",
  "layanan",
  "asal",
  "tujuan",
];

const empty: Record<FieldName, string> = {
  nama: "",
  perusahaan: "",
  email: "",
  telepon: "",
  layanan: "",
  asal: "",
  tujuan: "",
  volume: "",
  detail: "",
};

const inputBase =
  "mt-3 h-[52px] w-full rounded-[var(--radius-input)] border bg-background px-4 text-[17px] text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-foreground/25 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_14%,transparent)]";
const labelClass = "block text-[0.875rem] leading-[1.43] tracking-[-0.016em] text-muted-foreground";
const errorClass =
  "mt-2 text-[0.875rem] leading-[1.43] tracking-[-0.016em] text-[var(--destructive)]";

// The submit button repeats the primary button classes locally because
// components/ui/Button.tsx renders a router Link and is locked.
const submitClass =
  "bg-primary text-primary-foreground inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-[22px] py-[11px] text-[17px] transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 disabled:opacity-60 disabled:hover:translate-y-0";

function buildBody(values: Record<FieldName, string>) {
  const lines = order
    .filter((name) => values[name].trim().length > 0)
    .map((name) => `${labels[name]}: ${values[name].trim()}`);
  return `Permintaan Penawaran\n\n${lines.join("\n")}`;
}

// Sub-768px fallback: the form card stacks above its destination and office address.
export function QuoteForm() {
  const [values, setValues] = useState<Record<FieldName, string>>(empty);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (name: FieldName, value: string) => setValues((prev) => ({ ...prev, [name]: value }));

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    for (const name of required) {
      if (!values[name].trim()) next[name] = "Kolom ini wajib diisi.";
    }
    if (!next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Masukkan alamat email yang valid.";
    }
    if (!next.telepon && values.telepon.replace(/[^0-9]/g, "").length < 9) {
      next.telepon = "Masukkan nomor telepon yang valid.";
    }
    return next;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    const first = order.find((name) => next[name]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setLoading(true);
    window.location.href = mailtoHref();
    setLoading(false);
    setSent(true);
  };

  const mailtoHref = () => {
    const subject = `Permintaan Penawaran - ${values.perusahaan.trim()}`;
    const body = buildBody(values).replace(/\n/g, "\r\n");
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)
      .replace(/%0A/g, "%0D%0A")
      .replace(/%0D%0D/g, "%0D")}`;
  };

  const field = (name: FieldName) => ({
    name,
    id: `q-${name}`,
    value: values[name],
    "aria-invalid": Boolean(errors[name]),
    ...(errors[name] ? { "aria-describedby": `q-${name}-error` } : {}),
    className: `${inputBase} ${errors[name] ? "border-[var(--destructive)]" : "border-border-input"} focus:border-primary-focus`,
  });

  const errorFor = (name: FieldName) =>
    errors[name] ? (
      <p id={`q-${name}-error`} className={errorClass}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <section
      id="penawaran"
      className="bg-parchment scroll-mt-20 px-6 py-16 md:px-10 md:py-[7.5rem]"
    >
      <div className="mx-auto grid max-w-[1200px] items-start gap-16 lg:grid-cols-[58fr_42fr]">
        <Reveal>
          <Card className="p-6 sm:p-8 md:p-10">
            {/* Anchor arrivals land straight on this card, so it introduces itself. */}
            <p className="text-muted-foreground flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase">
              <span aria-hidden className="bg-primary h-px w-8" />
              Formulir Penawaran
            </p>
            <h2 className="text-foreground mt-5 text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
              Detail kargo, rute, dan jadwal Anda.
            </h2>

            <div className="mt-8">
              {sent ? (
                <div>
                  <CheckCircle size={32} weight="regular" color="var(--primary)" />
                  <h3 className="text-foreground mt-6 text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em]">
                    Permintaan Anda siap dikirim.
                  </h3>
                  <p className="text-muted-foreground mt-4 max-w-[520px] text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
                    Aplikasi email Anda terbuka dengan detail kargo yang sudah tersusun. Tekan kirim
                    untuk meneruskan ke tim commercial.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setValues(empty);
                        setErrors({});
                        setSent(false);
                      }}
                      className="text-primary min-h-[44px] text-[1.0625rem] leading-[1.47] tracking-[-0.022em]"
                    >
                      Kirim permintaan lain
                    </button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="q-nama" className={labelClass}>
                          {labels.nama}
                        </label>
                        <input
                          type="text"
                          {...field("nama")}
                          onChange={(e) => set("nama", e.target.value)}
                        />
                        {errorFor("nama")}
                      </div>
                      <div>
                        <label htmlFor="q-perusahaan" className={labelClass}>
                          {labels.perusahaan}
                        </label>
                        <input
                          type="text"
                          {...field("perusahaan")}
                          onChange={(e) => set("perusahaan", e.target.value)}
                        />
                        {errorFor("perusahaan")}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="q-email" className={labelClass}>
                          {labels.email}
                        </label>
                        <input
                          type="email"
                          {...field("email")}
                          onChange={(e) => set("email", e.target.value)}
                        />
                        {errorFor("email")}
                      </div>
                      <div>
                        <label htmlFor="q-telepon" className={labelClass}>
                          {labels.telepon}
                        </label>
                        <input
                          type="tel"
                          {...field("telepon")}
                          onChange={(e) => set("telepon", e.target.value)}
                        />
                        {errorFor("telepon")}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="q-layanan" className={labelClass}>
                        {labels.layanan}
                      </label>
                      <select
                        {...field("layanan")}
                        onChange={(e) => set("layanan", e.target.value)}
                      >
                        <option value="">Pilih layanan</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errorFor("layanan")}
                    </div>

                    <div>
                      <label htmlFor="q-asal" className={labelClass}>
                        {labels.asal}
                      </label>
                      <input
                        type="text"
                        {...field("asal")}
                        onChange={(e) => set("asal", e.target.value)}
                      />
                      {errorFor("asal")}
                    </div>

                    <div>
                      <label htmlFor="q-tujuan" className={labelClass}>
                        {labels.tujuan}
                      </label>
                      <input
                        type="text"
                        {...field("tujuan")}
                        onChange={(e) => set("tujuan", e.target.value)}
                      />
                      {errorFor("tujuan")}
                    </div>

                    <div>
                      <label htmlFor="q-volume" className={labelClass}>
                        {labels.volume}
                      </label>
                      <input
                        type="text"
                        {...field("volume")}
                        aria-describedby="q-volume-help"
                        onChange={(e) => set("volume", e.target.value)}
                      />
                      <p
                        id="q-volume-help"
                        className="text-muted-foreground mt-2 text-[0.875rem] leading-[1.43] tracking-[-0.016em]"
                      >
                        Contoh: 2 x 40HC, atau 12 ton
                      </p>
                    </div>

                    <div>
                      <label htmlFor="q-detail" className={labelClass}>
                        {labels.detail}
                      </label>
                      <textarea
                        rows={4}
                        {...field("detail")}
                        className={`${inputBase} border-border-input focus:border-primary-focus h-auto py-3`}
                        onChange={(e) => set("detail", e.target.value)}
                      />
                    </div>

                    <button type="submit" disabled={loading} className={`mt-1 ${submitClass}`}>
                      {loading ? "Mengirim" : "Minta Penawaran"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </Reveal>

        <aside className="lg:sticky lg:top-24">
          <h2 className="text-foreground text-[1.3125rem] font-semibold">Commercial Dept.</h2>
          <p className="text-muted-foreground mt-4 text-[1rem] leading-relaxed">
            Formulir ini membuka aplikasi email Anda dengan rincian pengiriman yang ditujukan kepada{" "}
            {commercialContact.name}.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-primary mt-4 inline-flex min-h-[44px] items-center break-all text-[0.9375rem] hover:underline"
          >
            {EMAIL}
          </a>
          <div className="border-border mt-8 border-t pt-8">
            <h3 className="text-foreground font-semibold">Kantor</h3>
            <address className="text-muted-foreground mt-3 leading-relaxed not-italic">
              {office.line1}
              <br />
              {office.line2}
            </address>
          </div>
        </aside>
      </div>
    </section>
  );
}
