import process from "process";

const apiKey = Deno.env.get("TEST_ENV");
const myImportantVariable = Netlify.env.get("NETLIFY_API_KEY");
const testKey = process.env.TEST_ENV;
// export default () => new Response(`Hello world ${apiKey}`);
const handler = () => new Response(`Hello world ${apiKey} ${myImportantVariable} ${testKey} ${testKey}`);
export default handler;

export const config = { path: "/test" };