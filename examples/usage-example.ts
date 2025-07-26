// Example usage of next-typed-routes with the new clean structure
// This demonstrates how to use the generated types and utilities

// Import everything from the generated barrel file
import { route, isValidRoute, AppRoute, allRoutes, getAllRoutes } from "../typed-routes";

// Example 1: Using route() with static routes
const aboutUrl = route("/about"); // "/about"
console.log("Static route:", aboutUrl);

// Example 2: Using route() with dynamic routes and parameters
const userUrl = route("/user/[id]", {
    params: { id: "42" },
    search: { sort: "asc" }
}); // "/user/42?sort=asc"
console.log("Dynamic route with params:", userUrl);

// Example 3: Using route() with nested dynamic routes
const postUrl = route("/user/[id]/posts/[postId]", {
    params: { id: "42", postId: "abc" }
}); // "/user/42/posts/abc"
console.log("Nested dynamic route:", postUrl);

// Example 4: Using isValidRoute() for runtime validation
console.log("Route validation:");
console.log(`  /user/123 is valid: ${isValidRoute("/user/123")}`);
console.log(`  /invalid/route is valid: ${isValidRoute("/invalid/route")}`);

// Example 5: Using getAllRoutes() to get all available routes
console.log("\nAll available routes:");
getAllRoutes().forEach(route => console.log(`  - ${route}`));

// Example 6: Using allRoutes constant directly
console.log(`\nTotal routes: ${allRoutes.length}`);

// Example 7: Type-safe usage with AppRoute type
const examples: Record<string, string> = {
    userUrl: route("/user/[id]", { params: { id: "123" } }),
    postUrl: route("/user/[id]/posts/[postId]", {
        params: { id: "123", postId: "abc" },
        search: { sort: "desc" }
    }),
    aboutUrl: route("/about"),
};

console.log("\nGenerated URLs:", examples); 