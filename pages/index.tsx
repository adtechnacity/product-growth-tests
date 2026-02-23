import Link from "next/link";

const experiments: { slug: string; title: string }[] = [
  // Add experiments here: { slug: "experiment-name", title: "Experiment Title" }
];

export default function Home() {
  return (
    <main className="min-h-screen p-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Landing Page Experiments</h1>
      <p className="text-gray-500 mb-8">Each experiment lives at its own URL path.</p>

      {experiments.length === 0 ? (
        <p className="text-gray-400 italic">No experiments yet. Add one under <code className="bg-gray-100 px-1 rounded">pages/</code>.</p>
      ) : (
        <ul className="space-y-3">
          {experiments.map(({ slug, title }) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {title}
              </Link>
              <span className="text-gray-400 text-sm ml-2">/{slug}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
