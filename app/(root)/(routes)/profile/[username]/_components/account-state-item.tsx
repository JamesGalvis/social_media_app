import Link from "next/link";

interface AccountStateItemProps {
  value: number | string;
  label: string;
  href: string;
}

export function AccountStateItem({
  value,
  href,
  label,
}: AccountStateItemProps) {
  return (
    <Link href={href} className="max-ms:flex-1">
      <div className="group flex max-ms:flex-col items-center ms:justify-start justify-center ms:text-base text-sm max-ms:space-y-1.5 font-normal text-primary/90 gap-x-2 py-1">
        <strong>{value}</strong>
        <p className="group-hover:underline">{label}</p>
      </div>
    </Link>
  );
}
