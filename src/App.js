import { BrowserRouter } from "react-router-dom";
import RouterAplication from "./routes.js/indext";
import { Provider } from "react-redux";
import storeUser from "./redux/store/store";


function App() {
  return (
    <div>
      <Provider store={storeUser}>
        <BrowserRouter>
          <RouterAplication />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
