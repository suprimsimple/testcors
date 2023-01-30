import { HeadingLevel, Heading } from "baseui/heading";
import { ParagraphMedium } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { PinCode } from "baseui/pin-code";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { FormGroup, SectionContent, SectionHeading } from "../shared";

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 11;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	return (
		<SectionContent withNextButton>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Enter your verification code
					</Heading>
				</HeadingLevel>
				<FormControl>
					<PinCode
						values={global.submission.verificationCode}
						onChange={({ values }) =>
							updateSubmission("verificationCode", values)
						}
						clearOnEscape
					></PinCode>
				</FormControl>
				<ParagraphMedium>
					You will receive the code via{" "}
					{global.submission.emailOrMobile}.
				</ParagraphMedium>
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "existingClientVerification",
	to: [
		{
			handle: "existingClientInformation",
			condition: (submission) => {
				return true;
			},
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
