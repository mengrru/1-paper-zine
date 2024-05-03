import { CSSProperties, MouseEventHandler, useContext, useMemo, useState } from "react";
import { GlobalContext } from "./context";
import { kebabCaseToLowerCamelCase, lowerCamelCaseToKebabCase } from "./utils";

type Props = {
    id: string
};

export const Item = ({ id }: Props) => {
    const { previewerModel: { selectItem, setItemStyle, selectedItem, itemData }, mouseCoord: { x, y } } = useContext(GlobalContext);

    const [isDragOn, setDragOn] = useState(false);
    const [innerMouseCoord, setInnerCurMouseCoord] = useState({ x: 0, y: 0 });

    const style = useMemo(() => {
        return styleStringToCSSPropertiesObject(itemData[id].style);
    }, [itemData[id].style]);

    const [newStyle, setNewStyle] = useState({});

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        setDragOn(true);

        var rect = (e.target as HTMLDivElement).getBoundingClientRect();
        setInnerCurMouseCoord({ x: e.pageX - rect.left, y: e.pageY - rect.top });
        selectItem(id);
    };

    const onMouseUp = () => {
        setDragOn(false);
        setItemStyle(id, CSSPropertiesObjectToStyleString({
            ...style,
            ...newStyle
        }));
    };

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (!isDragOn) {
            return;
        }
        setNewStyle({
            top: `${y - innerMouseCoord.y}px`,
            left: `${x - innerMouseCoord.x}px`
        });
    };

    return <div
        className="item"
        style={{...style, ...newStyle, outline: selectedItem === id ? "1px solid #000" : "none" }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
    >{style.content}</div>;
}

const styleStringToCSSPropertiesObject = (styleStr: string) => {
    return styleStr.replace(/\n/g, "").split(";")
        .map(kv => kv.split(":"))
        .reduce((acc, e) => {
            acc[kebabCaseToLowerCamelCase(e[0])] = e[1];
            return acc;
        }, {} as any) as CSSProperties;
}

const CSSPropertiesObjectToStyleString = (obj: CSSProperties) => {
    return Object.keys(obj)
        .reduce((acc, key) => {
            const value = obj[key as keyof CSSProperties];
            if (value === undefined) {
                return acc;
            }
            return `${acc}${lowerCamelCaseToKebabCase(key)}:${value};\n`;
        }, "");
};