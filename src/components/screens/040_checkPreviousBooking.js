import { Heading, HeadingLevel } from "baseui/heading";
import { Radio, RadioGroup } from "baseui/radio";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { FormGroup, SectionContent, SectionHeading } from "../shared";

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 4;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	const validationMessage = () => {};
	const validate = () => {
		return true;
	};

	return (
		<SectionContent
			withNextButton
			withValidation
			validate={validate}
			validationMessage={validationMessage}
		>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Have you had a breast screen with us before?
						<span>*</span>
					</Heading>
				</HeadingLevel>
				<RadioGroup
					value={global.submission.hasBookedBefore ? "1" : "0"}
					onChange={(e) =>
						updateSubmission(
							`hasBookedBefore`,
							e.target.value === "1"
						)
					}
					name="hasBookedBefore"
				>
					<Radio value="1">Yes</Radio>
					<Radio value="0">No</Radio>
				</RadioGroup>
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "checkPreviousBooking",
	to: [
		{
			handle: "newClientGender",
			condition: (submission) => {
				return !submission.hasBookedBefore;
			},
		},
		{
			handle: "existingClientInfo",
			condition: (submission) => {
				return submission.hasBookedBefore;
			},
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
