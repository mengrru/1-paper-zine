import { useContext, useState } from "react";
import { GlobalContext } from "./context";
import { downloadString, openFileSelector, readStringFromFile } from "./utils";
import { Config } from "./constant";

export const Panel = () => {
    const { previewerModel: {
        addItem, removeItem, selectItem, itemData, selectedItem,
        setConfig, pageParam,
        setPadding, setItemStyle,
        isPrintMode, setPrintMode
    }, previewerModel } = useContext(GlobalContext);
    const [isShow, setShow] = useState(false);

    const onImport = () => {
        openFileSelector((e) => {
            const jsonFile = (e.target as HTMLInputElement).files?.[0];
            readStringFromFile(jsonFile)
                .then(res => {
                    previewerModel.import(res);
                })
        });
    };

    const onExport = () => {
        downloadString(`1-paper-zine-${Date.now()}.metadata.json`, previewerModel.export());
    };

    const onAddItem = () => {
        selectItem(addItem());
    };

    const onRemoveItem = () => {
        removeItem(selectedItem);
    };

    const onSwitch = () => {
        if (pageParam.type === "14") {
            setConfig(Config[8]);
        } else {
            setConfig(Config[14]);
        }
    };

    const onPrintMode = () => {
        selectItem("");
        setPrintMode(!isPrintMode);
    };

    return <div className="panel"
        style={{ opacity: isShow ? 1 : 0 }}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
    >
        <button onClick={onSwitch}>Switch to { pageParam.type === "14" ? "8" : "14"}</button>
        <div className="panel-row">
            <button onClick={onImport}>Import</button>
            <button onClick={onExport}>Export</button>
        </div>
        <div className="panel-row">
            <button onClick={onAddItem}>+ Item</button>
            <button onClick={onRemoveItem}>- Item</button>
        </div>
        <div className="panel-row">
            <button onClick={() => setPadding(pageParam.Padding + 0.5)}>+ Padding</button>
            <button onClick={() =>
                pageParam.Padding > 0 && setPadding(pageParam.Padding - 0.5)
            }>- Padding</button>
        </div>
        <button onClick={onPrintMode}>Print mode: { isPrintMode ? "On" : "Off" }</button>
        <textarea
            onChange={(e) => {
                setItemStyle(selectedItem, e.target.value);
            }}
            value={selectedItem === "" ? "" : itemData[selectedItem]?.style} />
    </div>
};