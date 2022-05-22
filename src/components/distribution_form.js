import { Button, Stack, TextField } from "@mui/material";


const DistrubitionForm = ({distribution}) => 
{

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const createFormBody = () => 
    {
        if(distribution.distribution === 0)
        {
            return (
                <Stack sx={{ m: 1 }} >
                    <TextField 
                        fullWidth
                        name="cumulative"
                        id="cumulative" 
                        label="cumulative"
                        variant="outlined"
                    />
                </Stack>
            );
        }
        return (
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} justifyItems="space-between" sx={{ m: 1 }} direction="row">
                    {
                        Object.entries(distribution.values).map(i => {
                            const k = i[0];
                            const v = i[1];

                            return (
                                <TextField 
                                    key={k}
                                    type="number"
                                    fullWidth 
                                    id={k} 
                                    label={k} 
                                    variant="outlined"  
                                />
                            );
                        })
                    }
                </Stack>
                </form>
        );
    }


    return (
        <Stack direction="row">
            {createFormBody()}
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Stack>
    );
}


export default DistrubitionForm;