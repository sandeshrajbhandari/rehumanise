# Implement Stripe webhook for subscription sync
_Exported on 10/09/2025 at 22:19:52 GMT+10 from Cursor (1.3.9)_

---

**User**

I reviewed the auth and billing flow. The NextAuth session callback was calling Stripe on every request to derive plan/hasSub. I’ve added a Stripe webhook and moved those checks to the DB.
What I did:
Added DB fields in prisma/schema.prisma on User:
subscription_status, subscription_product_id, subscription_price_id, subscription_current_period_end, plan (default "free"), hasSub (default false).
Created Stripe webhook handler at app/api/stripe/webhook/route.js:
Verifies signature and handles checkout.session.completed, customer.subscription.created/updated/deleted.
Updates user subscription fields and sets plan and hasSub based on product IDs and status.
Updated NextAuth session callback in app/api/auth/[...nextauth]/route.ts:
Removed live Stripe subscription list calls.
Reads plan and hasSub from DB.
Updated hasSubscription in app/lib/billing.js to query DB instead of Stripe.
Next steps to run:
Ensure env vars are set:
STRIPE_SECRET, STRIPE_WEBHOOK_SECRET, STRIPE_HOBBY_PRODUCT_ID, STRIPE_PRO_PRODUCT_ID, NEXTAUTH_URL.
Run Prisma migration to add new columns:
prisma migrate dev -n add_subscription_fields
Start webhook forwarding (example):
stripe listen --forward-to localhost:3000/api/stripe/webhook
Test by creating a test subscription. The webhook should update User.plan/hasSub, and sessions should now reflect DB values.
Summary:
Implemented a Stripe webhook to sync subscription state into the DB and modified auth/session and helpers to read from DB, eliminating per-request Stripe calls.

submit suitable test event to test the webhook

---

**Cursor**

I'll check how your webhook matches Stripe events to users so I can suggest the exact Stripe CLI test commands and any required metadata. Then I'll provide ready-to-run trigger commands.

I’m going to give you ready-to-run Stripe CLI commands that match how your webhook identifies users (email on checkout.session.completed → sets `stripe_customer_id`, then subsequent subscription events use that `customer`).

### Prereqs
- Terminal in project root, webhook listener running:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
- Ensure envs are set in your shell/session for convenience:
```bash
export EMAIL="you+test@domain.com"
export STRIPE_HOBBY_PRODUCT_ID="$STRIPE_HOBBY_PRODUCT_ID"
export STRIPE_PRO_PRODUCT_ID="$STRIPE_PRO_PRODUCT_ID"
```

### 1) Create a test Customer and attach it to your User via checkout.session.completed
This will cause your webhook to upsert `stripe_customer_id` for the user found by `email`.

```bash
# Create a test customer and capture its ID
# CUST_ID=$(stripe customers create --email "$EMAIL" --name "Webhook Test" -q --jq '.id') 
## the above command fails cause --jq flag is not supported by stripe
## This is the correct command below:
CUST_ID=$(stripe customers create --email "$EMAIL" --name "Webhook Test" | jq -r '.id')

# Fire checkout.session.completed with the same customer and email
stripe trigger checkout.session.completed \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.customer_details.email=$EMAIL" \
  --override "data.object.customer_email=$EMAIL"
```

 stripe trigger checkout.session.completed \   
  --override "checkout_session:customer=$CUST_ID"          


### 2) Simulate an active Hobby subscription
This will set plan/hasSub based on product IDs and status.

```bash
## this didn't work
stripe trigger customer.subscription.created \
  --override "subscription:customer=$CUST_ID" \
  --override "subscription:items.data[0].price.product=Saas Service" \
  --override "subscription:items.data[0].price.id=$STRIPE_HOBBY_PRODUCT_ID" \
  # --override "subscription:status=active" \
  # --override "subscription:current_period_end=$(($(date +%s)+3600))"
```
- this worked
```bash
stripe trigger customer.subscription.created \
  --override "subscription:customer=$CUST_ID" \
  --override "subscription:items[0].price="price_1JuVIiDrScrwd5y9uWvWqFlx"
```
- had to setup a default payment method for the customer from the dashboard, could've passed it as a param as well.


### 3) Simulate an upgrade to Pro
```bash
stripe trigger customer.subscription.updated \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.items.data[0].price.product=$STRIPE_PRO_PRODUCT_ID" \
  --override "data.object.items.data[0].price.id=price_test_pro" \
  --override "data.object.status=active" \
  --override "data.object.current_period_end=$(($(date +%s)+7200))"
```
```bash
stripe trigger customer.subscription.updated \
  --override "subscription:customer=$CUST_ID" \
  --override "subscription:items[0].price=price_1R3bWODrScrwd5y9qnR1VgZv"
```

### 4) Simulate a cancellation
Either updated with canceled status or deleted event—your code handles both.

```bash
# Option A: status change
stripe trigger customer.subscription.updated \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.status=canceled"

# Option B: deletion
stripe trigger customer.subscription.deleted \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.status=canceled"
```

### Verify
- After step 1: User row gains `stripe_customer_id`.
- After step 2/3: `subscription_*` fields updated, `plan` becomes “Hobby”/“Pro”, `hasSub` true.
- After step 4: `hasSub` false; `plan` falls back to “free” only if your product ID doesn’t match or you extend logic—your current code sets `plan` based on productId and event.type/status, so expect `hasSub=false` and `plan` to remain from last product unless you explicitly reset it elsewhere.

If you prefer not to export envs, replace `$STRIPE_HOBBY_PRODUCT_ID`, `$STRIPE_PRO_PRODUCT_ID`, `$EMAIL` inline.

```shellscript
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

```shellscript
export EMAIL="you+test@domain.com"
export STRIPE_HOBBY_PRODUCT_ID="$STRIPE_HOBBY_PRODUCT_ID"
export STRIPE_PRO_PRODUCT_ID="$STRIPE_PRO_PRODUCT_ID"
```

```shellscript
# Create a test customer and capture its ID
CUST_ID=$(stripe customers create --email "$EMAIL" --name "Webhook Test" -q --jq '.id')

# Fire checkout.session.completed with the same customer and email
stripe trigger checkout.session.completed \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.customer_details.email=$EMAIL" \
  --override "data.object.customer_email=$EMAIL"
```

```shellscript
stripe trigger customer.subscription.created \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.items.data[0].price.product=$STRIPE_HOBBY_PRODUCT_ID" \
  --override "data.object.items.data[0].price.id=price_test_hobby" \
  --override "data.object.status=active" \
  --override "data.object.current_period_end=$(($(date +%s)+3600))"
```

```shellscript
stripe trigger customer.subscription.updated \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.items.data[0].price.product=$STRIPE_PRO_PRODUCT_ID" \
  --override "data.object.items.data[0].price.id=price_test_pro" \
  --override "data.object.status=active" \
  --override "data.object.current_period_end=$(($(date +%s)+7200))"
```

```shellscript
# Option A: status change
stripe trigger customer.subscription.updated \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.status=canceled"

# Option B: deletion
stripe trigger customer.subscription.deleted \
  --override "data.object.customer=$CUST_ID" \
  --override "data.object.status=canceled"
```

