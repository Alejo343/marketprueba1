import { useSyncExternalStore } from "react";

// Detecta si el componente está corriendo en el cliente
// sin usar setState dentro de un effect (evita el warning de ESLint)
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
