import { HeadingLevel, Heading } from "baseui/heading";
import { ParagraphMedium } from "baseui/typography";
import { Button } from "baseui/button";
import { PinCode } from "baseui/pin-code";
import { FormControl } from "baseui/form-control";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";

const ScreenHeading = () => {
	const [global] = useContext(GlobalContext);
	return (
		<SectionHeading>Hello {global.submission.firstName},</SectionHeading>
	);
};
const Content = () => {
	const [, dispatch] = useContext(GlobalContext);
	const [pin, setPin] = useState(["", "", "", ""]);
	return (
		<SectionContent>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>Pin</Heading>
				</HeadingLevel>
				<FormControl>
					<PinCode
						values={pin}
						onChange={({ values }) => setPin(values)}
						clearOnEscape
					></PinCode>
				</FormControl>
				<ParagraphMedium>
					You will receive the pin on provided mobile phone.
				</ParagraphMedium>
			</FormGroup>
			<FormGroup>
				<Button onClick={() => dispatch({ type: "LAST_SCREEN" })}>
					Back
				</Button>
				<Button onClick={() => dispatch({ type: "NEXT_SCREEN" })}>
					Next
				</Button>
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "extraInfo2",
	to: [
		{
			handle: "success",
			condition: (submission) => {
				return true;
			},
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
