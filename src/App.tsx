import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <h1>Age Calculator</h1>
    </ChakraProvider>
  );
}

export default App;
