const express = require("express");

const app = express();
const port = 3000;

let iterations = 0;

// Using Nilakantha formula to calculate Pi
function calculatePi(iterations) {
	let pi = 3;
	let x = 1;

	for (let n = 2; n <= iterations * 2; n += 2) {
		const temp = (4 / (n * (n + 1) * (n + 2))) * x;
		pi += temp;
		x = -x;
	}
	return pi;
}

app.get("/pi", async (req, res) => {
	iterations += 1000; // increase for next precision
	const pi = calculatePi(iterations);

	res.json({
		pi: pi.toString(),
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
