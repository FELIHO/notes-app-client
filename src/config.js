const dev = {
  STRIPE_KEY: "pk_test_TDKERIM1VSgJdwbwYfo1ZkTE00VPj6nvRo",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-1q9s1msdw67gy"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://3nxp0127h4.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_ovd0R0tus",
    APP_CLIENT_ID: "7hpj6atojkqlua44qjbrk4n4a9",
    IDENTITY_POOL_ID: "us-east-1:0d85c713-73a3-4c95-b2a1-eeadce54b86f"
  }
};

const prod = {
  STRIPE_KEY: "pk_live_13vebnX7MEBBE7ynDIpAY87A00El8VFSGv",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1x9zn8xy5xklq"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://jwouo69ld0.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_sTtCHQ5sm",
    APP_CLIENT_ID: "dkdh7r8emekgcqqndakv4oa46",
    IDENTITY_POOL_ID: "us-east-1:9a1a8c4f-5b8c-490f-ada3-84dd7b3f7b30"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};