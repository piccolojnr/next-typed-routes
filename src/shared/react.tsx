/**
 * src/react.ts
 *
 * Provides type-safe React wrappers for Next.js Link and router.
 */
import React from "react";
import { LinkProps } from "next/link";
import { useRouter as nextUseRouter } from "next/navigation";
import type {
  RoutesWithParams,
  RoutesWithoutParams,
  ParamRecord,
  SearchParams,
} from "./route";
import { route } from "./route";

/**
 * createTypedLink: Wrap Next.js Link with route interpolation and type-safety.
 */
export function createTypedLink<CompProps extends LinkProps>(
  Component: React.ComponentType<CompProps>
) {
  type BaseProps<T extends string> = {
    href: T;
    children: React.ReactNode;
  };

  type StaticLinkProps<T extends RoutesWithoutParams> = BaseProps<T> & {
    params?: undefined;
    search?: SearchParams;
  };

  type DynamicLinkProps<T extends RoutesWithParams> = BaseProps<T> & {
    params: ParamRecord<T>;
    search?: SearchParams;
  };

  return function TypedLink<T extends string>(
    props: T extends RoutesWithParams
      ? DynamicLinkProps<T>
      : StaticLinkProps<T & RoutesWithoutParams>
  ) {
    // At runtime, construct final URL
    const final = route(
      props.href as any,
      "params" in props && props.params
        ? { params: props.params, search: props.search }
        : { search: props.search }
    );

    // Spread LinkProps except `href`
    const { children, params, search, href, ...rest } = props as any;
    return (
      <Component {...(rest as CompProps)} href={final}>
        {children}
      </Component>
    );
  };
}

/**
 * createTypedRouter: Wrap Next.js App Router to enforce typed navigation.
 */
export function createTypedRouter(useRouter = nextUseRouter) {
  return function useTypedRouter() {
    const router = useRouter();

    function push<T extends string>(
      href: T,
      options?: T extends RoutesWithParams
        ? { params: ParamRecord<T>; search?: SearchParams }
        : { search?: SearchParams }
    ) {
      const final = route(href as any, options as any);
      router.push(final);
    }

    function replace<T extends string>(
      href: T,
      options?: T extends RoutesWithParams
        ? { params: ParamRecord<T>; search?: SearchParams }
        : { search?: SearchParams }
    ) {
      const final = route(href as any, options as any);
      router.replace(final);
    }

    function prefetch<T extends string>(
      href: T,
      options?: T extends RoutesWithParams
        ? { params: ParamRecord<T>; search?: SearchParams }
        : { search?: SearchParams }
    ) {
      const final = route(href as any, options as any);
      router.prefetch(final);
    }

    return { push, replace, prefetch };
  };
}

// useTypedRouter hook
export const useTypedRouter = createTypedRouter(nextUseRouter);
