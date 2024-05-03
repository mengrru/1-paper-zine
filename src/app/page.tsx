"use client"

import { GlobalContext } from "./context";
import { usePreviewerModel } from "./usePreviewerModel";
import Previewer from "./previewer";
import { Panel } from "./panel";
import { useMouseCoord } from "./useMouseCoord";

export default function Home() {
  const previewerModel = usePreviewerModel();
  const mouseCoord = useMouseCoord();

  return <GlobalContext.Provider value={{ previewerModel, mouseCoord }}>
    <Panel />
    <Previewer />
  </GlobalContext.Provider>;
}
