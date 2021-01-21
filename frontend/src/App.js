import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Razorpay from "razorpay";

const loadScript = (src) => {
  // https://checkout.razorpay.com/v1/checkout.js
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function App() {
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Can't load razorpay right now. Try again later");
      return;
    }

    const data = await fetch("http://localhost:8000/razorpay", {
      method: "POST",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data);

    // rzp_test_tPppRmOaMAbGwD
    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.amount, //100Rs
      currency: data.currency,
      name: "CodeX",
      description: "Please support us by donating us just 100 RS.",
      image: "http://localhost:8000/logo.svg",
      order_id: data.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Naman Aggarwal",
      },
      // notes: {
      //     address: "Razorpay Corporate Office"
      // },
      // theme: {
      //     color: "#3399cc"
      // }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate 100 Rs.
        </a>
      </header>
    </div>
  );
}

export default App;
