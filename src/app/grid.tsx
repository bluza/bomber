import {useState} from "react";

function Square({input}:{input:string}) {
    const [value, setValue] = useState("⬜");
    function handleClick(){
        setValue(input);
    }
    return (
      <button 
        className="bg-grey-20 h-7 w-7 border rounded-t text-red-300" 
        onClick={handleClick}  
        onContextMenu={
            (e) => {
                e.preventDefault();
                setValue("🧷");
            }
        }
        >
          {value}
      </button>
  )
}

export function Grid({squareValues}: {squareValues: string[][]}){
  let output = []
  for (let i = 0; i < squareValues.length; i++){
    for (let j = 0; j < squareValues[0].length; j++){
      output.push(<Square input= {squareValues[i][j]} />)  
    }
    output.push(<br></br>)  
  }
  return (<div>{output}</div>)
}

