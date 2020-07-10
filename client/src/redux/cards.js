import axios from "axios";

const cardsAxios = axios.create();


const setForSet = "/api/cards/";

cardsAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    // console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const initialState = {
    loading: true,
    errMsg: "",
    data: []
}

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CARDS":
            return {
                ...state,
                data: [...action.cards],
                loading: false
            }

        case "NEW_CARD":
            return {
                data: [...state.data, action.card],
                loading: false
            }

        case "EDIT_CARD":
            return {
                ...state,
                data: state.data.map(card => {
                    if (card._id === action.id) {
                        return action.updatedCard
                    } else {
                        return card
                    }
                })
            }

        case "REMOVE_CARD":
            return {
                data: state.data.filter(card => card._id !== action.id)
            }
        case "ERR_MSG":
            return {
                ...state,
                loading: false,
                errMsg: action.errMsg
            }
        default:
            return state;
    }
}

export const getCards = () => {
    return dispatch => {
        cardsAxios.get(`${setForSet}`)
            .then(response =>
                // console.log(response.data);
                dispatch({
                    type: "GET_CARDS",
                    cards: response.data,
                    loading: false
                })
            )
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, your data is unavailable"
                });
            });
    }
}

// !!! the back-end is set to receive all 81 cards as an array!!!
export const newCard = (card) => {
    return dispatch => {
        cardsAxios.post(setForSet, { ...card })
            .then(response => {
                dispatch({
                    type: "NEW_CARD",
                    card: response.data,
                    loading: false
                })
            })
    }
}

export const editCard = (id, updatedCard) => {
    return dispatch => {
        cardsAxios.put(setForSet + id, updatedCard)
            .then(response => {
                dispatch({
                    type: "EDIT_CARD",
                    id: id,
                    updatedCard: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, your data is unavailable."
                });
            })
    }
}



export const removeCard = id => {
    return dispatch => {
        cardsAxios.delete(setForSet + id)
            .then(response => {
                dispatch({
                    type: "REMOVE_CARD",
                    id: id,
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, your data is unavailable."
                });
            })
    }
}

export default cardsReducer;