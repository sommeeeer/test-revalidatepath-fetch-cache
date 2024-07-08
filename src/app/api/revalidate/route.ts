import { revalidatePath } from 'next/cache';

import { invalidateCloudFrontPaths } from '@/utils/server-helpers';

export async function POST(request: Request) {
  const body = await request.json();
  const route = body.route as string;
  try {
    revalidatePath(route);
    if (!process.env.DISABLE_CF_INVALIDATION) {
      console.log('Invalidating route: ', route);
      const output = await invalidateCloudFrontPaths([route]);
      console.log('Invalidation output', output);
    }
    return Response.json({
      revalidated:
        'Revalidation successful, you can now refresh the page for new data.',
    });
  } catch (err) {
    console.error('Revalidation failed', err);
    return Response.json({
      revalidated: 'Revalidation failed',
    });
  }
}
