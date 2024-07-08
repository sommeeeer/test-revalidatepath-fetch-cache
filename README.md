### Test revalidatePath() fetch cache with SSTv2 and open-next

Remember to set the cloudfront distribution id in `server-helpers.ts` or try to get the `getDistributionId()` function to work.

#### Versions:

```
SST v2.43.3
Next.js version : 14.2.4
OpenNext v3.0.2
```

## How to run locally

```bash
pnpm build
pnpm start # this will add NO_CF_INVALIDATION=true env variable
```

## How to deploy

```bash
pnpm sst:deploy
```
