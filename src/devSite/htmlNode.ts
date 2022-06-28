import type { HTMLNode } from "../../types/htmlgraphicsTypes/htmlNode.d";
import html from "../html.html";

const shadowContainer = document.querySelector("#shadow-container");
if (!shadowContainer) throw new Error("Could not find shadow container.");

window.htmlNode = shadowContainer.attachShadow({ mode: "open" }) as HTMLNode;

htmlNode.onpanelupdate = () => {
  // Do nothing
};
htmlNode.innerHTML = `<style>@import "build/style.css"</style><div>${html}</div>`;
