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
    <footer id="kontak" aria-labelledby="kontak-title" className="relative bg-brand-charcoal text-white">
      <span aria-hidden="true" className="flex h-1.5">
        <span className="flex-[3] bg-brand-red" />
        <span className="flex-1 bg-brand-gold" />
      </span>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <LogoSlot logo={logo} className="h-14 w-24" tone="dark" />
            <div>
              <p className="font-heading text-lg font-extrabold uppercase tracking-wider">{logo.name}</p>
              <p className="text-sm text-white/70">{organizer}</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75">{about}</p>
          <p className="mt-6 font-heading text-base font-black tracking-wide text-brand-gold">{hashtag}</p>
        </div>

        <div className="lg:col-span-4">
          <h2 id="kontak-title" className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-brand-gold">
            Kontak
          </h2>
          <ul className="mt-5 space-y-4">
            {items.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-gold ring-1 ring-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-white/60">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="break-words text-sm font-medium text-white transition-colors hover:text-brand-gold"
                    >
                      {value}
                      {external ? <span className="sr-only"> (membuka tab baru)</span> : null}
                    </a>
                  ) : (
                    <span className="block break-words text-sm text-white">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Navigasi footer" className="lg:col-span-3">
          <h2 className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-brand-gold">Navigasi</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm font-medium text-white/80 uppercase tracking-wider transition-colors hover:text-brand-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {copyrightYear} {copyrightName}. Seluruh hak cipta dilindungi.
          </p>
          <p>Dokumentasi Training of Trainers – DDT Assessor PetroChina</p>
        </div>
      </div>
    </footer>
  );
}
