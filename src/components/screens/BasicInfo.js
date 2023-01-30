import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context/global";
import {
	SectionHeading,
	SectionContent,
	FormGroup,
	InputWithValidation,
} from "../shared";

const ScreenHeading = () => {
	return <SectionHeading>Basic Information</SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	const isFirstNameValid = () => {
		return global.submission.firstName !== "";
	};
	const [errorMessage, setErrorMessage] = useState("");
	const handleSubmit = () => {
		if (isFirstNameValid()) {
			dispatch({ type: "NEXT_SCREEN" });
		} else {
			setErrorMessage("First name is required.");
		}
	};
	return (
		<SectionContent>
			<FormGroup>
				<InputWithValidation
					value={global.submission.firstName}
					onChange={(e) =>
						dispatch({
							type: "UPDATE_SUBMISSION",
							payload: { firstName: e.target.value },
						})
					}
					placeholder="First Name"
					required
					isValidFunc={isFirstNameValid}
				/>
			</FormGroup>
			<FormGroup>
				<Input
					value={global.submission.lastName}
					onChange={(e) =>
						dispatch({
							type: "UPDATE_SUBMISSION",
							payload: { lastName: e.target.value },
						})
					}
					placeholder="Last Name"
				/>
			</FormGroup>
			<FormGroup>
				<div>
					{global.submission.firstName} {global.submission.lastName}
				</div>
			</FormGroup>
			<FormGroup>
				<div hidden={errorMessage === ""}>
					<ParagraphSmall>
						We found an error in the form:
					</ParagraphSmall>
					<ParagraphMedium>{errorMessage}</ParagraphMedium>
				</div>
			</FormGroup>
			<FormGroup>
				<Button onClick={handleSubmit}>Next</Button>
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "basicInfo",
	to: [
		{
			handle: "extraInfo1",
			condition: (submission) => {
				return submission.lastName === "";
			},
		},
		{
			handle: "extraInfo2",
			condition: (submission) => {
				return submission.lastName !== "";
			},
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
