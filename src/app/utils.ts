export const encodeImageFileAsURL = (file: File | undefined | null): Promise<string> => {
    if (!file) {
        return Promise.resolve("");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result as string);
        }
    });
};

export const readStringFromFile = (file: File | undefined | null): Promise<string> => {
    if (!file) {
        return Promise.resolve("");
    }
    const reader = new FileReader();
    reader.readAsText(file);

    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result as string);
        }
    });
}

export const calculateScaleInRotate90 = (canvasW: number, canvasH: number, imageW: number, imageH: number) => {
    let ratio = imageW / imageH > canvasW / canvasH
        ? imageW / canvasW
        : imageH / canvasH;
    let scale = imageW / imageH > canvasH / canvasW
        ? canvasH / (imageW / ratio)
        : canvasW / (imageH / ratio);
    return scale;
};

export const getImageWH = (imageURL: string): Promise<{ width: number, height: number }> => {
    const image = new Image();
    image.src = imageURL;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            resolve({ width: image.width, height: image.height });
        }
    });
};

export const downloadString = (fileName: string, text: string) => {
    const blob = new Blob([text], { type: "text/plain" });
  
    const a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/plain", a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
};

export const openFileSelector = (handler: (e: Event) => void) => {
        const $input = document.createElement('input');
        $input.type = "file";
        $input.onchange = handler;
        $input.click();
};

export const generateId = () => {
    return Date.now().toString();
};

export const kebabCaseToLowerCamelCase = (str: string) => {
    const res = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "-") {
            ++i;
            i < str.length && res.push(str[i].toUpperCase());
        } else {
            res.push(str[i]);
        }
    }
    return res.join("");
};
export const lowerCamelCaseToKebabCase = (str: string) => {
    const res = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i].charCodeAt(0) < "a".charCodeAt(0) ) {
            res.push("-");
        }
        res.push(str[i].toLowerCase());
    }
    return res.join("");
};