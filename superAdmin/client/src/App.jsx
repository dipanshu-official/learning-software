import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import SuperAdminPanel from "./components/superAdmin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SuperAdminPanel />
    </> 
  );
}

export default App;
