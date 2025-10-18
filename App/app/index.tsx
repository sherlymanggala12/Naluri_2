import {useState, useEffect} from "react";
import {
	Text,
	View,
	Image,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from "react-native";
import axios from "axios";
import Sun from "../assets/images/sun.png";

interface PiResponse {
	pi: string;
}

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
		if (pi === null) {
			throw new Error("Pi is not available");
		}
		return 2 * pi * radius;
	};

	return (
		<View style={$container}>
			<View>
				<Image source={Sun} style={$sun} />
			</View>
			<View>
				<Text style={$text}>
					Did you know that our sun's circumference is{" "}
					{calculateCircumference(695700, pi)} km?
				</Text>
			</View>
		</View>
	);
}

const $container: ViewStyle = {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#00111a",
  flexDirection: 'row',
};

const $text: TextStyle = {
	fontFamily: "'Nunito Sans', sans-serif",
	color: "#ffffff",
};

const $sun: ImageStyle = {
	width: 200,
	height: 200,
	marginRight: 20,
};
