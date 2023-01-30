import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { useState, useContext, useEffect } from "react";
import Logo from "./images/Logo";
import { StyledLink } from "baseui/link";
import { GlobalContext } from "../context/global";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
import moment from "moment";

export const SectionHeading = (props) => {
	const [css, theme] = useStyletron();
	const [Progress, setProgress] = useState();
	const [global, dispatch] = useContext(GlobalContext);
	const date = global.submission.selectedDate; 
	const clinic = global.submission.selectedClinic;
	useEffect(() => {
		setProgress((global.submission.screen / 40) * 100);
		
	});
	let goBackProps = {};
	if (props.withGoBack) {
		goBackProps.onClick = () => {
			dispatch({ type: "LAST_SCREEN" });
		};
	}
	return (
		<nav className="">
			{/* Progress */}
			<div
				className={css({
					width: "100%",
					position: "absolute",
					left: 0,
					top: 0,
					backgroundColor: "#f0f0f0",
				})}
			>
				{/* Progress */}
				<div
					className={css({
						width: `${Progress}%`,
						height: "1rem",
						backgroundColor: "#d71f85",
						transition: "300ms ease-out",
					})}
				></div>
			</div>
			{/* Clinic Name & Date */}
			{(clinic || date) && (
                <div
                    className={css({
                        maxWidth: "900px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        paddingTop: "2rem",
                    })}
                >
                    <HeadingLevel>
                        <Heading styleLevel={3}>{clinic}</Heading>
                    </HeadingLevel>
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1rem",
                        })}
                    >
                        <p>{moment(date).format("Do MMM")}</p>
                        <p>{moment(date).format("hh:mm a")}</p>
                    </div>
                </div>
            )}
			{/* Navbar */}
			<div
				className={css({
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop: "1rem",
				})}
			>
				<span>
					{props.withGoBack && (
						<StyledLink
							style={{
								color: "#63313c",
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
								fontWeight: "bold",
								gap: "1rem",
							}}
							href="#"
							{...goBackProps}
						>
							<svg
								style={{
									height: "24px",
									width: "24px",
									flexShrink: 0,
								}}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							<span>Go Back</span>
						</StyledLink>
					)}
				</span>
				<span>
					<Logo />
				</span>
			</div>
		</nav>
	);
};

export const SectionContent = (props) => {
	const [css, theme] = useStyletron();
	const [global, dispatch] = useContext(GlobalContext);
	const date = global.submission.selectedDate; 
	const clinic = global.submission.selectedClinic;

	const withNextButton = !!props.withNextButton;
	const nextButtonText = props.nextButtonText ? props.nextButtonText : `Next`;

	const withValidation = !!props.withValidation;
	const [errorMessage, setErrorMessage] = useState("");
	const validate = props.validate
		? props.validate
		: () => {
				return true;
		  };
	const validationMessage = props.validationMessage
		? props.validationMessage
		: () => {
				return "Please check the form.";
		  };
	const handleSubmit = () => {
		if (!withValidation || validate()) {
			dispatch({ type: "NEXT_SCREEN" });
		} else if (withValidation) {
			setErrorMessage(validationMessage());
		}
	};

	return (
		<div
			className={css({
				maxWidth: "900px",
				margin: "0 auto",
				paddingTop: (clinic || date ) ? '8rem' : '0',
				...theme.typography.ParagraphMedium,
			})}
		>
			{props.children}
			{withValidation ? (
				<FormGroup>
					<div hidden={errorMessage === ""}>
						<p>We found an error in the form:</p>
						<p>{errorMessage}</p>
					</div>
				</FormGroup>
			) : null}

			{withNextButton ? (
				<FormGroup>
					<Button onClick={handleSubmit}>{nextButtonText}</Button>
				</FormGroup>
			) : null}
		</div>
	);
};

export const FormGroup = ({ children }) => {
	const [css, theme] = useStyletron();
	return (
		<div
			className={css({
				marginBottom: theme.sizing.scale400,
			})}
		>
			{children}
		</div>
	);
};

// Defining a validation function for Input
export const InputWithValidation = ({ isValidFunc, ...props }) => {
	const [isTouched, setIsTouched] = useState(false);
	return (
		<Input
			{...props}
			onFocus={(e) => setIsTouched(true)}
			error={isTouched && !isValidFunc()}
		></Input>
	);
};
