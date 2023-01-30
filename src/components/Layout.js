import { styled } from "baseui";

const OutterContainer = styled("div", {
	display: "flex",
	flexWrap: "nowrap",
	flexDirection: "column",
	minHeight: "100vh",
});
const HeadingContainer = styled("div", ({ $theme }) => ({
	flex: "0 0 auto",
	paddingTop: $theme.sizing.scale1000,
	paddingBottom: $theme.sizing.scale1000,
	paddingLeft: $theme.sizing.scale3200,
	paddingRight: $theme.sizing.scale3200,
	backgroundColor: "#fff",
	boxShadow: "0px 2px 20px 0px #0000001A",
	position: "relative",
}));
const ContentContainer = styled("div", ({ $theme }) => ({
	flex: "1 1 auto",
	paddingTop: $theme.sizing.scale1000,
	paddingBottom: $theme.sizing.scale1000,
}));

export const Layout = (props) => {
	return (
		<OutterContainer>
			<HeadingContainer>{props.heading}</HeadingContainer>
			<ContentContainer>{props.children}</ContentContainer>
		</OutterContainer>
	);
};
