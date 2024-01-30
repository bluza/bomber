import {useState} from "react";

function Square({key, input}) {
    const [value, setValue] = useState("x");
    function handleClick(){
        setValue(input);
    }

    return (<button className="squareButton" key = {key} onClick={handleClick}  
        onContextMenu={
            (e) => {
                e.preventDefault();
                setValue("🧷");
            }
        }
        >{value}</button>
    )
    }
  export default Square;