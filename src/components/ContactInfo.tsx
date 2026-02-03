"use client";

import { ClockIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { CONTACT } from "@/data/contact";
import { useTranslations } from "@/i18n/useTranslations";
import { SocialIcon } from "react-social-icons";

type ContactInfoProps = {
  className?: string;
  center?: boolean;
};

export function ContactInfo({ className, center = false }: ContactInfoProps) {
  const t = useTranslations();

  return (
    <div
      className={[
        "flex flex-col text-sm",
        center ? "items-center text-center" : "items-start text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-4 w-4 text-[var(--primary)]" />
          <a
            href={`tel:${CONTACT.phone}`}
            className="underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contactPhone")}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4 text-[var(--primary)]" />
          <span>{t("contactAddress")}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-[var(--primary)]" />
          <span>{t("contactHours")}</span>
        </div>
      </div>

      <div className={`mt-3 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <SocialIcon
          url={CONTACT.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("contactFacebook")}
          className="transition hover:opacity-80"
          style={{ height: 22, width: 22 }}
        />
        <SocialIcon
          url={CONTACT.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("contactLine")}
          className="transition hover:opacity-80"
          style={{ height: 22, width: 22 }}
        />
      </div>
    </div>
  );
}
