import { createReducer, createSlice, Action, AnyAction, createAction } from '@reduxjs/toolkit';
interface CounterState {
    favorites: any,
    comment: any
}


const addComment = createAction('storage/addComment',
    function prepare(params: any) {
        const current = localStorage.getItem('comment');
        const data = current ? JSON.parse(current) : []
        data.push(params)
        localStorage.setItem('comment', JSON.stringify(data))
        return {
            payload: data
        }
    })

const getComment = createAction(
    'storage/getComment',
    function prepare(params: any) {
        const current = localStorage.getItem('comment');
        const data = current ? JSON.parse(current) : []
        return {
            payload: data
        }
    }
)

const addFavorite = createAction('storage/addFavorite',
    function prepare(params: any) {
        const current = localStorage.getItem('favorites');
        const data = current ? JSON.parse(current).filter((e:any)=> e.id !== params.id) : []
        data.push(params)
        localStorage.setItem('favorites', JSON.stringify(data))
        return {
            payload: data
        }
    })

const getFavorites = createAction(
    'storage/getFavorites',
    function prepare(params: any) {
        const current = localStorage.getItem('favorites');
        const data = current ? JSON.parse(current) : []
        return {
            payload: data
        }

    }
)

const initialState = {
    favorites: [],
    comment: []
} as CounterState

const storageReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addComment, (state, action) => {
            if (action.payload.length > 0) {
                state.comment = action.payload
            }
            
        })
        .addCase(addFavorite, (state, action) => {
            if (action.payload.length > 0) {
                state.favorites = action.payload
            }
        })
        .addCase(getComment, (state, action) => {
            if (action.payload.length > 0) {
                state.comment = action.payload
            }
        })
        .addCase(getFavorites, (state, action) => {
            if (action.payload.length > 0) {
                state.favorites = action.payload
            }
        })
})


export {
    getComment,
    getFavorites,
    addComment,
    addFavorite
  }
  
  export default storageReducer