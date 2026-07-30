// Client roster for the Metis Client Hub (UI layer).
// The data itself lives in src/lib/roster.js (pure data, no asset imports,
// so the scrape pipeline can import it from plain Node). This module attaches
// the bundled logo assets for the app.

import { ROSTER } from "./roster.js";

import LogoAflac from "@/assets/logos/aflac.png";
import LogoFordCredit from "@/assets/logos/ford-credit.png";
import LogoLumen from "@/assets/logos/lumen-technologies.png";
import LogoAdp from "@/assets/logos/adp.png";
import LogoUkg from "@/assets/logos/ukg.svg";
import LogoGenerac from "@/assets/logos/generac-power-systems.png";
import LogoNrg from "@/assets/logos/nrg-energy.png";
import LogoRegalRexnord from "@/assets/logos/regal-rexnord.png";
import LogoVulcan from "@/assets/logos/vulcan-materials.svg";
import LogoLoandepot from "@/assets/logos/loandepot.png";
import LogoRockwell from "@/assets/logos/rockwell-automation.png";
import LogoWorkday from "@/assets/logos/workday.png";
import LogoIntuitive from "@/assets/logos/intuitive-surgical.png";

const LOGOS = {
  aflac: LogoAflac,
  "ford-credit": LogoFordCredit,
  "lumen-technologies": LogoLumen,
  adp: LogoAdp,
  ukg: LogoUkg,
  "generac-power-systems": LogoGenerac,
  "nrg-energy": LogoNrg,
  "regal-rexnord": LogoRegalRexnord,
  "vulcan-materials": LogoVulcan,
  loandepot: LogoLoandepot,
  "rockwell-automation": LogoRockwell,
  workday: LogoWorkday,
  "intuitive-surgical": LogoIntuitive,
};

export const CLIENTS = ROSTER.map((c) => (LOGOS[c.id] ? { ...c, logo: LOGOS[c.id] } : c));

export const CLIENTS_BY_ID = Object.fromEntries(CLIENTS.map((c) => [c.id, c]));

export function getClient(id) {
  return CLIENTS_BY_ID[id];
}

export function logoUrl(client) {
  // logo.dev public token-free CDN path; falls back to monogram on error.
  return `https://img.logo.dev/${client.domain}?token=pk_demo&size=200&format=png&retina=true`;
}

export function clearbitUrl(client) {
  return `https://logo.clearbit.com/${client.domain}`;
}
