import { useSelector } from "react-redux";
import { modalClose, modalOpen, RootState } from "../store";

export const useUiStore = () => {

    const {
        modalSatus
    } = useSelector((state: RootState) => state.ui);
    
    return { 
        modalSatus,
        modalOpen,
        modalClose
    }
};