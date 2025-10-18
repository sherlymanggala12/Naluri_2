const express = require("express");
const cors = require("cors");
const { createClient } = require("redis");
const Decimal = require("decimal.js");

const app = express();
const port = 3000;

app.use(cors());

// Connect to Redis
const redis = createClient({ url: "redis://127.0.0.1:6379" }); // Redis port 6379
redis.on("error", (err) => console.error("Redis error:", err));

(async () => {
  await redis.connect();
  console.log("Redis connected");

  // Using Nilakantha formula to calculate Pi
  function calculatePi(iterations) {
    Decimal.set({ precision: 5000 });
    let pi = new Decimal(3);
    let x = 1;

    for (let n = 2; n <= iterations * 2; n += 2) {
      const temp = new Decimal(4)
        .div(new Decimal(n).times(n + 1).times(n + 2))
        .times(x);
      pi = pi.plus(temp);
      x = -x;
    }
    return pi;
  }

  app.get("/pi", async (req, res) => {
    let iterations = parseInt((await redis.get("iterations")) || "0", 10);
    iterations += 1000; // increase for next precision
    const pi = calculatePi(iterations);

    await redis.set("pi", pi.toString());

    res.json({
      pi: pi.toString(),
      // pi: "test"
    });
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();