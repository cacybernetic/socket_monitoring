/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Defines common messages that can be displayed.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-13
 * @file messages.ts
 * @version 0.0.1
 */

// Plugin dependencies.
import i18next from "i18next";

// Custom dependencies.
import {MessageType, showWith} from "@/common/states/alert.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {showToast} from "@/common/libraries/toast.ts";
import {store} from "@/common/states/store.ts";

// Types.
type MessageDisplayProps = {
  onOptionClicked?: () => void
  details?: (string | null),
  useToast?: boolean,
};
type UIProps = {
  onOptionPressed?: (index: number) => void,
  onDialogClosed?: () => void,
  message?: (string | null),
  details?: (string | null),
  title?: (string | null),
  useToast?: boolean,
  type: string
};

/**
 * @description Makes feedback about unavailable or undefined resource.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showNotFoundRequestErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showNotFoundRequestErrorMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:notFoundDesc`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:notFoundTitle`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes feedback about socket connection lost error.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showSocketConnectionLostMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showSocketConnectionLostMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:socketConnectionLost`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:networkError`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes a feedback about invalid permission.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showPermissionUnGrantedMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showPermissionUnGrantedMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:unauthorizeMessage`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:unauthorizeService`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.WARNING, message, ...data, title});
}

/**
 * @description Makes feedback about browser network error.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showBrowserNetworkErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showBrowserNetworkErrorMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:browserNotOnline`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:networkError`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes feedback about request timeout.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showRequestTimeoutErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showRequestTimeoutErrorMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:requestTimeoutDesc`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:requestFailedTitle`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes feedback about a failed authentication.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showAuthenticationErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showAuthenticationErrorMessage (data?: MessageDisplayProps): void {
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:authenticationFailed`);
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:authFailedDesc`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes feedback about request launching.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showRequestLaunchErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showRequestLaunchErrorMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:requestLaunchError`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:requestFailedTitle`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes feedback about a bad request (invalid inputs).
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showBadRequestErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showBadRequestErrorMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:badRequestDesc`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:badRequestTitle`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes feedback about program internal error.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showInternalErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showInternalErrorMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:internalErrorDesc`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:internalErrorTitle`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Makes feedback about request error during procedure.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showRequestErrorMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showRequestErrorMessage (data?: MessageDisplayProps): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:requestErrorDesc`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:requestFailedTitle`);
  // Materializes UI message for program feedback.
  displayMessage({type: MessageType.ERROR, message, ...data, title});
}

/**
 * @description Displays an UI message to materialize a program feedback.
 * @param {UIProps} configs The GUI configurations for message display.
 * @function displayMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function displayMessage ({
  onOptionPressed,
  onDialogClosed,
  useToast,
  message,
  details,
  title,
  type
}: UIProps): void {
  // Whether a toast must be used.
  if (useToast) showToast({details, message, title, type});
  // Displays inside a simple message box, requested message with details.
  else store.dispatch(showWith({
    options: [{text: i18next.t(`${GLOBAL_LANG}:ok`), primary: true}],
    onOptionPressed, onDialogClosed, details, message, title, type
  }));
}

/**
 * @description Makes a feedback about an expired/failed authentication.
 * @param {?MessageDisplayProps} data The message configurations.
 * @function showAuthenticationExpiredMessage
 * @type {void}
 * @public
 * @returns {void}
 */
function showAuthenticationExpiredMessage (
  data?: MessageDisplayProps
): void {
  // Gets message.
  const message: string = i18next.t(`${GLOBAL_LANG}:authenticationExpired`);
  // Gets title.
  const title: string = i18next.t(`${GLOBAL_LANG}:expiredSession`);
  // Materializes UI message for program feedback.
  displayMessage({
    onDialogClosed: data?.onOptionClicked,
    type: MessageType.WARNING,
    message, ...data, title,
    onOptionPressed: (index: number): void => {
      // Whether only first option is clicked.
      if (index === 0) data?.onOptionClicked?.();
    }
  });
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  showAuthenticationExpiredMessage,
  showNotFoundRequestErrorMessage,
  showSocketConnectionLostMessage,
  showPermissionUnGrantedMessage,
  showBrowserNetworkErrorMessage,
  showRequestTimeoutErrorMessage,
  showAuthenticationErrorMessage,
  showRequestLaunchErrorMessage,
  showBadRequestErrorMessage,
  showInternalErrorMessage,
  showRequestErrorMessage,
  MessageDisplayProps,
  displayMessage
};
