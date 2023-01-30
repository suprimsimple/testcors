import { FormControl } from "baseui/form-control";
import { Radio, RadioGroup } from "baseui/radio";
import { HeadingLevel, Heading } from "baseui/heading";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { FormGroup, SectionContent, SectionHeading } from "../shared";

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 14;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	return (
		<SectionContent withNextButton>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Breast screening is only available to Australian citizens or residents.
					</Heading>
				</HeadingLevel>
			</FormGroup>
			<FormGroup>
				<ParagraphSmall>Are you an Australian citizen or resident?</ParagraphSmall>
				<ParagraphSmall>You will need to provide evidence of your Australian citizenship or residency at your appointment? For example:</ParagraphSmall>
				<div style={{ marginTop: "12px" }}>
					<FormControl>
						<RadioGroup
							value={global.submission.residencyType}
							onChange={(e) =>
								updateSubmission(
									`residencyType`,
									e.target.value
								)
							}
							name="residencyType"
						>
							<Radio value="Australian driver’s licencer">
								Australian driver’s licence
							</Radio>
							<Radio value="Australian passport">
								Australian passport
							</Radio>
							<Radio value="Australian birth certificate">
								Australian birth certificatet
							</Radio>
							<Radio value="Relevant visa">
								Relevant visa
							</Radio>
						</RadioGroup>
					</FormControl>
				</div>
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "residencyType",
	to: [
		{
			handle: "failNonResident",
			condition: (submission) =>
				submission.residencyType === "None of the above",
		},
		{
			handle: "residencyConfirmEvidence",
			condition: (submission) => {
				return submission.residencyType !== "None of the above" && !submission.hasBookedBefore
			}
		},
		{
			handle: "checkPreviousBreastCancer",
			condition: (submission) => {
				return submission.residencyType !== "None of the above" && submission.hasBookedBefore
			}
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
