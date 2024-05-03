"use client"

import { createContext } from "react";
import { usePreviewerModel } from "./usePreviewerModel";
import { useMouseCoord } from "./useMouseCoord";

export const GlobalContext = createContext({} as {
    previewerModel: ReturnType<typeof usePreviewerModel>
    mouseCoord: ReturnType<typeof useMouseCoord>
});