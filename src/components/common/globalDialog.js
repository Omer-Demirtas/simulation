import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../features/dialog/dialogSlice";
import DistributionDialog from "../distributions/distributionDialog";

const GlobalDialog = () => 
{
    const dispatch = useDispatch();
    const s = useSelector(state => state.dialog );
    
    const handleClose = () => dispatch(closeDialog())
    const handleSave = () => s.handleSave();

    if(s.open) {
        const open = s.open;

        console.log({open})
        return (
            <DistributionDialog 
                open={open}
                saveDistribution={handleSave}
                handleClose={handleClose}
            />
        );
    }

    return (<></>);

}

export default GlobalDialog;