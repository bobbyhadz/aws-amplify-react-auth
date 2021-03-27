declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_BASE_URL: string;
      BUCKET_NAME: string;
      USER_POOL_ID: string;
      IDENTITY_POOL_ID: string;
      REGION: string;
      ACCOUNT_ID: string;
    }
  }
}

// If this file has no import/export (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
