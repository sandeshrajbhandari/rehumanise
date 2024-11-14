## shadcn installations

- npx shadcn@latest add navigation-menu - for navigation menu
- npx shadcn@latest add sheet - when clicked opens a right side menu
- npx shadcn@latest add button - for button
- npx shadcn@latest add card
- npx shadcn@latest add alert textarea
<!--
- npx shadcn@latest add input - for input
- npx shadcn@latest add label - for label
- npx shadcn@latest add select - for select
- npx shadcn@latest add textarea - for textarea -->

## netlify functions setup

_failed as transformers.js couldn't download models to local serverless instance_
`npm install netlify-cli -g`
for testing locally.

- https://stackoverflow.com/questions/69351433/i-am-trying-to-host-my-react-website-on-netlify-but-there-is-a-npm-install-error

```
curl -X POST -H "Content-Type: application/json" -d '{"message": "Tell me a joke!"}' localhost:8888/.netlify/functions/rewrite
```

## progress logs

### 2024-11-09

- setup next.js 15, tailwind, shadcn and basic components
- created a basic landing page using [claude](https://claude.ai/chat/bb8da8ab-e51c-46f2-9808-caed73ebb14d) and [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page/tree/main) as reference.
- integrated react three js fiber library to display 3d objects. figuredout a way to get the right zoom and perspective using pov and printing camera position for the right view. output still not good since i don't know how to setup lighting and post-processing.v got to /robotDemo path in the side.
- next TODOs are:
  - setup an API for ai detection that returns a percent.
  - setup a humanizer rewrite service that sends text to gemini with clever prompting and returns a rewritten text.

### 2024-11-14

- setup a rewrite service that sends text to gemini with clever prompting and returns a rewritten text.
- cors setup along with a dynamic api key for security.
- the api key is generated using the current datetime and a secret key.
- the api key is sent in the header as `X-API-Key` along with the datetime value in the body.
- attackers can still browse the .js static bundled files, but its one step more secure since the api key is dynamic.
```
const generateApiKey = (datetime) => {
    return crypto
      .createHash("sha256")
      .update(`${REWRITE_API_INIT_KEY}${datetime}69`)
      .digest("hex");
  };
```
- simple curl requests won't work even if they spoof the origin.
```
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"message": "Tell me a joke!"}' \
  localhost:8888/.netlify/functions/rewrite
```
- this curl request will run. 
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -H "X-API-Key: 123" \
  -d '{"message": "Tell me a joke!", "datetime": "2024-11-14T12:00:00Z"}' \

