import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../features/dialog/dialogSlice";
import DistributionDialog from "../distributions/distributionDialog";
import BasicDialog from "./basicDialog";


const GlobalDialog = () => 
{
    const dispatch = useDispatch();
    const s = useSelector(state => state.dialog );
    
    if(s.open) {
        const open = s.open;

        console.log({open})
        return (
            <DistributionDialog 
                open={open}
                handleClose={() => dispatch(closeDialog())}
            />
        );
    }

    return (<></>);

}

export default GlobalDialog;