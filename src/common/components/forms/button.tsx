/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview The button component for most common use cases.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-13
 * @file button.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement, useState} from "react";

// Chakra dependencies.
import {
	SpinnerProps,
	ButtonProps,
	BoxProps,
	Spinner,
	Button,
	Box
} from "@chakra-ui/react";

// Plugin dependencies.
import {useSelector} from "react-redux";

// Custom dependencies.
import {correctString} from "@/common/libraries/string.ts";
import {RootState} from "@/common/states/store.ts";
import Tooltip, {
	TooltipProps
} from "@/common/components/feedbacks/tooltip.tsx";

// Component properties.
export interface CustomButtonProps {
	tooltip?: (ReactElement | string | null),
	loaderStyle?: (SpinnerProps | null),
	rightIcon?: ReactElement,
	leftIcon?: ReactElement,
	isProcessing?: boolean,
	text?: (string | null),
	onClick?: () => void,
	disabled?: boolean,
	containerStyle?: (
		disabled?: boolean, processing?: boolean
	) => (BoxProps | null),
	tooltipStyle?: (
		disabled?: boolean, processing?: boolean
	) => (TooltipProps | null),
	onMouseDown?: (
		disabled?: boolean, processing?: boolean
	) => (ButtonProps | null),
	buttonStyle?: (
		disabled?: boolean, processing?: boolean
	) => (ButtonProps | null)
}

// Creates a generic button for common use cases.
export default function CustomButton ({
	containerStyle,
	isProcessing,
	tooltipStyle,
	tooltip = '',
	loaderStyle,
	onMouseDown,
	buttonStyle,
	rightIcon,
	leftIcon,
	disabled,
	onClick,
	text
}: CustomButtonProps) {
	// Attributes.
	tooltip = (typeof tooltip === "string" ? tooltip.trim() : tooltip);
	const [isMouseDown, mouseDown] = useState<boolean>(false);
	text = correctString<string>({input: text});
	const isOnGoing: boolean = useSelector(
		(state: RootState): boolean => state.app.isOnGoing
	);

	// Whether button is really disabled.
	const isDisabled = (
		(): boolean => (disabled || (!isProcessing && isOnGoing))
	);

	// Called when button is clicked.
	const onButtonClicked = (): void => {
		// Whether that button isn't disabled.
		if (typeof onClick === "function" && !isProcessing && !isDisabled()) {
			// Calls passed callback.
			onClick();
		}
	};

	// Builds tsx code.
	return <Tooltip
		contentProps = {{padding: 2}}
		content = {tooltip}
		showArrow
		disabled = {
			(typeof tooltip === "string" && tooltip.length <= 0) || isDisabled()
		}
		{...tooltipStyle?.(isDisabled(), isOnGoing)}
	>
		{/** A wrapper because tooltip doesn't work directly with button */}
		<Box {...containerStyle?.(isDisabled(), isProcessing)}>
			{/** Button for most common interactions */}
			<Button
				backgroundColor = {isDisabled() ? "neutral.4" : "primary.500"}
				justifyContent = {isProcessing ? "center" : undefined}
				paddingInline = {{base: 6, sm: 8, md: 10, lg: 12}}
				color = {isDisabled() ? "neutral.6" : "neutral.1"}
				paddingBlock = {{base: 4, sm: 5, md: 6, lg: 7}}
				onMouseDown = {(): void => mouseDown(true)}
				onMouseUp = {(): void => mouseDown(false)}
				onClick = {onButtonClicked}
				disabled = {isDisabled()}
				display = "inline-flex"
				transition = "all .2s"
				alignItems = "center"
				borderRadius = {4}
				outline = "none"
				minHeight = {0}
				minWidth = {0}
				_hover = {
					isDisabled() ? undefined :
					{bg: (isProcessing ? "primary.500" : "primary.700")}
				}
				cursor = {
					isDisabled() ? "not-allowed" :
					(isProcessing ? "progress" : "pointer")
				}
				{...buttonStyle?.(isDisabled(), isProcessing)}
				{...(isMouseDown ? onMouseDown?.(isDisabled(), isProcessing) : null)}
			>
				{/** Left icon */}
				{
					!(leftIcon != null && isProcessing) ? leftIcon :
					<Spinner
						minHeight = {4}
						minWidth = {4}
						height = {4}
						width = {4}
						{...loaderStyle}
					/>
				}
				{/** Content */}
				{
					!isProcessing ? text :
					(
						!(rightIcon == null && leftIcon == null) ? '' :
						<Spinner
							minHeight = {4}
							minWidth = {4}
							height = {4}
							width = {4}
							{...loaderStyle}
						/>
					)
				}
				{/** Right icon */}
				{
					!(rightIcon != null && isProcessing) ? rightIcon :
					<Spinner
						minHeight = {4}
						minWidth = {4}
						height = {4}
						width = {4}
						{...loaderStyle}
					/>
				}
			</Button>
		</Box>
	</Tooltip>;
}
