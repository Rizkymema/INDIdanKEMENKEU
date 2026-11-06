import type { Logo } from "@/data/training";
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from "./Icons";
import LogoSlot from "./LogoSlot";
import type { NavLink } from "./Navbar";

type Props = {
  logo: Logo;
  organizer: string;
  about: string;
  hashtag: string;
  contact: { phone: string; email: string; instagram: string; address: string };
  links: NavLink[];
  copyrightName: string;
  copyrightYear: string;
};

export default function Footer({
  logo,
  organizer,
  about,
  hashtag,
  contact,
  links,
  copyrightName,
  copyrightYear,
}: Props) {
  const igHandle = contact.instagram.replace(/^@/, "").trim();
  const items = [
    contact.phone && {
      icon: PhoneIcon,
      label: "Telepon",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    },
    contact.email && {
      icon: MailIcon,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    igHandle && {
      icon: InstagramIcon,
      label: "Instagram",
      value: `@${igHandle}`,
      href: `https://www.instagram.com/${igHandle}/`,
      external: true,
    },
    contact.address && { icon: MapPinIcon, label: "Alamat", value: contact.address },
  ].filter(Boolean) as {
    icon: typeof PhoneIcon;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }[];

  return (
    <footer id="kontak" aria-labelledby="kontak-title" data-surface="dark" className="bg-brand-charcoal text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-5">
          <LogoSlot logo={logo} variant="wordmark" tone="light" className="h-12 w-32" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">{about}</p>
          <p className="mt-5 text-sm font-bold text-white">{hashtag}</p>
        </div>

        <div className="lg:col-span-4">
          <h2 id="kontak-title" className="eyebrow text-white/60">
            Kontak
          </h2>
          <ul className="mt-5 space-y-4">
            {items.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                <span className="min-w-0">
                  <span className="block text-xs text-white/50">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm font-medium break-words text-white transition-colors hover:text-white/70"
                    >
                      {value}
                      {external ? <span className="sr-only"> (membuka tab baru)</span> : null}
                    </a>
                  ) : (
                    <span className="block text-sm break-words text-white">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Navigasi footer" className="lg:col-span-3">
          <h2 className="eyebrow text-white/60">Navigasi</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {copyrightYear} {copyrightName}. Seluruh hak cipta dilindungi.
          </p>
          <p>{organizer} · Dokumentasi Training of Trainers – DDT Assessor PetroChina</p>
        </div>
      </div>
      <span aria-hidden="true" className="block h-1 bg-brand-red" />
    </footer>
  );
}
