import Link from "next/link";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

export default function VendorProfilePage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Vendor Profile" subtitle="Basic account information" />
      <AppCard>
        <p className="text-sm text-slate-600">Current test user: <strong>vendor1@shoofly.com</strong></p>
        <p className="mt-2 text-sm text-slate-500">Delivery actions are available from request-specific screens.</p>
        <Link href="/vendor/requests" className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Go To Requests
        </Link>
      </AppCard>
    </div>
  );
}
