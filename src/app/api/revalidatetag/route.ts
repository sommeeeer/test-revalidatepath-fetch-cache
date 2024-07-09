import { revalidateTag } from 'next/cache';

import { invalidateCloudFrontPaths } from '@/utils/server-helpers';

export async function POST(request: Request) {
  const body = await request.json();
  const route = body.route as string;
  
  console.log('[REVALIDATE_TAG_BEFORE]');
  revalidateTag('datetime');
  console.log('[REVALIDATE_TAG_AFTER]');

  console.log('[CF_INVALIDATE] route: ', route);
  const output = await invalidateCloudFrontPaths([route]);
  console.log('[CF_INVALIDATE] output', output);

  return Response.json({
    revalidated:
      'Revalidation successful, you can now refresh the page for new data.',
  });
}
