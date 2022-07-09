import { Button, CircularProgress, Stack } from "@mui/material";


const LoadingButton = ({onClick, title, loading}) =>
{
    console.log({loading})
    return (
        <Button
            disabled={loading}
            variant='contained'
            sx={{textTransform: 'none', p: 2}}
            onClick={onClick}
        >
            <Stack
                direction="row"
                alignItems='center'
            >
                SIMULATE
                {
                    loading && (
                        <CircularProgress
                                sx={{ml: 1}}
                                color="secondary"
                            />
                    )
                }
            </Stack>
        </Button>
    );
}

export default LoadingButton;