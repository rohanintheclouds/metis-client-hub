import ClientDetail from "@/components/ClientDetail";
import { CLIENTS } from "@/lib/clients";

export function generateStaticParams() {
  return CLIENTS.map((c) => ({ id: c.id }));
}

export default function ClientPage({ params }) {
  return <ClientDetail id={params.id} />;
}
