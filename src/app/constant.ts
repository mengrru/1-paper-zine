export const FourteenPages = {
    type: "14" as LayoutType,
    LayoutConfig: [
        ["BACK COVER", "FRONT COVER", "1", "2"],
        ["6", "5", "4", "3"],
        ["7", "8", "9", "10"],
        ["", "", "12", "11"]
    ],
    WIDTH: 210,
    HEIGHT: 297,
    BASE: 4,

    Padding: 1.5,
};

export const EightPages = {
    type: "8" as LayoutType,
    LayoutConfig: [
        ["FRONT COVER", "BACK COVER", "7", "6"],
        ["2", "3", "4", "5"]
    ],
    WIDTH: 297,
    HEIGHT: 210,
    BASE: 4,

    Padding: 1.5,
};

export const DefaultPageParam = EightPages;

export type LayoutType = "14" | "8"

export const Config = {
    "14": FourteenPages,
    "8": EightPages
}
