import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "nameOfmessageSlice",
    initialState: [
        // {
        //     id: 123,
        //     type: "success",
        //     title: '成功',
        //     text: "default message",
        //     totalCountInCart: 0,
        // },
    ],
    reducers: {
        // actions
        createMsg(state, action) {
            console.log("createMsg");
            state.push({
                id: action.payload.id,
                type: action.payload.success ? "success" : "danger",
                title: action.payload.success ? "成功" : "失敗",
                text: action.payload.message,
                totalCountInCart: 0,
            });
        },
        removeMsg(state, action) {
            const index = state.findIndex((m) => m.id === action.payload);
            // console.log("removeMsg", action.payload, index);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        loadCartNum(state, action) {
            console.log("loadCartNum");
        },
    },
});

export const createAsyncMessage = createAsyncThunk(
    "message/createAsyncMessage",
    async (payload, { dispatch, requestId }) => {
        dispatch(
            createMsg({
                ...payload,
                id: requestId,
            }),
        );

        setTimeout(() => {
            dispatch(removeMsg(requestId));
        }, 2000);
    },
);

console.log("messageSlice", messageSlice);

export const { createMsg, removeMsg } = messageSlice.actions;

export default messageSlice.reducer;
