import { AppShell } from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell>
      <div className="p-6">
        <div className="rounded-[20px] border border-[#E8EAF0] bg-white p-8 shadow-[0_2px_8px_rgba(20,20,40,0.04)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6C3BFF]">
            Application Shell
          </p>

          <h1 className="mt-2 text-[28px] font-bold tracking-tight text-[#17172A]">
            GMB Legend
          </h1>

          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[#73788A]">
            The application shell is connected. Dashboard and module-specific
            content will be implemented in their respective frontend phases.
          </p>
        </div>
      </div>
    </AppShell>
  );
}