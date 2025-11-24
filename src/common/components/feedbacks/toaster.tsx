/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Toaster UI component.
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-09-26
 * @updated 2025-09-26
 * @file toaster.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement} from "react";

// Chakra dependencies.
import {
  Toaster as ChakraToaster,
  ToastActionTriggerProps,
  ToastCloseTriggerProps,
  ToastDescriptionProps,
  ToastIndicatorProps,
  ToastTitleProps,
  ToastRootProps,
  SpinnerProps,
  PortalProps,
  StackProps,
  Spinner,
  Portal,
  Stack,
  Toast
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {toaster} from "@/common/libraries/toast.ts";

// Component properties.
interface ToasterProps {
  actionTriggerStyle?: (ToastActionTriggerProps | null),
  toastIndicatorStyle?: (ToastIndicatorProps | null),
  closeButtonStyle?: (ToastCloseTriggerProps | null),
  descriptionTextStyle?: (ToastTitleProps | null),
  titleTextStyle?: (ToastDescriptionProps | null),
  toasterStyle?: (ToasterProps | null),
  spinnerStyle?: (SpinnerProps | null),
  rootStyle?: (ToastRootProps | null),
  contentStyle?: (StackProps | null),
  portalStyle?: (PortalProps | null)
}

// Builds a toast UI component.
export default function Toaster ({
  descriptionTextStyle,
  toastIndicatorStyle,
  actionTriggerStyle,
  closeButtonStyle,
  titleTextStyle,
  contentStyle,
  toasterStyle,
  spinnerStyle,
  portalStyle,
  rootStyle
}: ToasterProps) {
  // Builds tsx code.
  return <Portal {...portalStyle}>
    {/** Main container */}
    <ChakraToaster
      insetInline = {{mdDown: 4}}
      toaster = {toaster}
      {...toasterStyle}
    >
      {/** Builds structure */}
      {(toast): ReactElement => <Toast.Root
        style = {{scrollbarWidth: "thin"}}
        fontFamily = {SF_REGULAR}
		    transition = "all .2s"
        userSelect = "none"
        color = "neutral.1"
        overflow = "auto"
        width = "256px"
        transform = {{
          sm: "translate(-32px, -32px)",
          base: "translate(0, -24px)"
        }}
        {...rootStyle}
      >
        {/** Whether toast under loading */}
        {
          toast.type === "loading" ?
          <Spinner color = "primary.800" size = "sm" {...spinnerStyle}/> :
          <Toast.Indicator {...toastIndicatorStyle}/>
        }
        {/** Content */}
        <Stack
          fontSize = {{base: 12, sm: 13, md: 14}}
          transition = "all .2s"
          maxWidth = "100%"
          flex = {1}
          gap = {1}
          {...contentStyle}
        >
          {/** Title */}
          {
            toast.title &&
            <Toast.Title {...titleTextStyle}>{toast.title}</Toast.Title>
          }
          {/** Description */}
          {
            toast.description &&
            <Toast.Description {...descriptionTextStyle}>
              {toast.description}
            </Toast.Description>
          }
        </Stack>
        {/** Options */}
        {
          toast.action &&
          <Toast.ActionTrigger {...actionTriggerStyle}>
            {toast.action.label}
          </Toast.ActionTrigger>
        }
        {/** Close button */}
        {toast.closable && <Toast.CloseTrigger {...closeButtonStyle}/>}
      </Toast.Root>}
    </ChakraToaster>
  </Portal>;
}
