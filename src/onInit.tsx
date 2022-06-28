import { PanelData } from "@grafana/data";
import { Component } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

interface State {
  data: PanelData;
}

class App extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);

    this.onPanelUpdate = this.onPanelUpdate.bind(this);
  }

  componentDidMount() {
    htmlNode.addEventListener("panelupdate", this.onPanelUpdate);
  }

  componentWillUnmount() {
    htmlNode.removeEventListener("panelupdate", this.onPanelUpdate);
  }

  onPanelUpdate() {
    this.setState({ data: data });
  }

  render() {
    const value = data.series[0]?.fields[1]?.state?.calcs?.last;
    return <div>Value: {value ?? "No data"}</div>;
  }
}

createRoot(htmlNode.children[1]).render(<App />);
