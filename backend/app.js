const app = require("express")();
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const boyParser = require("body-parser");
const bodyParser = require("body-parser");

const razorpay = new Razorpay({
  key_id: "rzp_test_tPppRmOaMAbGwD",
  key_secret: "Wmyh7o8eaFz208QwzSh15WFt",
});

app.use(cors());
app.use(bodyParser.json());

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

app.post("/verification", (req, res) => {
  const secret = "Naman076";
  console.log(req.body);

  const crypto = require("crypto");
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  console.log(digest, req.headers["x-razorpay-signature"]);
  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("Legit payment");
    res.json({ status: "ok" });
  } else {
    res.status(502).json({ message: "req. not legit dear" });
    console.log("|nhi bhai galat hai");
  }
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 100;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  const response = await razorpay.orders.create(options);
  console.log(response);
  return res.status(200).json({
    id: response.id,
    currency: "INR",
    amount: response.amount,
  });
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
