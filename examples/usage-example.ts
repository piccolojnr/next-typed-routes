// Example usage of next-typed-routes
// This demonstrates how to use the generated types and route utilities

// Import the AppRoute type from the generated types
import type { AppRoute } from "../src/typed-routes";

// Import the isValidRoute function and route utilities
import { isValidRoute } from "../src/typed-routes";
import { route } from "next-typed-routes/route-helper";

// Example 1: Using route() with static routes
const aboutUrl = route("/about"); // "/about"
console.log(aboutUrl);

// Example 2: Using route() with dynamic routes and parameters
const userUrl = route("/user/[id]", {
    params: { id: "42" },
    search: { sort: "asc" }
}); // "/user/42?sort=asc"
console.log(userUrl);

// Example 3: Using route() with nested dynamic routes
const postUrl = route("/user/[id]/posts/[postId]", {
    params: { id: "42", postId: "abc" }
}); // "/user/42/posts/abc"
console.log(postUrl);

// Example 4: Using isValidRoute() for runtime validation
const examples = {
    userUrl: route("/user/[id]", { params: { id: "123" } }),
    postUrl: route("/user/[id]/posts/[postId]", {
        params: { id: "123", postId: "abc" },
        search: { sort: "desc" }
    }),
    aboutUrl: route("/about"),
    isValid: isValidRoute("/user/123"),
    isInvalid: isValidRoute("/invalid/route")
};

console.log(examples); 