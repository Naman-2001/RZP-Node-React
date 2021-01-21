const app = require("express")();
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");

const razorpay = new Razorpay({
  key_id: "rzp_test_tPppRmOaMAbGwD",
  key_secret: "Wmyh7o8eaFz208QwzSh15WFt",
});

app.use(cors());

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
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
