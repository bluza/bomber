import React, {useRef, useState} from "react";
import { FieldConfig,  Point } from "./types";

function ConfigHelper({fieldSize, bombs}: {fieldSize: FieldConfig, bombs: Array<Point>}){
  return( 
    <div>
    <label>Bomb Locations</label>
    <ul>
      { bombs.map((bomb) => <li>{bomb.x}, {bomb.y}</li>) }
    </ul>
    <label>FieldSize</label>
    <p>rows: {fieldSize.rows}</p>
    <p>cols: {fieldSize.cols}</p>
    </div>
  )
}

function GridSelect({maxSize, name, fieldref}: {maxSize:string, name: string, fieldref:  React.MutableRefObject<number>}){
    
    return (
      <>
        <p>
          <label>{name}:</label>
          <select className="float-right" name={name} id={name} ref = {fieldref}>
            {Array(parseInt(maxSize)).fill(0).map((_, i) => <option key= {i+1} value={i+1}>{i+1}</option>)}
          </select>
        </p>
        
      </>
    )
}

interface FullConfig{
  fieldSize: FieldConfig
  bombcount: number
  setGridSize: React.Dispatch<React.SetStateAction<FieldConfig>>
  setBombCount: React.Dispatch<React.SetStateAction<number>>
}
export function ConfigComponent({fieldSize, bombcount, setGridSize, setBombCount}: FullConfig){
    const [showHelper, setShowHelper] = useState<boolean>(false);
    const rowRef = useRef(fieldSize.rows);
    const colRef = useRef(fieldSize.cols);
    const bombsRef = useRef(bombcount);

  const handleSubmit = (event) =>{
    event.preventDefault();
    setGridSize({rows: rowRef.current.value, cols: colRef.current.value})
    console.log(rowRef.current.value, colRef.current.value)
  }

  return (
  <div className="rounded bg-gray-400 w-3/12 p-4 m-1">
    <form onSubmit={handleSubmit} className="text-xl">
      <GridSelect maxSize = "15" name = "Bombs" fieldref = {bombsRef} />
      <GridSelect maxSize = "15" name = "Cols" fieldref = {colRef} />
      <GridSelect maxSize = "15" name = "Rows" fieldref = {rowRef} />
      <button type="submit" className="bg-gray-500 rounded-md p-2 m-1 hover:bg-gray-600"> Render</button>
    </form>
    <hr></hr>
    <button onClick={() => setShowHelper(!showHelper)}>
      showConfig
      </button> 
    {showHelper ?  <ConfigHelper fieldSize={fieldSize} bombs={bombs}/> : null }

  </div>
  )
}