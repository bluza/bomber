import {useState} from "react";

function Square({input}) {
    const [value, setValue] = useState("🌊");
    function handleClick(){
        setValue(input);
    }
    return (<button className="squareButton" onClick={handleClick}  
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