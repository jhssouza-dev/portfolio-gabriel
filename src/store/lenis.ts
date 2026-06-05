import type Lenis from "lenis";

let _instance: Lenis | null = null;

export function setLenis(instance: Lenis): void {
  _instance = instance;
}

export function getLenis(): Lenis | null {
  return _instance;
}

export function clearLenis(): void {
  _instance = null;
}
