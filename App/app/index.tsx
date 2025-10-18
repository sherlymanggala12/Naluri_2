import {Text, View, ViewStyle} from "react-native";

export default function Index() {
	return (
		<View style={$container}>
			<Text style={$text}>Did you know that our sun's circumference is</Text>
		</View>
	);
}

const $container: ViewStyle = {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#00111a",
};

const $text: TextStyle = {
  fontFamily: "'Nunito Sans', sans-serif",
  color: "#ffffff",
};
