import {useState, useEffect} from "react";
import {
	Text,
	View,
	Image,
	Dimensions,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from "react-native";
import axios from "axios";
import Sun from "../assets/images/sun.png";

interface PiResponse {
	pi: string;
}

const {width} = Dimensions.get("window");

export default function Index() {
	const [pi, setPi] = useState<number | null>(3.14); // using default value of 3.14 for pi

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get<PiResponse>("http://localhost:3000/pi");
			setPi(parseFloat(response.data.pi));
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const calculateCircumference = async (radius: number, pi: number | null) => {
		return pi ? 2 * pi * radius : null;
	};

	return (
		<View style={$container}>
			<Text style={$text}>
				Did you know that our sun's circumference is{" "}
				{calculateCircumference(695700, pi)} km?
			</Text>
			<Image source={Sun} style={$sun} />
		</View>
	);
}

const $container: ViewStyle = {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#00111a",
	flexDirection: width > 768 ? "row" : "column",
	overflow: "hidden",
  padding: 20
};

const $text: TextStyle = {
	fontFamily: "'Nunito Sans', sans-serif",
	color: "#ffffff",
};

const $sun: ImageStyle = {
	width: width * (width > 768 ? 0.3 : 0.5),
	height: width * (width > 768 ? 0.3 : 0.5),
	...(width > 768 ? {marginLeft: 20} : {marginTop: 20}),
};
