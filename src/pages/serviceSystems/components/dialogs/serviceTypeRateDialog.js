import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useFormControl } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BasicDialog from "../../../../components/common/basicDialog";
import { selectUserServiceTypeSelection, updateUserServiceTypeDistribution } from '../../../../features/service/serviceSlice';


const ServiceTypeRateDialog = ({open, handleClose, serviceTypes}) => 
{
    const cumulative = useSelector(selectUserServiceTypeSelection); 
    const [value, setValue] = useState({})

    const dispatch = useDispatch();

    const handleChange = (e) => setValue({...value,[e.target.name]: e.target.value});
    const handleSave = () => 
    {
        dispatch(updateUserServiceTypeDistribution(value))
        handleClose();
    }

    useEffect(() => {
        setValue(cumulative.value)
    }, [cumulative])

    return (
        <BasicDialog
            open={open}
            handleClose={handleClose}
            handleSave={handleSave}
            title="Service Type Rates"
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Service Type</TableCell>
                            <TableCell align='left'>Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            serviceTypes.map(s => (
                                <TableRow key={s.id}>
                                    <TableCell align='left'>
                                        <Typography>{s.title}</Typography>
                                    </TableCell>
                                    <TableCell align='left'>
                                        <TextField id={`${s.id}`} type="number" name={`${s.id}`} value={value[s.id]} onChange={handleChange} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </BasicDialog>
    );
}

export default ServiceTypeRateDialog;