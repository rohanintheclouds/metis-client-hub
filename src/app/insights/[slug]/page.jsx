import InsightPage from "@/components/InsightPage";
import INSIGHTS from "@/data/market-insights.json";

export function generateStaticParams() {
  const slugs = new Set();
  for (const week of Object.values(INSIGHTS.insights || {})) {
    for (const r of week) if (r.slug) slugs.add(r.slug);
  }
  return [...slugs].map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  for (const week of Object.values(INSIGHTS.insights || {})) {
    const hit = week.find((r) => r.slug === params.slug);
    if (hit) return { title: `${hit.title} — Metis Client Hub`, description: hit.summary?.slice(0, 155) };
  }
  return { title: "Market Insight — Metis Client Hub" };
}

export default function Page({ params }) {
  return <InsightPage slug={params.slug} />;
}
