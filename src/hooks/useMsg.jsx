import React from "react";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../store/slice/messageSlice";

export default function useMsg() {
    const dispatch = useDispatch();

    const showSuccess = (message) => {
        dispatch(
            createAsyncMessage({
                success: true,
                message,
            }),
        );
    };

    const showError = (message) => {
        dispatch(
            createAsyncMessage({
                success: false,
                message,
            }),
        );
    };

    return { showSuccess, showError };
    // return <div>useMsg</div>;
}
