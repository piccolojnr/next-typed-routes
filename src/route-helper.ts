import { ExtractParams, ParamRecord, RoutesWithoutParams, RoutesWithParams, SearchParams } from "./types";

export function route(
  template: RoutesWithoutParams,
  options?: {
    params?: undefined | ParamRecord<RoutesWithoutParams>,
    search?: SearchParams
  }
): string;

// 2) Routes with dynamic segments: params are required
export function route<T extends RoutesWithParams>(
  template: T,
  options: { params: ParamRecord<T>; search?: SearchParams }
): string;

// STEP 4: route() — if params are provided, interpolate them
export function route<T extends string>(
  template: T,
  options?: {
    params?: ParamRecord<T>;
    search?: SearchParams;
  }
): string {
  // replace each [key] with its value
  let result: string = template;
  for (const key in options?.params || {}) {
    const typedKey = key as ExtractParams<T>;
    result = result.replace(
      new RegExp(`\\[${typedKey}\\]`, "g"),
      options!.params![typedKey]
    );
  }
  if (options?.search) {
    const query = new URLSearchParams();
    for (const key in options.search) {
      const value = options.search[key];
      if (value !== undefined) {
        query.set(key, String(value));
      }
    }

    const queryString = query.toString();
    if (queryString) {
      result += `?${queryString}`;
    }
  }

  return result;
}

// Note: isValidRoute function requires the generated types to be available
// Users should import it from their generated typed-routes.d.ts file
export function isValidRoute(path: string): boolean {
  // This is a placeholder implementation
  // In practice, users should import the actual isValidRoute from their generated types
  // or use the route templates from their generated typed-routes.d.ts file
  return true;
}