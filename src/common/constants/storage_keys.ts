/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Contains storage keys for app's persistent data.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @file storage_keys.ts
 * @created 2025-11-13
 * @updated 2025-11-13
 * @version 0.0.1
 */

// Local storage keys.
const SOCKET_MONITOR_SAVE_KEY: string = "socket_monitor_sk";
const ACTIVE_LANGUAGE_SAVE_KEY: string = "scm_act_lang_sk";

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  ACTIVE_LANGUAGE_SAVE_KEY,
  SOCKET_MONITOR_SAVE_KEY
};
