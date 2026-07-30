# Archon 5th-Order Loyalty (`REORDER15`)

Every **5th, 10th, 15th…** completed Square payment with a customer email auto-sends a **15% off** code via Resend. Ops copy goes to `info@`.

**Status (Jul 16, 2026): infrastructure live — no manual steps required for new paid orders.**

## Flow

1. Square → `POST https://archonpeptide.com/api/square/webhook`
2. Verify signature · COMPLETED only · idempotent per payment id
3. Resolve email (payment → order fulfillments → customer profile)
4. Upstash Redis increments `loyalty:count:{email}`
5. Count % 5 === 0 → Resend reward email + notify ops

## Wired

| Piece | Detail |
|-------|--------|
| Discount | Square catalog **REORDER15** (15%) ✅ |
| Webhook | **Archon Website Loyalty** → `/api/square/webhook` (`payment.created` / `payment.updated`) ✅ |
| Redis | Vercel Upstash KV `upstash-kv-cyan-yacht` (`KV_REST_API_*`) ✅ |
| Env (Production) | Square webhook key + notification URL + access token, Resend, notify email ✅ |
| Email enrichment | `src/lib/square/client.ts` when Payment Link omits buyer email ✅ |

Nova OS keeps its **own** Square webhook (separate signature key). Do not merge them.

## Health check

```bash
curl -H "Authorization: Bearer $SQUARE_WEBHOOK_SIGNATURE_KEY" \
  https://archonpeptide.com/api/loyalty/status
# expect ready: true
```

(`vercel env pull` may truncate Sensitive values — use the Dashboard copy button if testing locally.)

## Code

- `src/app/api/square/webhook/route.ts`
- `src/app/api/loyalty/status/route.ts`
- `src/lib/loyalty/*`
- `src/config/loyalty.ts`
- `src/lib/square/webhook.ts` · `client.ts`

## Note on historical orders

Counts start from webhook go-live. Customers who already had 5+ orders before this won’t get a retroactive email unless you seed Redis counts (optional backfill).
