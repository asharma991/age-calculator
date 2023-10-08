import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
// import "./index.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800-italic.css";
import "@fontsource/poppins/400-italic.css";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
