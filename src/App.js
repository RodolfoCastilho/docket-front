import { Dashboard } from "./components/dashboard";
import SnackbarProvider from "react-simple-snackbar";

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Dashboard />
      </SnackbarProvider>
    </div>
  );
}

export default App;
