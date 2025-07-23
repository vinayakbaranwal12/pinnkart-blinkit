import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import "./index.css"; // Ensure your CSS file is imported

// import { createRoot } from 'react-dom/client';
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
