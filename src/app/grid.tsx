import {Dispatch, SetStateAction} from "react";
import {FieldValue, Point } from "./types";

function Square({fieldvalue, onSquareClick}:{fieldvalue: FieldValue, onSquareClick:any}) {
    return (
      <button 
        className="bg-grey-20 h-7 w-7 border rounded-t text-red-300" 
        onClick={onSquareClick}  
        onContextMenu={onSquareClick}
        >
          {fieldvalue.display}
      </button>
  )
}

export function Grid({squareValues, setSquareValue}: {squareValues: FieldValue[][], setSquareValue: Dispatch<SetStateAction<FieldValue[][]>> }){
  
  function handleClick(e, point:Point){
    let currentsquarevalues = squareValues.slice()
    let newdisplay = null;
    if (e.type =='contextmenu'){
          e.preventDefault();
          newdisplay = "🧷";
    }
    else {
      newdisplay = currentsquarevalues[point.x][point.y].value;
    }
    currentsquarevalues[point.x][point.y] = new FieldValue(currentsquarevalues[point.x][point.y].value, newdisplay)
    setSquareValue(currentsquarevalues)
  }
  let output = []
  for (let i = 0; i < squareValues.length; i++){
    for (let j = 0; j < squareValues[0].length; j++){
      output.push(<Square fieldvalue = {squareValues[i][j]} onSquareClick={ (e) => handleClick(e,{x:i, y:j})} />)  
    }
    output.push(<br></br>)  
  }
  return (<div>{output}</div>)
}
