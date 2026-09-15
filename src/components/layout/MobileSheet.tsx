import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { z } from "@/lib/z";
import { salesContact, office, whatsappHref } from "@/data/contacts";

export type NavLink = { label: string; to: string };

export function MobileSheet({
  open,
  onClose,
  links,
  id,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  id: string;
  onLogin: () => void;
}) {
  // While the sheet is up, the page behind it must not scroll on touch.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const hotline = salesContact;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
      className="bg-nav fixed inset-0 flex flex-col lg:hidden"
      style={{ zIndex: z.mobileSheet }}
    >
      <div aria-hidden className="h-[env(safe-area-inset-top)] shrink-0" />
      <div className="flex h-14 shrink-0 items-center justify-between px-6">
        <span className="text-foreground-on-dark text-[19px] font-semibold tracking-[-0.04em]">
          ISLI
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup menu"
          className="text-foreground-on-dark flex h-11 w-11 items-center justify-center"
        >
          <X size={20} />
        </button>
      </div>

      <nav aria-label="Navigasi mobile" className="mt-4 flex flex-col px-6">
        {links.map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onClose}
            className="flex items-center gap-4 border-b border-white/10 py-5"
          >
            <span className="font-mono text-[11px] tracking-[0.08em] text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground-on-dark text-[1.5625rem] leading-[1.19] font-semibold tracking-[-0.012em] transition-colors duration-150 active:text-white/60">
              {link.label}
            </span>
            <ArrowUpRight aria-hidden size={18} className="ml-auto text-white/30" />
          </Link>
        ))}
        <button
          type="button"
          onClick={() => {
            onClose();
            onLogin();
          }}
          className="text-muted-foreground-on-dark flex min-h-[52px] w-fit items-center text-[1.0625rem] leading-[1.47] tracking-[-0.022em] transition-colors duration-150 active:text-white/60"
        >
          Login Internal
        </button>
      </nav>

      {/* Bottom block fills the sheet: conversion exit + fast contacts. */}
      <div className="mt-auto px-6 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Link
          to="/kontak"
          hash="penawaran"
          onClick={onClose}
          className="bg-primary text-primary-foreground flex min-h-[52px] w-full items-center justify-center rounded-full text-[17px] transition-transform duration-[120ms] active:scale-[0.97]"
        >
          Minta Penawaran
        </Link>
        <p className="text-foreground-on-dark mt-6 text-[0.875rem]">Sales Dept. · {hotline.name}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-2">
          <a
            href={`mailto:${hotline.email}`}
            className="text-foreground-on-dark flex min-h-[44px] items-center text-[0.9375rem] leading-[1.43] tracking-[-0.016em]"
            children="Email"
          />
          {hotline.whatsapp && (
            <a
              href={whatsappHref(hotline.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground-on-dark flex min-h-[44px] items-center font-mono text-[0.8125rem] tracking-[0.02em] tabular-nums"
            >
              WhatsApp
            </a>
          )}
          <Link
            to="/kontak"
            hash="tim-kontak"
            onClick={onClose}
            className="text-foreground-on-dark inline-flex min-h-[44px] items-center text-[0.875rem]"
          >
            Semua kontak
          </Link>
        </div>
        <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-white/40 uppercase">
          {office.line1} &middot; {office.line2}
        </p>
      </div>
    </div>
  );
}
