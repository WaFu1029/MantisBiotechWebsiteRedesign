export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="flex flex-1 flex-col justify-end bg-brand p-6 sm:p-12">
      <p className="text-sm font-medium tracking-wide text-white/70 uppercase">
        Coming soon
      </p>
      <h1 className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-7xl">
        {title}
      </h1>
    </main>
  );
}
