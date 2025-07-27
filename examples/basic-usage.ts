// Basic usage example for @piccolojnr/next-typed-routes
// This shows the simplest way to use the library

import { route, isValidRoute } from "../typed-routes";

// Simple static route
const homeUrl = route("/");
console.log("Home URL:", homeUrl); // "/"

// Static route with search parameters
const aboutUrl = route("/about", { search: { tab: "info" } });
console.log("About URL:", aboutUrl); // "/about?tab=info"

// Dynamic route with parameters
const userUrl = route("/user/[id]", { params: { id: "123" } });
console.log("User URL:", userUrl); // "/user/123"

// Dynamic route with parameters and search
const userWithSearch = route("/user/[id]", {
    params: { id: "123" },
    search: { sort: "asc", filter: "active" }
});
console.log("User with search:", userWithSearch); // "/user/123?sort=asc&filter=active"

// Nested dynamic routes
const postUrl = route("/user/[id]/posts/[postId]", {
    params: { id: "123", postId: "abc" }
});
console.log("Post URL:", postUrl); // "/user/123/posts/abc"

// Route validation
console.log("Route validation examples:");
console.log(`  /user/123 is valid: ${isValidRoute("/user/123")}`);
console.log(`  /user/123/posts/abc is valid: ${isValidRoute("/user/123/posts/abc")}`);
console.log(`  /invalid/route is valid: ${isValidRoute("/invalid/route")}`);
console.log(`  /about is valid: ${isValidRoute("/about")}`);

// Type safety example
function navigateToUser(userId: string) {
    // This is type-safe - TypeScript will ensure userId is a string
    return route("/user/[id]", { params: { id: userId } });
}

const user1Url = navigateToUser("user-123");
const user2Url = navigateToUser("user-456");

console.log("Type-safe navigation:", { user1Url, user2Url }); 