/**
 * Open Trivia Chat Plugin
 *
 * This Cloudflare Worker provides a proxy plugin for the Open Trivia Database API,
 * an API that serves trivia questions and answers. The plugin exposes an OpenAPI
 * schema and a manifest file for integration with chat platforms and other services.
 *
 */
import manifest from "../manifest.json";
import openApiSchema from "../openapi.json";

interface Category {
  id: number;
  name: string;
}

interface CategoryApiResponse {
  trivia_categories: Category[];
}

// Initialize the category mapping object
let categoryMapping: { [key: number]: string } = {};

// Fetch and populate the category mapping object
(async function () {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const result = (await response.json()) as CategoryApiResponse;
    const categories = result.trivia_categories;
    categories.forEach((category: Category) => {
      categoryMapping[category.id] = category.name;
    });
  } catch (error) {
    console.error("Error fetching category mapping:", error);
  }
})();

/**
 * Handles incoming requests and routes them to the appropriate endpoint.
 * @param {Request} request - The incoming request object.
 * @returns {Response} - The response object.
 */
async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Serve the OpenAPI schema
  if (path === "/openapi.json") {
    return new Response(JSON.stringify(openApiSchema), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Serve the AI plugin manifest
  if (path === "/.well-known/ai-plugin.json") {
    return new Response(JSON.stringify(manifest), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Proxy API requests to the Open Trivia Database API
  if (path.startsWith("/api")) {
    let apiUrl: URL;
    apiUrl = new URL("https://opentdb.com" + path);
    apiUrl.search = url.search;

    try {
      const response = await fetch(apiUrl.toString());
      const result = await response.json();
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response("Error processing request", { status: 500 });
    }
  }

  // Return a 404 response for all other paths
  return new Response("Not found", { status: 404 });
}

export default {
  fetch(request: Request) {
    return handleRequest(request);
  },
};
