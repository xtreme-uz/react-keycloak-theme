import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { kcContext } from "./kcContext";
import KcApp from "KcApp";

if( kcContext === undefined ){
    throw new Error(
        "This app is a Keycloak theme" +
        "It isn't meant to be deployed outside of Keycloak"
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <KcApp kcContext={kcContext} />
    </StrictMode>
);
