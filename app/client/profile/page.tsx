import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

export default function ClientProfilePage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Profile" subtitle="Client account basics" />
      <AppCard>
        <p className="text-sm text-slate-600">Current test user: <strong>client1@shoofly.com</strong></p>
        <p className="mt-2 text-sm text-slate-500">Temporary auth uses headers and seeded users for now.</p>
      </AppCard>
    </div>
  );
}
