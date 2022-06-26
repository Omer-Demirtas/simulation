import { Stack } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import UniformChart from "./uniformChart";
import UniformForm from "./uniformForm";

const UnifromTab = forwardRef(({ uniform, setDistribution }, ref) => 
{
    const [input, setInput] = useState({a: 10, b: 20});

    const handleInput = (e) => 
    {
        setInput({...input, [e.target.name]: Number(e.target.value)});
    }
    
    useImperativeHandle(ref, () => ({
        input
    }));

    useEffect(() => {
        setInput(uniform)
    }, [uniform])

    return (
        <Stack 
            sx={{width: '100%'}}
            direction="column"
            spacing={3}
        >
            <UniformChart 
                input={input}
            />
            <UniformForm 
                value={input}
                handleChange={handleInput}
            />
        </Stack>
    );
});

export default UnifromTab;