/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview A text with line. Better for title section.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file text_with_line.tsx
 * @created 2025-10-08
 * @updated 2025-11-15
 * @version 0.0.2
 */

// Chakra dependencies.
import {
  TextProps,
  FlexProps,
  BoxProps,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_SEMI_BOLD} from "@/common/constants/variables.ts";

// Component properties.
interface TextWithLineProps {
  containerStyle?: (FlexProps | null),
  textStyle?: (TextProps | null),
  lineStyle?: (BoxProps | null),
  text: string
}

// Builds a text followed by a horizontal line.
export default function TextWithLine (
  {containerStyle, textStyle, lineStyle, text}: TextWithLineProps
) {
  // Builds tsx code.
  return <Flex
    columnGap = {{base: 2, sm: 3, md: 4}}
    justifyContent = "center"
    transition = "all .2s"
    alignItems = "center"
    width = "100%"
    {...containerStyle}
  >
    {/** Text */}
    <Text
      fontSize = {{base: 18, sm: 24, md: 28, lg: 32}}
      fontFamily = {SF_SEMI_BOLD}
      transition = "all .2s"
      whiteSpace = "nowrap"
      color = "primary.900"
      userSelect = "none"
      {...textStyle}
    >{text}</Text>
    {/** Line */}
    <Box
      backgroundColor = "neutral.6"
      transition = "all .2s"
      height = "1px"
      width = "100%"
      {...lineStyle}
    />
  </Flex>;
}
