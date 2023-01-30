import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { GlobalProvider } from "../context/global";
import Home from "./Home";
import { createTheme } from "baseui";
const primitives = {
	primaryA: "#474747",
	black: "#63313C",
	white: "#ffffff",
	pink: "#D71F85",
	tickBorder: "#63313c",
	primaryFontFamily: "'Aktiv-Grotesk', sans-serif",
};
const overrides = {
	borders: {
		inputBorderRadius: "999px",
		buttonBorderRadius: "999px",
		useRoundedCorners: true,
	},
	typography: {
		HeadingXSmall: primitives.primaryFontFamily,
		HeadingSmall: primitives.primaryFontFamily,
		HeadingMedium: primitives.primaryFontFamily,
		HeadingLarge: primitives.primaryFontFamily,
		HeadingXLarge: primitives.primaryFontFamily,
		HeadingXXLarge: primitives.primaryFontFamily,
		DisplayXSmall: primitives.primaryFontFamily,
		DisplaySmall: primitives.primaryFontFamily,
		DisplayMedium: primitives.primaryFontFamily,
		DisplayLarge: primitives.primaryFontFamily,
	},
	colors: {
		inputFill: primitives.white,
		inputFillinputFillActive: primitives.white,
		inputBorder: primitives.white,
		buttonPrimaryFill: primitives.black,
	},
};
const pinkTheme = createTheme(primitives, overrides);

const engine = new Styletron();

export default function App() {
	return (
		<StyletronProvider value={engine}>
			<BaseProvider theme={pinkTheme}>
				<GlobalProvider>
					<Home></Home>
				</GlobalProvider>
			</BaseProvider>
		</StyletronProvider>
	);
}
