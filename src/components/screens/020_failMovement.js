import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";

const ScreenHeading = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 2;
	});
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	return (
		<SectionContent>
			<FormGroup>Sorry!</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "failMovement",
	to: [],
	heading: <ScreenHeading />,
	content: <Content />,
};
