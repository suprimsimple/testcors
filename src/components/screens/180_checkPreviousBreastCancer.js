import { FormControl } from "baseui/form-control";
import { Radio, RadioGroup } from "baseui/radio";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { Heading, HeadingLevel } from "baseui/heading";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { FormGroup, SectionContent, SectionHeading } from "../shared";
const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 18;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	return (
		<SectionContent withNextButton>
			<ParagraphMedium>
				Please answer the questions below to confirm your eligibility.
			</ParagraphMedium>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						{global.submission.hasBookedBefore
							? "Have you had breast cancer since your last visit with BreastScreen SA?"
							: "Have you had breast cancer in the past?"}
						<span style={{ color: "#CF5D5D" }}>*</span>
					</Heading>
				</HeadingLevel>
				<FormControl>
					<RadioGroup
						value={global.submission.breastCancerInThePast}
						onChange={(e) =>
							updateSubmission(
								`breastCancerInThePast`,
								e.target.value
							)
						}
						name="breastCancerInThePast"
					>
						<Radio value="yes">Yes</Radio>
						<Radio value="no">No</Radio>
					</RadioGroup>
				</FormControl>
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "checkPreviousBreastCancer",
	to: [
		{
			handle: `failPreviousBreastCancer`,
			condition: (submission) =>
				submission.breastCancerInThePast === "yes",
		},
		{
			handle: `mammogramExistingClient`,
			condition: (submission) =>
				submission.breastCancerInThePast === "no",
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
