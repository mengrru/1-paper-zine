import { useState } from "react"

export const useMouseCoord = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    return {
        x,
        y,
        setX,
        setY
    }
}