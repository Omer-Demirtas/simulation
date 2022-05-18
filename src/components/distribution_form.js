import { Stack, TextField } from "@mui/material";


const DistrubitionForm = ({distribution}) => 
{

    console.log(distribution);

    return (
            <Stack spacing={2} justifyItems="space-between" sx={{ m: 1 }} direction="row">
                {
                    distribution.variables.map(d => (
                            <TextField 
                                key={d}
                                type="number"
                                fullWidth 
                                id={d} 
                                label={d} 
                                variant="outlined"  
                            />
                        )
                    )
                }        
            </Stack>
    );
}


export default DistrubitionForm;