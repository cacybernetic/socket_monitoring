/// <reference types = "vite/client"/>

// Environment variables.
export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Defining env properties.
interface ImportMetaEnv {
  readonly VITE_API_SOCKET_HOST: string,
  readonly VITE_DOMAIN_NAME: string,
  readonly VITE_API_PORT: string
}
