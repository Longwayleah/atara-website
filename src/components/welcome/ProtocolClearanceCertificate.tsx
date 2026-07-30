import {
  formatClearanceDate,
  welcomeOffer,
} from "@/config/welcome";
import { cn } from "@/lib/utils/cn";

type ProtocolClearanceCertificateProps = {
  firstName: string;
  email: string;
  phone: string;
  clearanceId: string;
  copied: boolean;
  onCopy: () => void;
};

export function ProtocolClearanceCertificate({
  firstName,
  email,
  phone,
  clearanceId,
  copied,
  onCopy,
}: ProtocolClearanceCertificateProps) {
  const issuedDate = formatClearanceDate();

  return (
    <div className="protocol-clearance-certificate">
      <div className="protocol-clearance-certificate__header">
        <div>
          <p className="font-body text-[10px] uppercase tracking-[0.32em] text-archon-navy/45">
            {welcomeOffer.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-extrabold tracking-[-0.03em] text-archon-navy">
            {welcomeOffer.certificateTitle}
          </h2>
          <p className="mt-1 font-body text-[10px] uppercase tracking-[0.22em] text-archon-navy/40">
            {welcomeOffer.certificateSubtitle}
          </p>
        </div>

        <div
          className="protocol-clearance-certificate__stamp"
          aria-hidden
        >
          {welcomeOffer.certificateStatus}
        </div>
      </div>

      <dl className="protocol-clearance-certificate__grid">
        <div>
          <dt>Clearance ID</dt>
          <dd>{clearanceId}</dd>
        </div>
        <div>
          <dt>Issued</dt>
          <dd>{issuedDate}</dd>
        </div>
        <div>
          <dt>Age verification</dt>
          <dd>Confirmed 21+</dd>
        </div>
        <div>
          <dt>Intended use</dt>
          <dd>Research / laboratory</dd>
        </div>
        <div>
          <dt>Issued to</dt>
          <dd>{firstName}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd className="truncate">{email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd className="truncate">{phone}</dd>
        </div>
        <div>
          <dt>Benefit</dt>
          <dd>{welcomeOffer.certificateBenefit}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{welcomeOffer.certificateStatus}</dd>
        </div>
      </dl>

      <div className="protocol-clearance-certificate__code">
        <p className="font-body text-[10px] uppercase tracking-[0.28em] text-archon-navy/45">
          Authorization code
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="min-w-0 font-display text-[clamp(1.125rem,4vw,1.75rem)] font-extrabold tracking-[0.06em] text-archon-navy sm:tracking-[0.1em]">
            {welcomeOffer.codeLabel}
          </p>
          <button
            type="button"
            onClick={onCopy}
            className={cn(
              "w-full shrink-0 rounded-full border border-archon-navy/15 px-4 py-2 font-body text-[10px] uppercase tracking-[0.18em] text-archon-navy transition-colors hover:border-archon-navy/35 sm:w-auto",
              copied && "border-archon-navy bg-archon-navy text-white",
            )}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <p className="protocol-clearance-certificate__note">
        {welcomeOffer.checkoutNote}
      </p>
    </div>
  );
}
