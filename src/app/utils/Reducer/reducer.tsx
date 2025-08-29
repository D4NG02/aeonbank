import { reducerCases } from "./Constant"

export interface stateType {
    login: { success: boolean, message: string },
}
export interface actionType { type: string, payload: any }

export const state: stateType = {
    login: { success: false, message: "Not login" },
}

const reducer = (state: stateType, action: actionType) => {
    switch (action.type) {
        case reducerCases.SET_LOGIN:
            return { ...state, login: action.payload }

        default:
            console.log("Error reducerCases type")
            break;
    }
}

export default reducer