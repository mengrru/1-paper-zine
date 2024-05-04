import { MouseEventHandler, useContext, useEffect, useMemo, useRef, useState } from "react";
import { calculateScaleInRotate90, encodeImageFileAsURL, openFileSelector } from "./utils";
import { GlobalContext } from "./context";

type Props = {
    text: string
    index: number
    isFlip?: boolean
};

export const Grid = ({ isFlip, text, index }: Props) => {
    const { previewerModel: { rowNum, colNum, isPrintMode, pageParam: { WIDTH, HEIGHT, Padding } }, previewerModel } = useContext(GlobalContext);

    const imageURL = useMemo(() => {
        if (!previewerModel.gridData[index]) {
            return "";
        }
        return previewerModel.gridData[index].imageURL;
    }, [previewerModel.gridData[index]?.imageURL]);

    const imageRotateAngle = useMemo(() => {
        if (!previewerModel.gridData[index]) {
            return 0;
        }
        return previewerModel.gridData[index].imageRotateAngle;
    }, [previewerModel.gridData[index]?.imageRotateAngle]);

    const $image = useRef(null);

    const onClickHandler: MouseEventHandler<HTMLDivElement> = () => {
        openFileSelector((inputEvent: Event) => {
            const imageFile = (inputEvent.target as HTMLInputElement).files?.[0];
            encodeImageFileAsURL(imageFile)
                .then(imageURL => {
                    previewerModel.setGridImageURL(index, imageURL);
                });
        })
    }

    const onContextMenuHandler: MouseEventHandler<HTMLImageElement> = (event) => {
        event.preventDefault();
        previewerModel.setGridImageRotateAngle(index, imageRotateAngle - 90);
    }

    useEffect(() => {
        if (!$image.current) {
            return;
        }
        const $img = $image.current as HTMLImageElement;
        const scale = calculateScaleInRotate90(
            (WIDTH - Padding * colNum) / colNum,
            (HEIGHT - Padding * rowNum) / rowNum,
            $img.width, $img.height
        );
        $img.style.transform = `rotate(${imageRotateAngle}deg)${imageRotateAngle % 180 !== 0 ? `scale(${scale})` : ""}`
        $img.style.transformOrigin = "50% 50%";
    }, [imageRotateAngle]);

    return <div
        className={`grid ${(imageURL !== "" || isPrintMode) && "transparentBg"}`}
        style={isFlip
            ? { transform: isFlip ? "rotate(180deg)" : "" }
            : {}
        }
        onClick={onClickHandler}
    >
        <span className={(imageURL !== "" || isPrintMode) ? "opacity-0" : ""}>{text}</span>
        { imageURL !== ""
            && <img
                ref={$image}
                src={imageURL}
                onContextMenu={onContextMenuHandler} />
        }
    </div>
};