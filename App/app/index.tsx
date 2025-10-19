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
import {LinearGradient} from "expo-linear-gradient";

interface PiResponse {
	pi: string;
}

const {width, height} = Dimensions.get("window");

const generateStars = (count = 50) => {
	return Array.from({length: count}).map(() => ({
		left: Math.random() * width,
		top: Math.random() * height,
		size: Math.random() * 2 + 1,
		delay: Math.random() * 4000,
	}));
};

export default function Index() {
	const [pi, setPi] = useState<number | null>(3.14);
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

	const stars = useRef(generateStars(70)).current;
	const opacities = useRef(stars.map(() => new Animated.Value(0))).current;

	useEffect(() => {
		opacities.forEach((opacity, index) => {
			const fade = () => {
				Animated.sequence([
					Animated.timing(opacity, {
						toValue: 1,
						duration: 1500,
						delay: stars[index].delay,
						useNativeDriver: true,
					}),
					Animated.timing(opacity, {
						toValue: 0,
						duration: 1500,
						useNativeDriver: true,
					}),
				]).start(() => fade());
			};
			fade();
		});
	}, []);

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
		return pi ? (2 * pi * radius).toString() : "0";
	};

	return (
		<LinearGradient
			colors={["#020E1C", "#0A1F30"]}
			start={{x: 0, y: 0}}
			end={{x: 1, y: 1}}
			style={$container}
		>
			{stars.map((star, index) => (
				<Animated.View
					key={index}
					style={[
						$star,
						{
							left: star.left,
							top: star.top,
							width: star.size,
							height: star.size,
							opacity: opacities[index],
						},
					]}
				/>
			))}
			<View style={$textContainer}>
				<Text style={$text}>
					With our latest calculation of {"\n"}
					<Text style={$textOrange}>pi = {pi}</Text>,{"\n\n"}
					did you know that our sun's circumference is {"\n"}
					<Text style={$textOrange}>{calculateCircumference()} km</Text>?
				</Text>
			</View>

			<View style={$imageContainer}>
				<Animated.Image
					source={require("../assets/images/sun.png")}
					style={[$sun, {transform: [{rotate: spin}]}]}
				/>
			</View>
		</LinearGradient>
	);
}

const $container: ViewStyle = {
	flex: 2,
	justifyContent: "center",
	alignItems: "center",
	flexDirection: width > 768 ? "row" : "column",
	overflow: "hidden",
	padding: width * 0.2,
};

const $textContainer: ViewStyle = {
	flex: width > 768 ? 1 : 0.5,
	justifyContent: "flex-end",
	alignItems: "flex-end",
	zIndex: 2,
};

const $text: TextStyle = {
	fontFamily: "Lato, sans-serif",
	color: "#ffffff",
	fontSize: width > 768 ? 24 : 18,
	textAlign: "center",
};

const $textOrange: TextStyle = {
	color: "#FFA500",
	fontSize: width > 768 ? 28 : 22,
};

const $imageContainer: ViewStyle = {
	flex: width > 768 ? 1 : 1.5,
	justifyContent: "flex-start",
	alignItems: "flex-start",
	zIndex: 2,
};

const $sun: ImageStyle = {
	width: width * (width > 768 ? 0.3 : 0.5),
	height: width * (width > 768 ? 0.3 : 0.5),
	...(width > 768 ? {marginLeft: width * 0.1} : {marginTop: width * 0.1}),
};

const $star: ViewStyle = {
	position: "absolute",
	backgroundColor: "white",
	borderRadius: 10,
	zIndex: 1,
};
