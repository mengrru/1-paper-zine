"use client"

import { MouseEventHandler, useContext } from "react";
import { Item } from "./item";
import { Grid } from "./grid";
import { GlobalContext } from "./context";

export default function Previewer() {
    const {
        previewerModel: { colNum, itemData, pageParam: { WIDTH, HEIGHT, BASE, Padding, LayoutConfig } },
        mouseCoord } = useContext(GlobalContext);

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        var rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mouseCoord.setX(e.pageX - rect.left);
        mouseCoord.setY(e.pageY - rect.top);
    };

    return <div className="previewer"
        onMouseMove={onMouseMove}
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${LayoutConfig[0].length}, 1fr)`,
            gridRowGap: `${BASE * Padding * 2}px`,
            gridColumnGap: `${BASE * Padding * 2}px`,
            padding: `${BASE * Padding}px`,
            width: `${BASE * WIDTH}px`,
            height: `${BASE * HEIGHT}px`,
            boxSizing: "border-box"
    }}>
        {
            LayoutConfig.map((row, rowIndex) =>
                row.map((item, colIndex) =>
                    <Grid
                        index={rowIndex * colNum + colIndex}
                        key={rowIndex * colNum + colIndex}
                        text={item}
                        isFlip={rowIndex % 2 === 1} />
                )
            )
        }
        {
            Object.keys(itemData).map((itemId) =>
                <Item id={itemId} key={itemId} />
            )
        }
    </div>;
}
