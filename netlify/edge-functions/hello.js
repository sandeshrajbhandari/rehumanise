import process from "process";

const apiKey = Deno.env.get("TEST_ENV");
const myImportantVariable = Netlify.env.get("TEST_ENV");
const testKey = process.env.TEST_ENV;
// export default () => new Response(`Hello world ${apiKey}`);
const handler = () =>
  new Response(
    `Hello world Deno Env:${apiKey} netlify_env=${myImportantVariable} process Env: ${testKey}`
  );
export default handler;

export const config = { path: "/test" };
