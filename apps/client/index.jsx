import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import { initI18n } from "./utils/i18nUtils";

initI18n().then(() => {
  const root = createRoot(document.getElementById("app"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
