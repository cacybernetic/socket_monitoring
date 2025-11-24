/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Global css styles for general effects over whole app.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-11-23
 * @updated 2025-11-23
 * @file global_css.ts
 * @version 0.0.1
 */

// Exports general css.
export default `
  /* Terminal cursor blink animation */
  @keyframes terminal-cursor-blink {
    0% {opacity: 1;}
    50% {opacity: 1;}
    51% {opacity: 0;}
    100% {opacity: 0;}
  }
`;
