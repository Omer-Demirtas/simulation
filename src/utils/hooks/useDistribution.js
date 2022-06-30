import { useDispatch } from "react-redux"
import { closeDialog, openDialog } from "../../features/dialog/dialogSlice";

let resolveCallback;
const useDistribution = () => 
{
    const dispatch = useDispatch();
    //const state = useSelector(state => state.dialog);
    const open =  async (payload) =>
    {
        dispatch(openDialog({handleSave: payload.handleSave}));
    }

    const close = () =>
    {
        dispatch(closeDialog())
    }

    const onConfirm = () => {
        resolveCallback(true);
    };

    const onCancel = () => {
        resolveCallback(false);
    };
    const confirm = text => {
        dispatch(openDialog());
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    return ({
        open, close
    })
}

export default useDistribution;