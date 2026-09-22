export function PlaceholderPage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return (
    <main className="flex flex-1 flex-col bg-white px-6 pt-10 pb-10 sm:px-12">
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-2 text-5xl font-semibold tracking-tight text-neutral-950 sm:text-7xl">
        {title}
      </h1>
    </main>
  );
}
