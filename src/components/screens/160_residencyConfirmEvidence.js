import { HeadingLevel, Heading } from "baseui/heading";
import { FormControl } from "baseui/form-control";
import { Radio, RadioGroup } from "baseui/radio";
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
		global.submission.screen = 16;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	return (
		<SectionContent withNextButton>
			<HeadingLevel>
				<Heading styleLevel={1}>
					You will need to provide evidence of your citizenship.
				</Heading>
			</HeadingLevel>
			<div style={{ marginTop: "16px" }}>
				<FormGroup>
					<HeadingLevel>
						<Heading styleLevel={3}>
							Are you able to provide either of the following
							documents at your appointment?
						</Heading>
					</HeadingLevel>
					<FormControl
						caption={() => (
							<div style={{ marginTop: "16px" }}>
								<HeadingLevel>
									<Heading styleLevel={3}>
										You will need to provide evidence of
										your citizenship via one of the
										following documents
									</Heading>
								</HeadingLevel>
								<ul style={{ paddingLeft: "20px" }}>
									<li style={{ marginTop: "8px" }}>
										<ParagraphMedium>
											Australian drivers' licence
										</ParagraphMedium>
									</li>
									<li style={{ marginTop: "8px" }}>
										<ParagraphMedium>
											Australian passport
										</ParagraphMedium>
									</li>
								</ul>
							</div>
						)}
					>
						<RadioGroup
							value={global.submission.provideResidencyDocument}
							onChange={(e) =>
								updateSubmission(
									`provideResidencyDocument`,
									e.target.value
								)
							}
							name="provideResidencyDocument"
						>
							<Radio value="yes">Yes</Radio>
							<Radio value="no">No</Radio>
						</RadioGroup>
					</FormControl>
				</FormGroup>
			</div>
		</SectionContent>
	);
};

export const config = {
	handle: "residencyConfirmEvidence",
	to: [
		{
			handle: "failResidencyEvidence",
			condition: (submission) =>
				submission.provideResidencyDocument !== "yes",
		},
		{
			handle: "checkPreviousBreastCancer",
			condition: (submission) =>
				submission.provideResidencyDocument === "yes",
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
