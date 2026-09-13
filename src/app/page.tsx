import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col bg-white px-4 pb-4 sm:px-8 sm:pb-8">
      <SiteHeader />
      <main className="flex-1 bg-brand" />
    </div>
  );
}
