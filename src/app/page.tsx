"use client";

import { useState } from "react";
import { Grid } from "./grid";
import { ConfigComponent } from "./config";
import { FieldConfig, FieldValue } from "./types";
import { generateGridValues } from "./generate";


export default function Bomber() {

  const [fieldSize, setFieldSize] = useState<FieldConfig>({rows: 10, cols: 10})
  const [bombcount, setBombCount] = useState<number>(10);
  const [showConfig, setShowConfig] = useState<boolean>(false);

  
  const [squareValues, setSquareValues] = useState(generateGridValues(fieldSize, bombcount));
  
  function showSquareValues(){
    let currentsquarevalues = squareValues.slice()
    for (let i = 0; i < squareValues.length; i++){
      for (let j = 0; j < squareValues[0].length; j++){
        currentsquarevalues[i][j] = new FieldValue(currentsquarevalues[i][j].value, currentsquarevalues[i][j].value)
      }
    }
    setSquareValues(currentsquarevalues)
  }
  return (
    <main className="flex-row min-h-screen"> 
      <div className="h-52 bg-gray-500" >  
        <h1 className="text-3xl font-bold underline p-4 text-center">
          Bomber
        </h1>
      </div>
      <div className="flex justify-center bg-gray-600 my-1">
        <div className="my-1">
          <Grid squareValues={squareValues} setSquareValue={setSquareValues}/>
        </div>

        {showConfig ? <ConfigComponent 
          fieldSize = {fieldSize}
          bombcount={bombcount}
          setGridSize={setFieldSize}
          setBombCount={setBombCount}
          setSquareValues={setSquareValues}/> : null }
      </div>
      <div className= "text-center">

      <button className="bg-gray-500 rounded-md p-2 m-1 hover:bg-gray-600 h-10" onClick={() => setShowConfig(!showConfig)}> Configure Grid </button>
      <button onClick={() => showSquareValues()}>Toggle View</button> 

      </div>
    </main>
  )
}
