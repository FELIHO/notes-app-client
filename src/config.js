export default {
    s3: {
      REGION: "us-east-1",
      BUCKET: "notes-app-uploads.lionel-feliho-dev"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://xhr8ph1hr4.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_z5sUly53t",
      APP_CLIENT_ID: "63ogd8png1dnmvei5s0oa8s33o",
      IDENTITY_POOL_ID: "us-east-1:00873c17-2584-4a61-b8c8-552ca1257125"
    },
    stripe: {
      PUBLIC_STRIPE_KEY: "pk_live_13vebnX7MEBBE7ynDIpAY87A00El8VFSGv",
      PUBLIC_STRIPE_KEY_TEST: "pk_test_TDKERIM1VSgJdwbwYfo1ZkTE00VPj6nvRo"
    }
  };