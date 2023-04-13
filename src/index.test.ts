import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return categories", async () => {
		const resp = await worker.fetch("/api_category.php");
		if (resp) {
			const json = await resp.json() as any;
			expect(resp.status).toBe(200);
			expect(json).toHaveProperty("trivia_categories");
			expect(json.trivia_categories.length).toBeGreaterThan(0);
			expect(json.trivia_categories[0]).toHaveProperty("id");
			expect(json.trivia_categories[0]).toHaveProperty("name");
		}
	});

	it("should return trivia questions", async () => {
		const resp = await worker.fetch("/api.php?amount=10");
		if (resp) {
			const json = await resp.json() as any;
			expect(resp.status).toBe(200);
			expect(json).toHaveProperty("response_code", 0);
			expect(json).toHaveProperty("results");
			expect(json.results.length).toBe(10);
			expect(json.results[0]).toHaveProperty("category");
			expect(json.results[0]).toHaveProperty("type");
			expect(json.results[0]).toHaveProperty("difficulty");
			expect(json.results[0]).toHaveProperty("question");
			expect(json.results[0]).toHaveProperty("correct_answer");
			expect(json.results[0]).toHaveProperty("incorrect_answers");
		}
	});

	it("should return a session token", async () => {
		const resp = await worker.fetch("/api_token.php?command=request");
		if (resp) {
			const json = await resp.json();
			expect(resp.status).toBe(200);
			expect(json).toHaveProperty("response_code", 0);
			expect(json).toHaveProperty("token");
		}
	});

	it("should return question count for a specific category", async () => {
		const categoryId = 9; // General Knowledge
		const resp = await worker.fetch(`/api_count.php?category=${categoryId}`);
		if (resp) {
			const json = await resp.json() as any;
			expect(resp.status).toBe(200);
			expect(json).toHaveProperty("category_id", categoryId);
			expect(json).toHaveProperty("category_question_count");
			expect(json.category_question_count).toHaveProperty("total_question_count");
			expect(json.category_question_count).toHaveProperty("total_easy_question_count");
			expect(json.category_question_count).toHaveProperty("total_medium_question_count");
			expect(json.category_question_count).toHaveProperty("total_hard_question_count");
		}
	});

	it("should return global question count", async () => {
		const resp = await worker.fetch("/api_count_global.php");
		if (resp) {
			const json = await resp.json() as any;
			expect(resp.status).toBe(200);
			expect(json).toHaveProperty("overall");
			expect(json.overall).toHaveProperty("total_num_of_verified_questions");
			expect(json.overall).toHaveProperty("total_num_of_pending_questions");
			expect(json.overall).toHaveProperty("total_num_of_rejected_questions");
			expect(json.overall).toHaveProperty("total_num_of_questions");
		}
	});
});