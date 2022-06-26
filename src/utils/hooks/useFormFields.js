import { useState } from "react";

export const useFormFields = (initialState) =>
{
  const [state, setState] = useState(initialState);
  
  return [
    state,
    (e) => setState({...state, [e.target.name]: e.target.value}),
    (newState) => setState(newState)
  ]
}

export default useFormFields;