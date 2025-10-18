import {useState, useEffect} from "react";
import {
	Text,
	View,
	ViewStyle,
	TextStyle
} from "react-native";
import axios from "axios";

export default function Index() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pi');
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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
