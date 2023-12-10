import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
} from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";

const createApolloClient = (authToken) => {
  console.log("ENV ADMIN SECRET ", process.env.REACT_APP_HASURA_ADMIN_SECRET);
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_URI,
      headers: {
        // For production app this should saved on server as environment variable
        "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN_SECRET,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
