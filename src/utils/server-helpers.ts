import 'server-only';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';

const cloudFront = new CloudFrontClient({});
const ssm = new SSMClient({});

export async function invalidateCloudFrontPaths(paths: string[]) {
  try {
    const distributionId = await getDistributionId();
    if (!distributionId) {
      throw new Error('Distribution ID not found');
    }
    return await cloudFront.send(
      new CreateInvalidationCommand({
        DistributionId: distributionId,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: paths.length,
            Items: paths,
          },
        },
      })
    );
  } catch (err) {
    console.error('[INVALIDATE_CLOUDFRONT_PATHS_ERROR]', err);
  }
}

async function getDistributionId() {
  const domain = await ssm.send(
    new GetParametersCommand({
      Names: [
        `${process.env.SST_SSM_PREFIX}Parameter/FRONTEND_DISTRIBUTION_ID/value`,
      ],
      WithDecryption: false,
    })
  );
  return domain.Parameters?.[0]?.Value ?? null;
}
