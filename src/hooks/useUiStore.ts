import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useUiStore = () => {
    const { modalSatus } = useSelector((state: RootState) => state.ui);
    return { modalSatus }
};