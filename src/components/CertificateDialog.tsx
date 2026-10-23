import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { certificates, profile, type Certificate, type CertificateId } from "@/lib/portfolio-data";

export function CertificateDialog({
  certificate,
  children,
}: {
  certificate: Certificate;
  children: ReactNode;
}) {
  return (
    <Dialog>
      {children}
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-2xl border-border p-5 sm:p-8">
        <DialogHeader className="pr-6 text-left">
          <p className="font-mono text-xs text-primary">{certificate.kind}</p>
          <DialogTitle className="text-xl leading-snug sm:text-2xl">
            {certificate.title}
          </DialogTitle>
          <DialogDescription>{certificate.org}</DialogDescription>
        </DialogHeader>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-xl border border-border bg-white p-2 sm:p-4">
            <img
              src={certificate.preview}
              alt={`${certificate.title} certificate awarded to ${profile.name}`}
              className="max-h-[55dvh] w-full object-contain"
            />
          </div>
          <div className="space-y-6">
            <section aria-label="About this certification" className="space-y-4">
              <h3 className="text-lg font-semibold">About this certification</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{certificate.detail}</p>
              <ul aria-label="Certificate topics" className="flex flex-wrap gap-2">
                {certificate.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                {[
                  { role: "Awarded to", name: profile.name },
                  { role: "Issued by", name: certificate.org },
                  ...(certificate.date ? [{ role: "Year", name: certificate.date }] : []),
                  ...(certificate.issuedOn
                    ? [{ role: "Issued on", name: certificate.issuedOn }]
                    : []),
                  ...(certificate.signatories ?? []),
                ].map(({ role, name }) => (
                  <div key={role}>
                    <dt className="text-muted-foreground">{role}</dt>
                    <dd className="mt-1 font-medium">{name}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <div className="flex flex-wrap gap-3 border-t border-border pt-4 text-sm font-semibold">
              <a
                href={certificate.file}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-4 py-2.5 text-primary-foreground hover:opacity-90"
              >
                Open original {certificate.format} ↗
              </a>
              <a
                href={certificate.file}
                download
                className="rounded-lg border border-border px-4 py-2.5 hover:border-primary hover:text-primary"
              >
                Download certificate ↓
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CertificateButton({ certificateId }: { certificateId: CertificateId }) {
  const certificate = certificates.find((item) => item.id === certificateId);
  if (!certificate) return null;

  return (
    <CertificateDialog certificate={certificate}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-secondary"
          aria-label={`View certificate and details for ${certificate.title}`}
        >
          View certificate & details →
        </button>
      </DialogTrigger>
    </CertificateDialog>
  );
}
