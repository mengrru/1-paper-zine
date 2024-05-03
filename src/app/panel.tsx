import { useContext, useState } from "react";
import { GlobalContext } from "./context";
import { downloadString, openFileSelector, readStringFromFile } from "./utils";

export const Panel = () => {
    const { previewerModel } = useContext(GlobalContext);
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
        downloadString(`1-pager-zine-${Date.now()}.metadata.json`, previewerModel.export());
    }

    const onAddItem = () => {
        previewerModel.addItem();
    }

    const onRemoveItem = () => {
    }

    return <div className="panel"
        style={{ opacity: isShow ? 1 : 0 }}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
    >
        <button onClick={onImport}>import</button>
        <button onClick={onExport}>export</button>
        <button onClick={onAddItem}>+ item</button>
        <button onClick={onRemoveItem}>- item</button>
        <textarea
            onChange={(e) => {
                previewerModel.setItemStyle(previewerModel.selectedItem, e.target.value);
            }}
            value={previewerModel.itemData[previewerModel.selectedItem]?.style} />
    </div>
};