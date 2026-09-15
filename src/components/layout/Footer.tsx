import { Link } from "@tanstack/react-router";
import { contacts, legal, office } from "@/data/contacts";
import { services } from "@/data/services";

// Sub-768px fallback: the four columns collapse to a single column at px-6.
export function Footer() {
  return (
    <footer className="bg-parchment px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-foreground text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
            Perusahaan
          </h2>
          <ul className="text-muted-foreground mt-4 text-[1.0625rem] leading-[2.0]">
            <li>
              <Link
                to="/tentang-kami"
                className="transition-colors duration-150 hover:text-foreground"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to="/layanan" className="transition-colors duration-150 hover:text-foreground">
                Layanan
              </Link>
            </li>
            <li>
              <Link to="/kontak" className="transition-colors duration-150 hover:text-foreground">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-foreground text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
            Layanan
          </h2>
          <ul className="text-muted-foreground mt-4 text-[1.0625rem] leading-[2.0]">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to="/layanan"
                  hash={service.slug}
                  className="transition-colors duration-150 hover:text-foreground"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-foreground text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
            Kantor
          </h2>
          <address className="text-muted-foreground mt-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em] not-italic">
            {office.line1}
            <br />
            {office.line2}
          </address>
        </div>

        <div>
          <h2 className="text-foreground text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
            Tim
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {contacts.map((contact) => (
              <li key={contact.email}>
                <p className="text-foreground text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                  {contact.name}
                </p>
                <p className="text-muted-foreground text-[0.875rem] leading-[1.43] tracking-[-0.016em]">
                  {contact.role}
                </p>
                <a
                  href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                  className="text-muted-foreground font-mono text-[0.8125rem] tracking-[0.02em] tabular-nums transition-colors duration-150 hover:text-foreground"
                >
                  {contact.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border mx-auto mt-16 max-w-[1200px] border-t pt-6">
        <p className="text-muted-foreground text-[0.75rem] leading-[1.3] tracking-[-0.01em]">
          {legal.company}
        </p>
        <p className="text-muted-foreground mt-2 text-[0.75rem] leading-[1.3] tracking-[-0.01em]">
          {legal.copyright}
        </p>
      </div>
    </footer>
  );
}
