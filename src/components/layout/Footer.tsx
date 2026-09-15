import { Link, useRouterState } from "@tanstack/react-router";
import { legal, office } from "@/data/contacts";
import { ContactList } from "@/components/contact/ContactList";
import { services } from "@/data/services";

// Sub-768px fallback: navigation and department columns stack at px-6.
export function Footer() {
  const isServices = useRouterState({
    select: (state) => state.location.pathname.replace(/\/+$/, "") === "/layanan",
  });

  return (
    <footer className="bg-parchment px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-3">
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

        {!isServices && (
          <div className="md:col-span-3">
            <h2 className="text-foreground text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
              Tim
            </h2>
            <div className="mt-6">
              <ContactList />
            </div>
          </div>
        )}
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
