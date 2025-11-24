/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview The global state management module.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-09-24
 * @updated 2025-09-24
 * @version 0.0.1
 * @file store.ts
 */

// Plugin dependencies.
import {configureStore, Store} from "@reduxjs/toolkit";
import alert from "@/common/states/alert.ts";
import app from "@/common/states/app.ts";

// Store getters.
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Global store configuration.
const store: Store = configureStore({
	reducer: {alert, app},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	})
});

/**
 * @description Exports only public features.
 * @exports *
 */
export {AppDispatch, RootState, store};
