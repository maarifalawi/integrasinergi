import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { contacts, departments, whatsappHref } from "@/data/contacts";

/** The same department directory is shared by Contact, About, and the footer. */
export function ContactList({
  dark = false,
  layout = "columns",
}: {
  dark?: boolean;
  layout?: "columns" | "rows";
}) {
  const heading = dark ? "text-foreground-on-dark" : "text-foreground";
  const muted = dark ? "text-muted-foreground-on-dark" : "text-muted-foreground";
  const link = dark
    ? "text-muted-foreground-on-dark hover:text-foreground-on-dark"
    : "text-muted-foreground hover:text-primary";
  const border = dark ? "border-white/15" : "border-border";
  const rows = layout === "rows";

  return (
    <div className={rows ? `border-b ${border}` : "grid gap-10 lg:grid-cols-3 lg:gap-8"}>
      {departments.map((department) => (
        <section
          key={department}
          aria-label={department}
          className={
            rows
              ? `grid min-w-0 gap-6 border-t py-7 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:py-8 lg:grid-cols-[240px_minmax(0,1fr)] ${border}`
              : "min-w-0"
          }
        >
          <h3
            className={`${muted} ${rows ? "pt-1 font-mono text-[11px] tracking-[0.1em] uppercase" : `border-b ${border} pb-4 text-[0.875rem] font-medium`}`}
          >
            {department}
          </h3>
          <ul className={rows ? "grid min-w-0 gap-6 md:grid-cols-2 md:gap-8" : "mt-5 space-y-6"}>
            {contacts
              .filter((contact) => contact.role === department)
              .map((contact) => (
                <li key={contact.email} className="min-w-0" data-contact={contact.email}>
                  <p
                    className={`${heading} text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]`}
                  >
                    {contact.name}
                  </p>
                  <div className="mt-2 flex flex-col items-start">
                    <a
                      href={`mailto:${contact.email}`}
                      aria-label={`Email ${contact.name}: ${contact.email}`}
                      className={`${link} inline-flex min-h-[44px] max-w-full items-center gap-2.5 rounded-sm text-[0.875rem] underline-offset-4 transition-colors hover:underline`}
                    >
                      <EnvelopeSimple aria-hidden size={18} className="shrink-0" />
                      <span className="min-w-0 break-all">{contact.email}</span>
                    </a>
                    {contact.whatsapp && (
                      <a
                        href={whatsappHref(contact.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${contact.name}: ${contact.whatsapp}`}
                        className={`${link} inline-flex min-h-[44px] max-w-full items-center gap-2.5 rounded-sm text-[0.875rem] underline-offset-4 transition-colors hover:underline`}
                      >
                        <WhatsappLogo aria-hidden size={18} className="shrink-0" />
                        <span className="tabular-nums">{contact.whatsapp}</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
