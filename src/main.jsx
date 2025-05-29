import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
