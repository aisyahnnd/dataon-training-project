import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextWrapper } from "@/Context";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "@/Utils/Libraries/i18n";
import "./index.css";

Sentry.init({
  dsn: "https://be0c199315614344af962b77cc782fae@o1365819.ingest.sentry.io/6667472",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>
);
