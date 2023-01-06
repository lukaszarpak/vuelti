/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_ENDPOINT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
