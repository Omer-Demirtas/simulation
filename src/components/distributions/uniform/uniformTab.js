import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import UniformChart from "./uniformChart";
import UniformForm from "./uniformForm";

const UnifromTab = ({ uniform, setDistribution }) => 
{
    const [input, setInput] = useState({a: 10, b: 20});

    const handleInput = (e) => 
    {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const handleSave = () =>
    {
        setDistribution(input);
    }

    useEffect(() => {
        setInput(uniform)
    }, [uniform])

    return (
        <Stack 
            sx={{width: '100%'}}
            direction="column"
            spacing={3}
        >
            <UniformChart />
            <UniformForm 
                value={input}
                handleChange={handleInput}
            />

            <Stack
                direction="row"
            >
                <Button
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Stack>
        </Stack>
    );
}

export default UnifromTab;