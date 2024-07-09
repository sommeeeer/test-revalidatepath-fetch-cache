import { SSTConfig } from 'sst';
import { Config, NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'test-revalidatepath-fetch-cache',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        permissions: ['ssm'],
      });

      new Config.Parameter(stack, 'FRONTEND_DISTRIBUTION_ID', {
        value: site.cdk?.distribution?.distributionId ?? 'localhost',
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
