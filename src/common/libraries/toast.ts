/**
 * @fileoverview Provides an API to display a toast with details section.
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-23
 * @version 0.0.2
 * @file toast.ts
 */

// Chakra dependencies.
import {createToaster} from "@chakra-ui/react";

// Plugin dependencies.
// https://www.npmjs.com/package/htmlstring-to-react
import HTMLReactParser from "html-react-parser/lib/index";
import i18next from "i18next";

// Custom dependencies.
import {BREAKPOINT_480} from "@/common/constants/variables.ts";
import {correctString} from "@/common/libraries/string.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";

// Enumerations.
enum ToastType {
	INFORMATION = "info",
	WARNING = "warning",
	SUCCESS = "success",
	ERROR = "error"
};

// Types.
type ToastProps = {
	type: (ToastType | string),
	details?: (string | null),
	message?: (string | null),
	title?: (string | null)
};

// Attributes.
const toaster = createToaster({
  placement: (window.innerWidth <= BREAKPOINT_480 ? "bottom" : "bottom-end"),
  pauseOnPageIdle: true,
  duration: 8000,
  overlap: true,
  max: 1
});

/**
 * @description Displays a toast message.
 * @param {ToastProps} configs The toast configurations.
 * @function showToast
 * @type {void}
 * @public
 * @return {void}
 */
function showToast ({message, details, title, type}: ToastProps): void {
	// Corrects given details.
	details = correctString<string>({input: details});
	// Corrects given message.
	message = correctString<string>({input: message});
	// Corrects given title.
	title = correctString<string>({input: title});
	// Whether no message is provided.
	if (message.length <= 0) return;
	// Displays that toast from its object reference.
	toaster.create({
		title, type,
		description: HTMLReactParser(`
			<span>${message}</span>
			${
        details.length > 0 ?
        `
					<br/><br/>
				  <details>
					  <summary>${i18next.t(`${GLOBAL_LANG}:moreDetails`)}</summary>
					  <p>${details}</p>
				  </details>
			  ` : ''
      }
    `.replace(/\n\t/, ''))
	});
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {showToast, ToastType, toaster};
