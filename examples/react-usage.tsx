/**
 * Example usage of next-typed-routes React components with the new clean structure
 */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createTypedLink, createTypedRouter } from "next-typed-routes/react";

// Import types from the generated barrel file
import type { AppRoute } from "../typed-routes";

// Create typed versions of Link and router
const TypedLink = createTypedLink(Link);
const useTypedRouter = createTypedRouter(useRouter);

// Example component using TypedLink
export function NavigationExample() {
  return (
    <nav>
      <h2>Navigation with TypedLink</h2>
      
      {/* Static routes */}
      <TypedLink href="/">Home</TypedLink>
      <TypedLink href="/about">About</TypedLink>
      
      {/* Dynamic routes with parameters */}
      <TypedLink 
        href="/user/[id]" 
        params={{ id: "123" }}
      >
        User Profile
      </TypedLink>
      
      {/* Dynamic routes with search parameters */}
      <TypedLink 
        href="/user/[id]/posts/[postId]"
        params={{ id: "123", postId: "abc" }}
        search={{ sort: "asc", filter: "recent" }}
      >
        User Post
      </TypedLink>
    </nav>
  );
}

// Example component using useTypedRouter
export function ProgrammaticNavigationExample() {
  const router = useTypedRouter();

  const handleNavigation = () => {
    // Static route navigation
    router.push("/about");
    
    // Dynamic route navigation
    router.push("/user/[id]", { params: { id: "123" } });
    
    // Dynamic route with search params
    router.push("/user/[id]/posts/[postId]", {
      params: { id: "123", postId: "abc" },
      search: { sort: "desc" },
    });
    
    // Replace current route
    router.replace("/user/[id]", { params: { id: "456" } });
    
    // Prefetch route
    router.prefetch("/user/[id]", { params: { id: "123" } });
  };

  return (
    <div>
      <h2>Programmatic Navigation</h2>
      <button onClick={handleNavigation}>
        Navigate Programmatically
      </button>
    </div>
  );
}

// Example showing type safety
export function TypeSafetyExample() {
  const validRoutes: AppRoute[] = [
    "/",
    "/about", 
    "/user/[id]",
    "/user/[id]/posts/[postId]"
  ];

  return (
    <div>
      <h2>Type Safety Example</h2>
      <p>All routes are type-checked at compile time!</p>
      <ul>
        {validRoutes.map((route, index) => (
          <li key={index}>{route}</li>
        ))}
      </ul>
    </div>
  );
}

// Main example component
export default function ReactUsageExample() {
  return (
    <div>
      <h1>Next Typed Routes - React Usage Example</h1>
      <NavigationExample />
      <ProgrammaticNavigationExample />
      <TypeSafetyExample />
    </div>
  );
}
