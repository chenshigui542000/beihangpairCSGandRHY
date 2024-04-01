import assert from "assert";
import { add } from "../build/debug.js";
import { bocchiShutUp } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);
console.log("ok");
assert.strictEqual(bocchiShutUp([11, 12, 25, 11], 1, 4), 11);

console.log("ok");

