declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        USER_TOKEN: string;
        API_KEY: string;
        // add more environment variables and their types here
      }
    }
  }