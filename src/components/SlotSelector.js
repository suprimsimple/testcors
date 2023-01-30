import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { ParagraphSmall } from "baseui/typography";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { GlobalContext } from "../context/global";

const SlotSelector = ({ clinicId, clinicName, clinicAddress }) => {
	const [global, dispatch] = useContext(GlobalContext);
	const [css] = useStyletron();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [rawSlots, setRawSlots] = useState([]);
	const [showSeeAll, setShowSeeAll] = useState(false);
	const [times, setTimes] = useState(8);
	var _ = require("lodash");

	const getDate = window.localStorage.getItem("preferredDate") || new Date();
	const [preferredDate, setpreferredDate] = useState(getDate);

	let dates = [0, 1, 2, 3, 4].map((i) => {
		return moment(preferredDate).dayOfYear() + i;
	});

	let datesWeGetFromInput = dates.map((j) => {
		return moment().dayOfYear(j)._d;
	});

	const PrevFive = () => {
		setIsLoaded(false);
		setpreferredDate(moment(preferredDate).subtract(5, "day")._d);
		dates = [5, 4, 3, 2, 1].map((i) => {
			return moment(preferredDate).dayOfYear() - i;
		});
		datesWeGetFromInput = dates.map((j) => {
			return moment().dayOfYear(j)._d;
		});
	};

	const NextFive = () => {
		setIsLoaded(false);
		setpreferredDate(moment(preferredDate).add(5, "day")._d);
		dates = [0, 1, 2, 3, 4].map((i) => {
			return moment(preferredDate).dayOfYear() + i;
		});
		datesWeGetFromInput = dates.map((j) => {
			return moment().dayOfYear(j)._d;
		});
	};

	useEffect(() => {
		setTimeout(() => {
			fetch(
				`https://www.breastscreen.sa.gov.au/actions/simple/booking/clinic-availability?start=${moment(
					datesWeGetFromInput[0]
				).format("YYYY-MM-DD")}&end=${moment(
					datesWeGetFromInput[4]
				).format("YYYY-MM-DD")}&id=${clinicId}`
			)
				.then((rawSlots) => rawSlots.json())
				.then(
					(result) => {
						setIsLoaded(true);
						setRawSlots(result);
					},
					// Note: it's important to handle errors here
					// instead of a catch() block so that we don't swallow
					// exceptions from actual bugs in components.
					(error) => {
						setIsLoaded(true);
						setError(error);
					}
				);
		}, 750);
		setShowSeeAll(true);
		setTimes(8);
	}, [clinicId, preferredDate]);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		const formData = rawSlots.map((slot) => {
			return slot.from;
		});
		const dayOfWeek = (item) => moment(item).format("DD-MM");
		const groupedArray = _(formData)
			.groupBy(dayOfWeek)
			.mapValues((items) => _.map(items))
			.value();

		return (
			<div
				style={{ scrollMarginTop: "2rem" }}
				id={`clinic-${clinicId}`}
				className={`bae-calendar-container`}
			>
				<section
					className={css({
						padding: "2rem 1rem",
						overflowX: "auto",
					})}
				>
					<article
						className={css({
							width: "628px",
							borderTop: "4px solid #D71F85",
							paddingTop: "3rem",
							margin: "0 auto",
							textAlign: "center",
						})}
					>
						<HeadingLevel>
							<Heading styleLevel={1}>
								<span className="hotPink">
									{clinicName || "Clinic"}
								</span>
							</Heading>
							<ParagraphSmall>
								{clinicAddress || "Address"}
							</ParagraphSmall>
						</HeadingLevel>
						<article
							className={css({
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
								gap: "1rem",
								marginTop: "40px",
							})}
						>
							<button
								onClick={() => PrevFive()}
								className={css({
									width: "2.5rem",
									height: "5rem",
									background: "#63313C",
									color: "white",
									borderRadius: "6px",
									border: "none",
									cursor: "pointer",
								})}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className={css({
										height: "1.5rem",
										width: "1.5rem",
									})}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							{/* The Table */}
							<div
								className="table"
								style={{
									flex: "1",
									textAlign: "center",
									position: "relative",
									overflow: "hidden",
								}}
							>
								{/* 2 Bars */}
								<div className="grayBar1"></div>
								<div className="grayBar2"></div>
								{/* Top Row */}
								<div
									className={css({
										width: "100%",
										display: "grid",
										gridTemplateColumns: "repeat(5,1fr)",
									})}
								>
									{datesWeGetFromInput
										.slice(0, 5)
										.map((days, i) => (
											<div
												key={`days-${i}`}
												className={css({
													padding: "0.875rem 0.5rem",
													display: "flex",
													flexDirection: "column",
													justifyContent: "center",
													alignItems: "center",
												})}
											>
												<p
													className={css({
														fontSize: "1.25rem",
														fontWeight: 700,
														margin: 0,
														padding: 0,
													})}
												>
													{moment(days).format("ddd")}
												</p>
												<p
													className={css({
														fontSize: "1.25rem",
														fontWeight: 400,
														margin: 0,
														padding: 0,
													})}
												>
													{moment(days).format(
														"DD MMM"
													)}
												</p>
											</div>
										))}
								</div>
								{/* Times */}
								<div
									className={css({
										position: "relative",
										overflow: "hidden",
									})}
								>
									{/* Lines */}
									<div className="grayLines">
										{[
											0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
											11,
										].map((i) => (
											<div
												key={i}
												className={css({
													top: `${i * 50}px`,
												})}
											></div>
										))}
									</div>
									{isLoaded ? (
										<div
											className={css({
												width: "100%",
												display: "grid",
												gridTemplateColumns:
													"repeat(5,1fr)",
											})}
										>
											{datesWeGetFromInput.map((d) => (
												<div key={d}>
													{groupedArray[
														moment(d).format(
															"DD-MM"
														)
													]
														?.slice(0, times)
														.map((d1) => (
															<div
																id="times"
																key={d1}
																className={css({
																	position:
																		"relative",
																	height: "50px",
																})}
															>
																<input
																	className={css(
																		{
																			position:
																				"absolute",
																			inset: 0,
																			height: "50px",
																			width: "100%",
																			opacity:
																				"0",
																			cursor: "pointer",
																		}
																	)}
																	type="radio"
																	onChange={() => {global.submission.selectedDate = d1; global.submission.selectedClinic = clinicName  }}
																	name="time"
																	id={moment(
																		d1
																	).format(
																		"hh-mm-ddd"
																	)}
																	value={moment(
																		d1
																	).format(
																		"hh-mm-ddd"
																	)}
																/>
																<div
																	className={css(
																		{
																			position:
																				"relative",
																			height: "50px",
																			display:
																				"grid",
																			placeItems:
																				"center",
																			transform:
																				"translateY(1px)",
																			pointerEvents:
																				"none",
																		}
																	)}
																>
																	{moment(
																		d1
																	).format(
																		"hh:mm a"
																	)}
																</div>
															</div>
														))}
												</div>
											))}
										</div>
									) : (
										<>
											{[0, 1, 2, 3, 4].map((i) => (
												<div
													className="pulse"
													key={i}
													style={{
														width: "100%",
														display: "grid",
														gridTemplateColumns:
															"repeat(5,1fr)",
													}}
												>
													{[0, 1, 2, 3, 4].map(
														(j) => (
															<div
																key={j}
																style={{
																	height: "50px",
																	display:
																		"grid",
																	placeItems:
																		"center",
																}}
															>
																<div
																	style={{
																		width: "80%",
																		height: "0.5rem",
																		background:
																			"rgba(99, 49, 60, 0.5)",
																		borderRadius:
																			"999px",
																	}}
																></div>
															</div>
														)
													)}
												</div>
											))}
										</>
									)}
								</div>
								{/* See All */}
								{showSeeAll && isLoaded && (
									<div
										className={css({
											display: "grid",
											placeItems: "center",
											padding: "1.5rem 0",
											borderTop: "1px solid #63313C",
											borderBottom: "1px solid #63313C",
										})}
									>
										<button
											onClick={() => {
												setTimes(12);
												setShowSeeAll(false);
											}}
											className={css({
												padding: "0.5rem 3rem",
												fontSize: "1.25rem",
												color: "white",
												background: "#63313C",
												borderRadius: "999px",
												border: "none",
												cursor: "pointer",
											})}
										>
											See all Times
										</button>
									</div>
								)}
							</div>
							<button
								onClick={() => NextFive()}
								className={css({
									width: "2.5rem",
									height: "5rem",
									background: "#63313C",
									color: "white",
									borderRadius: "6px",
									border: "none",
									cursor: "pointer",
								})}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className={css({
										height: "1.5rem",
										width: "1.5rem",
									})}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</article>
					</article>
				</section>
			</div>
		);
	}
};

export default SlotSelector;
