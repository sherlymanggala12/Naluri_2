import {Text, View, ViewStyle} from "react-native";

export default function Index() {
	return (
		<View style={$container}>
			<Text style={{color: "#ffffff"}}>Test</Text>
		</View>
	);
}

const $container: ViewStyle = {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#00111a",
};
