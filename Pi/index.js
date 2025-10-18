const express = require("express");
const { createClient } = require("redis");

const app = express();
const port = 3000;

// Connect to Redis
const redis = createClient({ url: "redis://127.0.0.1:6379" }); // Redis port 6379
redis.on("error", (err) => console.error("Redis error:", err));

let iterations = 0;

(async () => {
  await redis.connect();
  console.log("Redis connected");

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

    await redis.set("pi", pi.toString());

    res.json({
      pi: pi.toString(),
    });
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();