import Link from "next/link";

type MetaMenuProps = {
  title: string;
  links: { label: string; href: string }[];
};

const MetaMenu = ({ title, links }: MetaMenuProps) => {
  return (
    <div>
      <h4 className="font-nunito font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 font-nunito-sans text-background/80">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-background transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetaMenu;
