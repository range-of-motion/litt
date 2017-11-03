export const addLight = (id, name, on, brightness) => {
    return {
        type: 'ADD_LIGHT',
        id,
        name,
        on,
        brightness
    }
}

export const toggleLight = id => {
    return {
        type: 'TOGGLE_LIGHT',
        id
    }
}

export const updateLightBrightness = (id, brightness) => {
    return {
        type: 'UPDATE_LIGHT_BRIGHTNESS',
        id,
        brightness
    }
}
