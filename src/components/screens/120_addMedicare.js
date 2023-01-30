import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";
import { FormControl } from "baseui/form-control";
import { Heading, HeadingLevel } from "baseui/heading";
import { RadioGroup, Radio } from "baseui/radio";
import { Input, SIZE, ADJOINED } from "baseui/input";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 12;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	return (
		<SectionContent withNextButton>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Do you have a Medicare card?
						<span style={{ color: "#CF5D5D" }}>*</span>
					</Heading>
				</HeadingLevel>
				<FormControl>
					<RadioGroup
						value={
							global.submission.hasMedicareCard
								? "yes" : "no"
						}
						onChange={(e) =>
							updateSubmission(
								`hasMedicareCard`,
								e.target.value === "yes"
							)
						}
						name="hasMedicareCard"
					>
						<Radio value="yes">Yes</Radio>
						<Radio value="no">No</Radio>
					</RadioGroup>
				</FormControl>

				{global.submission.hasMedicareCard ? (
					<FormGroup>
						<HeadingLevel>
							<Heading styleLevel={3}>
								Medicare Card Number
							</Heading>
						</HeadingLevel>
						<FormControl>
							<Input
								value={global.submission.medicareNumber}
								onChange={(e) =>
									updateSubmission(
										`medicareNumber`,
										e.target.value
									)
								}
							/>
						</FormControl>
					</FormGroup>
				) : null}

				{global.submission.hasMedicareCard ? (
					<FormGroup>
						<HeadingLevel>
							<Heading styleLevel={3}>
								Medicare Card Expiry
							</Heading>
						</HeadingLevel>
						<FormControl>
							<Input
								placeholder="MM/YY"
								value={global.submission.medicareExpiry}
								onChange={(e) =>
									updateSubmission(
										`medicareExpiry`,
										e.target.value
									)
								}
							/>
						</FormControl>
					</FormGroup>
				) : null}

				{global.submission.hasMedicareCard ? (
					<FormGroup>
						<HeadingLevel>
							<Heading styleLevel={3}>Medicare Card Ref</Heading>
						</HeadingLevel>
						<FormControl>
							<Input
								value={global.submission.medicareReference}
								onChange={(e) =>
									updateSubmission(
										`medicareReference`,
										e.target.value
									)
								}
							/>
						</FormControl>
					</FormGroup>
				) : null}
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "addMedicare",
	to: [
		{
			handle: "residencyType",
			condition: (submission) => !submission.hasMedicareCard,
		},
		{
			handle: "checkPreviousBreastCancer",
			condition: (submission) => submission.hasMedicareCard,
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
