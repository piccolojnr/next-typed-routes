// Example React usage of next-typed-routes
// This demonstrates how to use the typed Link and router components

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Import the typed components
import { createTypedLink, createTypedRouter } from "next-typed-routes/react";

// Create typed versions of Next.js components
const TypedLink = createTypedLink(Link);
const useTypedRouter = createTypedRouter(useRouter);

// Example component using typed navigation
export function NavigationExample() {
    const router = useTypedRouter();

    const handleNavigation = () => {
        // Static route navigation
        router.push("/about");
        
        // Dynamic route navigation
        router.push("/user/[id]", { params: { id: "123" } });
        
        // Dynamic route with search params
        router.push("/user/[id]/posts/[postId]", { 
            params: { id: "123", postId: "abc" },
            search: { sort: "desc" }
        });
    };

    return (
        <nav>
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
            
            {/* Programmatic navigation */}
            <button onClick={handleNavigation}>
                Navigate Programmatically
            </button>
        </nav>
    );
}

// Example of prefetching routes
export function PrefetchExample() {
    const router = useTypedRouter();

    const prefetchRoutes = () => {
        // Prefetch static routes
        router.prefetch("/about");
        
        // Prefetch dynamic routes
        router.prefetch("/user/[id]", { params: { id: "123" } });
    };

    return (
        <div>
            <button onClick={prefetchRoutes}>
                Prefetch Routes
            </button>
        </div>
    );
}

// Example of route replacement
export function ReplaceExample() {
    const router = useTypedRouter();

    const replaceCurrentRoute = () => {
        // Replace current route with a new one
        router.replace("/user/[id]", { params: { id: "456" } });
    };

    return (
        <div>
            <button onClick={replaceCurrentRoute}>
                Replace Current Route
            </button>
        </div>
    );
}
