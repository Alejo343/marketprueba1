const BASE = process.env.NEXT_PUBLIC_API_URL;

export const EXCLUDED_REGION_IDS: number[] = [];

/** Resolves parent IDs + all their children into a flat set of region IDs to exclude. */
async function resolveAllExcludedRegionIds(): Promise<number[]> {
  try {
    const res = await fetch(`${BASE}/regions`, { cache: "no-store" });
    const json = await res.json();
    const allRegions: { id: number; parent_id: number | null }[] = json.data ?? [];
    const excluded = new Set(EXCLUDED_REGION_IDS);
    for (const r of allRegions) {
      if (r.parent_id !== null && excluded.has(r.parent_id)) excluded.add(r.id);
    }
    return Array.from(excluded);
  } catch {
    return EXCLUDED_REGION_IDS;
  }
}

/** Returns a Set of product_ids that belong to any excluded region (parents + children). */
export async function fetchExcludedProductIds(): Promise<Set<number>> {
  const regionIds = await resolveAllExcludedRegionIds();
  const ids = new Set<number>();
  await Promise.all(
    regionIds.map(async (regionId) => {
      try {
        const res = await fetch(`${BASE}/regions/${regionId}/variants?per_page=500`, {
          cache: "no-store",
        });
        const json = await res.json();
        for (const v of json.data ?? []) {
          if (v.product_id) ids.add(v.product_id);
        }
      } catch {}
    }),
  );
  return ids;
}
