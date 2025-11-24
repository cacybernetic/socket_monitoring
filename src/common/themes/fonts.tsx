/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Global fonts pallete.
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-09-23
 * @updated 2025-09-23
 * @file fonts.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement} from "react";

// Library dependencies.
import {Global} from "@emotion/react";

// Custom dependencies.
import PoppinsSemiBold from "/assets/fonts/poppins_semi_bold.woff2";
import SFMonoSemiBold from "/assets/fonts/sf_mono_semi_bold.woff2";
import PoppinsRegular from "/assets/fonts/poppins_regular.woff2";
import SFMonoRegular from "/assets/fonts/sf_mono_regular.woff2";
import PoppinsMedium from "/assets/fonts/poppins_medium.woff2";
import SFMonoMedium from "/assets/fonts/sf_mono_medium.woff2";
import PoppinsLight from "/assets/fonts/poppins_light.woff2";
import SFMonoLight from "/assets/fonts/sf_mono_light.woff2";
import PoppinsBold from "/assets/fonts/poppins_bold.woff2";
import SFSemiBold from "/assets/fonts/sf_semi_bold.woff2";
import SFMonoBold from "/assets/fonts/sf_mono_bold.woff2";
import global_css from "@/common/themes/global_css.ts";
import SFRegular from "/assets/fonts/sf_regular.woff2";
import SFMedium from "/assets/fonts/sf_medium.woff2";
import SFLight from "/assets/fonts/sf_light.woff2";
import SFBold from "/assets/fonts/sf_bold.woff2";
import {
	POPPINS_SEMI_BOLD,
	SF_MONO_SEMI_BOLD,
	POPPINS_REGULAR,
	SF_MONO_REGULAR,
	SF_MONO_MEDIUM,
	POPPINS_MEDIUM,
	POPPINS_LIGHT,
	SF_MONO_LIGHT,
	POPPINS_BOLD,
	SF_SEMI_BOLD,
	SF_MONO_BOLD,
	SF_REGULAR,
	SF_MEDIUM,
	SF_LIGHT,
	SF_BOLD
} from "@/common/constants/variables.ts";

// Fonts family.
export default function Fonts (): ReactElement {
	// Sends defined font families.
	return <Global styles = {`
		/** Poppins Semi Bold */
		@font-face {
			font-family: "${POPPINS_SEMI_BOLD}";
			src: url(${PoppinsSemiBold});
			font-style: normal;
			font-weight: 600;
		}
		/** San Francisco Mono Semi Bold */
		@font-face {
			font-family: "${SF_MONO_SEMI_BOLD}";
			src: url(${SFMonoSemiBold});
			font-style: normal;
			font-weight: 600;
		}
		/** Poppins regular */
		@font-face {
			font-family: "${POPPINS_REGULAR}";
			src: url(${PoppinsRegular});
			font-style: normal;
			font-weight: 400;
		}
		/** San Francisco Mono Regular */
		@font-face {
			font-family: "${SF_MONO_REGULAR}";
			src: url(${SFMonoRegular});
			font-style: normal;
			font-weight: 400;
		}
		/** San Francisco Mono Medium */
		@font-face {
			font-family: "${SF_MONO_MEDIUM}";
			src: url(${SFMonoMedium});
			font-style: normal;
			font-weight: 500;
		}
		/** Poppins Medium */
		@font-face {
			font-family: "${POPPINS_MEDIUM}";
			src: url(${PoppinsMedium});
			font-style: normal;
			font-weight: 500;
		}
		/** San Francisco Mono Light */
		@font-face {
			font-family: "${SF_MONO_LIGHT}";
			src: url(${SFMonoLight});
			font-weight: lighter;
			font-style: normal;
		}
		/** Poppins Light */
		@font-face {
			font-family: "${POPPINS_LIGHT}";
			src: url(${PoppinsLight});
			font-weight: lighter;
			font-style: normal;
		}
		/** San Francisco Mono Bold */
		@font-face {
			font-family: "${SF_MONO_BOLD}";
			src: url(${SFMonoBold});
			font-style: normal;
			font-weight: 700;
		}
		/** Poppins Bold */
		@font-face {
			font-family: "${POPPINS_BOLD}";
			src: url(${PoppinsBold});
			font-style: normal;
			font-weight: 700;
		}
		/** San Francisco Semi Bold */
		@font-face {
			font-family: "${SF_SEMI_BOLD}";
			src: url(${SFSemiBold});
			font-style: normal;
			font-weight: 600;
		}
		/** San Francisco Regular */
		@font-face {
			font-family: "${SF_REGULAR}";
			src: url(${SFRegular});
			font-style: normal;
			font-weight: 400;
		}
		/** San Francisco Medium */
		@font-face {
			font-family: "${SF_MEDIUM}";
			src: url(${SFMedium});
			font-style: normal;
			font-weight: 500;
		}
		/** San Francisco Light */
		@font-face {
			font-family: "${SF_LIGHT}";
			src: url(${SFLight});
			font-weight: lighter;
			font-style: normal;
		}
		/** San Francisco Bold */
		@font-face {
			font-family: "${SF_BOLD}";
			src: url(${SFBold});
			font-style: normal;
			font-weight: 700;
		}
		${global_css}
	`}/>;
}
