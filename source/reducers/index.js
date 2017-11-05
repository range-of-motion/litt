import { combineReducers } from 'redux'

const lights = (state = [], payload) => {
    switch (payload.type) {
        case 'ADD_LIGHT':
            return [...state, {
                id: payload.id,
                uid: payload.uid,
                name: payload.name,
                on: payload.on,
                brightness: payload.brightness
            }]

        case 'TOGGLE_LIGHT':
            return state.map(light => {
                if (light.id === payload.id) {
                    return { ...light, on: !light.on }
                }

                return light
            })

        case 'UPDATE_LIGHT_BRIGHTNESS':
            return state.map(light => {
                if (light.id === payload.id) {
                    return { ...light, brightness: payload.brightness }
                }

                return light
            })

        default:
            return state
    }
}

const reducers = combineReducers({
    lights
})

export default reducers
