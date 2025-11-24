/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview The infobull component to display in-depth details.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-10-08
 * @updated 2025-10-08
 * @file tooltip.tsx
 * @version 0.0.1
 */

// React dependencies.
import {forwardRef, ReactNode} from "react";

// Chakra dependencies.
import {
  Tooltip as ChakraTooltip,
  PortalProps,
  Portal
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_REGULAR} from "@/common/constants/variables.ts";

// Component properties.
export interface TooltipProps extends ChakraTooltip.RootProps {
  childrenContainerStyle?: (ChakraTooltip.TriggerProps | null),
  arrowTipIconStyle?: (ChakraTooltip.ArrowTipProps | null),
  positionerStyle?: (ChakraTooltip.PositionerProps | null),
  arrowIconStyle?: (ChakraTooltip.ArrowProps | null),
  rootStyle?: (ChakraTooltip.RootProps | null),
  contentProps?: ChakraTooltip.ContentProps,
  portalRef?: React.RefObject<HTMLElement>,
  portalStyle?: (PortalProps | null),
  showArrow?: boolean,
  portalled?: boolean,
  content?: ReactNode,
  disabled?: boolean
}

// The infobul component.
export default forwardRef<HTMLDivElement, TooltipProps>(function Tooltip (
  props: TooltipProps, ref
) {
  // Attributes.
  const {
    childrenContainerStyle,
    arrowTipIconStyle,
    portalled = true,
    positionerStyle,
    arrowIconStyle,
    contentProps,
    portalStyle,
    rootStyle,
    showArrow,
    portalRef,
    children,
    disabled,
    content,
    ...rest
  } = props;

  // Whether infobul is disabled.
  if (disabled) return children;

  // Builds tsx code.
  return <ChakraTooltip.Root
    closeDelay = {0}
    openDelay = {0}
    {...rest}
    {...rootStyle}
  >
    {/** Trigger element */}
    <ChakraTooltip.Trigger asChild {...childrenContainerStyle}>
      {children}
    </ChakraTooltip.Trigger>
    {/** Entry portal */}
    <Portal container = {portalRef} disabled = {!portalled} {...portalStyle}>
      {/** Dynamic positioner */}
      <ChakraTooltip.Positioner {...positionerStyle}>
        {/** Tooltip content */}
        <ChakraTooltip.Content
          fontSize = {{base: 12, sm: 13, md: 14}}
          fontFamily = {SF_REGULAR}
          transition = "all .2s"
          userSelect = "none"
          color = "neutral.1"
          padding = {3}
          ref = {ref}
          {...contentProps}
        >
          {/** Tooltip arrow */}
          {showArrow && <ChakraTooltip.Arrow {...arrowIconStyle}>
            <ChakraTooltip.ArrowTip {...arrowTipIconStyle}/>
          </ChakraTooltip.Arrow>}
          {/** Main content */}
          {content}
        </ChakraTooltip.Content>
      </ChakraTooltip.Positioner>
    </Portal>
  </ChakraTooltip.Root>;
});
