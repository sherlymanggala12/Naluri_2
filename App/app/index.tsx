import {useState, useEffect, useRef} from "react";
import {
	Text,
	View,
	Animated,
	Easing,
	Dimensions,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from "react-native";
import axios from "axios";

interface PiResponse {
	pi: string;
}

const {width} = Dimensions.get("window");

export default function Index() {
	const [pi, setPi] = useState<number | null>(3.14); // using default value of 3.14 for pi

	const spinAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animate = () => {
			spinAnimation.setValue(0);
			Animated.timing(spinAnimation, {
				toValue: 1,
				duration: 10000,
				useNativeDriver: true,
				easing: Easing.linear,
			}).start(({ finished }) => {
				if (finished) {
					fetchData();
					animate();
				}
			});
		};
		animate();
	}, [spinAnimation]);

	const spin = spinAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const fetchData = async () => {
		try {
			const response = await axios.get<PiResponse>("http://localhost:3000/pi");
			setPi(parseFloat(response.data.pi));
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const calculateCircumference = () => {
		const radius = 695700;
		return pi ? 2 * pi * radius : 0;
	};

	return (
		<View style={$container}>
			<View style={$textContainer}>
				<Text style={$text}>
					With our latest calculation of <br/>pi = {pi},<br /><br />
          did you know that our sun's circumference is {calculateCircumference()} km?
				</Text>
			</View>
			<View style={$imageContainer}>
				<Animated.Image
					source={require("../assets/images/sun.png")}
					style={[$sun, {transform: [{rotate: spin}]}]}
				/>
			</View>
		</View>
	);
}

const $container: ViewStyle = {
	flex: 2,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#00111a",
	flexDirection: width > 768 ? "row" : "column",
	overflow: "hidden",
	padding: 30,
};

const $textContainer: ViewStyle = {
	flex: width > 768 ? 1 : 0.5,
	justifyContent: "flex-end",
	alignItems: "flex-end",
};

const $text: TextStyle = {
	fontFamily: "'Nunito Sans', sans-serif",
	color: "#ffffff",
	fontSize: width > 768 ? 24 : 18,
	textAlign: "center",
};

const $imageContainer: ViewStyle = {
	flex: width > 768 ? 1 : 1.5,
	justifyContent: "flex-start",
	alignItems: "flex-start",
};

const $sun: ImageStyle = {
	width: width * (width > 768 ? 0.3 : 0.5),
	height: width * (width > 768 ? 0.3 : 0.5),
	...(width > 768 ? {marginLeft: 20} : {marginTop: 20}),
};
