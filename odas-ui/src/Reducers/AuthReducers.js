export const registerReducer = (state = [], action) => {
    switch (action.type) {
        case 'REGISTER':
            return [...state, action.payload];
        case 'LOGIN':
            return [...state, action.payload];
        default:
            return state;
    }
};