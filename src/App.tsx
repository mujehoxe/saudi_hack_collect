import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import ReduxProvider from "./redux/provider";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="742965658475-cfnd1hr6ot40pvbrohuhrana60uhtad1.apps.googleusercontent.com">
      <ReduxProvider>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2000,

            style: {
              fontSize: 16,
              textAlign: "center",
            },
          }}
        />
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
