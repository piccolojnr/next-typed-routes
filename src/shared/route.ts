// ignore import error
import { allRoutes, AppRoute } from "./generated/routes";

// STEP 2: Extract all param-names (e.g. "id", "postId") from a template string
export type ExtractParams<T extends string> =
    T extends `${string}[${infer Param}]${infer Rest}`
    ? Param | ExtractParams<Rest>
    : never;

// STEP 3: Build either an object of `{ [key in ExtractParams<T>]: string }`
//         or `undefined` if there are no params
export type ParamRecord<T extends string> =
    [ExtractParams<T>] extends [never]
    ? undefined
    : { [K in ExtractParams<T>]: string };

export type SearchParams = Record<string, string | number | boolean | undefined>;

// All routes that contain at least one [param]
export type RoutesWithParams =
    Extract<AppRoute, `${string}[${string}]${string}`>;

// All routes that do NOT contain any [param]

export type RoutesWithoutParams = Exclude<AppRoute, RoutesWithParams>;

/**
 * Route utility function to generate URLs from route templates
 * @param template - The route template string
 * @param options - Optional parameters and search query
 * @returns The generated URL string
 */
export function route(
    template: RoutesWithoutParams,
    options?: {
        params?: undefined | ParamRecord<Exclude<AppRoute, RoutesWithParams>>,
        search?: SearchParams
    }
): string;

export function route<T extends RoutesWithParams>(
    template: T,
    options: { params: ParamRecord<T>; search?: SearchParams }
): string;



// STEP 4: route() — if params are provided, interpolate them
export function route<T extends AppRoute>(
    template: T,
    options?: {
        params?: ParamRecord<T>;
        search?: SearchParams;
    }
): string {
    // replace each ${key} with its value
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


/**
 * Validate if a given path matches any of the defined routes
 * @param path - The path to validate
 * @returns true if the path matches a defined route pattern
 */
export function isValidRoute(path: string): boolean {
    return allRoutes.some((template) => {
        const regexStr = "^" + template.replace(/\[.+?\]/g, "[^/]+") + "$";
        return new RegExp(regexStr).test(path);
    });
}


/**
 * Get all available routes
 * @returns Array of all route templates
 */
export function getAllRoutes(): readonly string[] {
    return allRoutes;
}
