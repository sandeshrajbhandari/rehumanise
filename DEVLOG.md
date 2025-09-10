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

### 2024-12-03

- start setting up nextauth, prisma, supabase and stripe billing for SaaS features.
- using https://www.youtube.com/watch?v=oNerY9rKHEI&t=588s as reference. check Notion knowledge hub for notes.
- nextauth file locaiton is different for nextjs 13+. - /app/api/auth/[...nextauth]/route.ts
- installed prisma for nextauth adapter - ![Nextauth prisma adapter setup guide](https://authjs.dev/getting-started/adapters/prisma)
- created prisma.js file

```js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

- created schema.prisma file and ran the migration code. had to create a subpabase postgres server and use the DATABASE_URL in .env file. had some issues, was using the wrong port use 5432 instead of 6--- one.

### 2024-12-04

- created user/signin/page.jsx for login with google, faced issue with postgres database connection due to '$' in password. used %24 instead in DATABASE_URL. encoding issue it seems.

### 2025-03-17

- Added subscription plan handling to NextAuth session callback to track user's plan level (free/hobby/pro)
- Added subscription product linking in createCheckoutLink to handle multiple price items
- Updated customer portal return URL to point to /user/dashboard
- Added dashboard link to Header CTA button
- Created new TypeScript route for NextAuth with improved subscription handling
- Setup basic TypeScript config with paths aliases for @/_ and @app/_
- added custom-pricing-table

### 2025-09-02

- Restructured user dashboard and authentication flow
  - layout.js added for /user so that rewrite and other pages can use the sidebar and header.
- Moved rewrite functionality to /user/rewrite/ with improved UI
- Added AI detector page at /user/ai-detector/
- fixed header layout shift, and avatar image not appearing.

### 2025-09-10
- stripe webhook integration
- installed stripe-cli for mock stripe webhook events (brew install stripe/stripe-cli/stripe)
- https://docs.stripe.com/webhooks?snapshot-or-thin=snapshot
  - stripe login
  - stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,checkout.session.completed,payment_intent.payment_failed \
  --forward-to localhost:3000
- see the [cursor_implement_stripe_webhook_for_sub.md](./cursor_implement_stripe_webhook_for_sub.md) file to see the whole guide to set the testing up
  - it creates a fake customer ID with a test email, and then locally triggers different events to see how the webhook handles it in our app.
- this was generated using cursor so there were many errors in the cli commands.
- i've added fixed commands after some trial and errors
- i've tested using already created customerid with my email, instead of fake email, cause then i'd have to manually create db entries for that one.
- currently, subscription creation and updates works
- it also added additional values like price id product id and subscription end dates etc. i've not reviewed the logic, but it seems to be working.
- gonna push the changes and review later down the line with final code.

- Also noticed a bug when trying to sign in again, since user/ routes were all protected by default, user/signin wasn't being rendered, so i relocated to page to /signin route.