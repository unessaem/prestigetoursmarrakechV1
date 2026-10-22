import site from "../config/site";
import { Facebook, Instagram, TikTok } from "./Icons";

const items = [
  { key: "facebook", label: "Facebook", Icon: Facebook, hover: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" },
  { key: "instagram", label: "Instagram", Icon: Instagram, hover: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent" },
  { key: "tiktok", label: "TikTok", Icon: TikTok, hover: "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black" },
];

export default function SocialLinks({ size = "md", className = "" }) {
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map(({ key, label, Icon, hover }) => {
        const href = site.social[key];
        if (!href) return null;
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            title={label}
            className={`${dim} inline-flex items-center justify-center rounded-full border border-sand-300 bg-white/70 text-sand-800 transition dark:border-white/15 dark:bg-white/5 dark:text-sand-200 ${hover}`}
          >
            <Icon className={icon} />
          </a>
        );
      })}
    </div>
  );
}
