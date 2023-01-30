import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";

const ScreenHeading = () => {
	return <SectionHeading>confirmMedicare</SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 13;
	});
	return (
		<SectionContent>
			<FormGroup>Form group</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "confirmMedicare",
	to: [],
	heading: <ScreenHeading />,
	content: <Content />,
};
