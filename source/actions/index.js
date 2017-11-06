export const addLight = (id, uid, name, on, brightness) => {
    return {
        type: 'ADD_LIGHT',
        id,
        uid,
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

export const updateName = (id, name) => {
    return {
        type: 'UPDATE_NAME',
        id,
        name
    }
}
