import { Reveal } from "@/components/motion/Reveal";
import { contacts, office } from "@/data/contacts";

const linkClass =
  "text-primary text-[0.875rem] leading-[1.43] tracking-[-0.016em] underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:underline hover:decoration-primary/40";

// Sub-768px fallback: this column simply sits below the form, unchanged.
export function ContactList() {
  return (
    <div>
      <div className="divide-border divide-y">
        {contacts.map((contact, index) => (
          <Reveal key={contact.email} delay={index * 0.06}>
            <div className="py-6">
              <p className="text-foreground text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                {contact.name}
              </p>
              <p className="text-muted-foreground mt-1 text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
                {contact.role}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-2">
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                  Telepon
                </a>
                <span aria-hidden="true" className="text-border">
                  &middot;
                </span>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  Email
                </a>
                <span aria-hidden="true" className="text-border">
                  &middot;
                </span>
                <a
                  href={`https://wa.me/${contact.waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="border-border mt-8 border-t pt-8">
        <p className="text-muted-foreground text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
          {office.line1}
        </p>
        <p className="text-muted-foreground text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
          {office.line2}
        </p>
      </div>
    </div>
  );
}
