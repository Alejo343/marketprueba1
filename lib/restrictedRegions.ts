export const RESTRICTED_REGIONS: string[] = [
  "cigarros-y-vapos",
  "cava-y-licores",
  "sangrias-y-mojito-the-market",
];

// IDs numéricos de las regiones restringidas (47 + hijos, 39 + hijos)
export const RESTRICTED_REGION_IDS = new Set([
  47, 32, 33, 34,           // Cigarros y Vapos + hijos
  39, 17, 18, 19, 21, 22,   // Cava & licores + hijos (parte 1)
  23, 24, 25, 26, 27,       // Cava & licores + hijos (parte 2)
]);
