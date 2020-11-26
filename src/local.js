// handles local storage API

const PRESETS = "PRESETS";

// check if local storage is available
let hasLocalStorage = true;
var test = "test";
try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
} catch (e) {
    hasLocalStorage = false;
}

const loadPresets = () => {
    if (hasLocalStorage) {
        let presets = window.localStorage.getItem(PRESETS);
        if (presets) {
            return JSON.parse(presets);
        }
        return [];
    }
    return [];
};
const setPresets = (presets) => {
    if (hasLocalStorage) {
        window.localStorage.setItem(PRESETS, JSON.stringify(presets));
    }
};

export const savePreset = (preset) => {
    let presets = loadPresets();
    presets = [...presets, preset];
    setPresets(presets);
};

export const getPresets = () => {
    return loadPresets();
};

export const deletePreset = (index) => {
    let presets = loadPresets();

    let newPresets = presets.filter((v, i) => {
        return i !== index;
    });

    setPresets(newPresets);
};
