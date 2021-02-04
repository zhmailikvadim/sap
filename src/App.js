import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";
import FioriMain from "./FioriMain";
import "@ui5/webcomponents/dist/Assets";
import "@ui5/webcomponents-fiori/dist/Assets"; // only if you are using the ShellBar, Product Switch or the Upload Collection
import '@ui5/webcomponents/dist/Assets.js';
import '@ui5/webcomponents-fiori/dist/Assets.js';
import '@ui5/webcomponents-react/dist/Assets'
import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <FioriMain />
      </ThemeProvider>
    </div>
  );
}

export default App;
