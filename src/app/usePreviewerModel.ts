import { useState } from "react";
import { DefaultPageParam } from "./constant";
import { generateId } from "./utils";

type PreviewerModel = {
    pageParam: typeof DefaultPageParam
    gridData: { imageURL: string, imageRotateAngle: number }[]
    itemData: { [id: string]: { style: string } }
};

export const usePreviewerModel = () => {
    const [pageParam, setPageParam] = useState(DefaultPageParam);
    const [gridData, setGridData] = useState<PreviewerModel["gridData"]>([]);
    const [itemData, setItemData] = useState<PreviewerModel["itemData"]>({});
    const [selectedItem, setSelectedItem] = useState("");

    return {
        pageParam,
        gridData,
        itemData,
        selectedItem,

        rowNum: pageParam.LayoutConfig.length,
        colNum: pageParam.LayoutConfig[0].length,

        setPadding (value: number) {
            setPageParam(prev => {
                prev.Padding = value;
                return { ...prev };
            });
        },

        setConfig (config: PreviewerModel["pageParam"]) {
            setPageParam(() => {
                return { ...config };
            });
        },

        selectItem (id: string) {
            setSelectedItem(id);
        },

        addItem () {
            const id = generateId();
            setItemData(prev => {
                prev[id] = { style: "" };
                return { ...prev };
            });
            return id;
        },

        removeItem (id: string) {
            setItemData(prev => {
                delete prev[id];
                return { ...prev };
            });
        },

        setItemStyle (id: string, style: string) {
            setItemData(prev => {
                const item = prev[id];
                if (!item) {
                    return prev;
                }
                item.style = style;
                return { ...prev };
            })
        },

        setGridImageURL (index: number, imageURL: string) {
            setGridData(prev => {
                if (!prev[index]) {
                    prev[index] = { imageURL, imageRotateAngle: 0 }
                } else {
                    prev[index].imageURL = imageURL;
                }
                return [ ...prev ];
            });
        },

        setGridImageRotateAngle (index: number, imageRotateAngle: number) {
            setGridData(prev => {
                if (!prev[index]) {
                    prev[index] = { imageURL: "", imageRotateAngle }
                } else {
                    prev[index].imageRotateAngle = imageRotateAngle;
                }
                return [ ...prev ];
            });
        },

        emptyGridData () {
            setGridData([]);
        },

        import (json: string) {
            const res = JSON.parse(json) as PreviewerModel;
            if (!res.gridData || !res.pageParam) {
                return;
            }
            setPageParam(res.pageParam);
            setGridData(res.gridData);
            setItemData(res.itemData);
        },

        export (): string {
            return JSON.stringify({
                gridData,
                pageParam,
                itemData,
                version: 1
            });
        }
    }
};