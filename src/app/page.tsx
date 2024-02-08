"use client";

import {useState} from "react";
import Square from "./Square";
import { ConfigComponent } from "./config";
import { FieldConfig, Point } from "./types";

const neighbour_fields = [
  [1,1],
  [1,0],
  [1,-1],
  [0, 1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [-1,-1]
]



interface Config{
  fieldSize: FieldConfig
  bombs: Array<Point>
}

function create_random_points(fieldSize:FieldConfig, bombCount: number): Array<Point> {
  function getRandInt(i:number) : number{
    return Math.floor(Math.random()*i)
  }
  let points = []
  for (let i = 0; i < bombCount; i ++){
    points.push({x:getRandInt(fieldSize.rows), y:getRandInt(fieldSize.cols)})
  }
  return [... new Set(points)];
}


function countBombNeighbors(row:number, col:number, bombs:Array<Point>){
  let isbomb = false
  bombs.forEach((bomb) => {
    if (row === bomb.x && col === bomb.y)
      isbomb = true
  })
  if (isbomb){
    return "💣"
  }
  
  let neighbors = 0;
  neighbour_fields.forEach((neigh) => {
    bombs.forEach((bomb) => {
      if (row+neigh[0] === bomb.x && col+neigh[1] === bomb.y){
        neighbors+=1
      }
    })});
  return neighbors.toString();
}

function generateGridValues(config:Config){
  let values = [];
  for (let i = 0; i < config.fieldSize.rows; i++){
    let col_values = []
    for (let j = 0; j < config.fieldSize.cols; j++){
      col_values.push(countBombNeighbors(i, j, config.bombs))
    }
    values.push(col_values);
  }
  return values;
}

function Grid({fieldSize, bombs: bombCount}: Config){
  const squareValues = generateGridValues({fieldSize, bombs: bombCount})
  let output = []
  let counter = 0;
  for (let i = 0; i < fieldSize.rows; i++){
    for (let j = 0; j < fieldSize.cols; j++){
      output.push(<Square key = {counter} input= {squareValues[i][j]} />)  
    }
    output.push(<br></br>)  
  }
  return (<div>{output}</div>)
}

export default function Bomber() {

  const [fieldSize, setFieldSize] = useState<FieldConfig>({rows: 10, cols: 10})
  const [bombcount, setBombCount] = useState<number>(8);
  const bombs = create_random_points(fieldSize, bombcount);


  const [showItems, setShowItems] = useState<boolean>(false);


  return (
    <main className="min-h-screen"> 
      <div className="flex h-52 bg-gray-500" >  
        <h1 className="text-3xl font-bold underline">
          Bomber
        </h1>
      </div>
      <div className="flex justify-center bg-gray-600">
        <div className="">
        
          <Grid
            fieldSize = {fieldSize}
            bombs = {bombs}
          />
        </div>

        <ConfigComponent 
          fieldSize = {fieldSize}
          bombcount={bombcount}
          setGridSize={setFieldSize}
          setBombCount={setBombCount}
        />
      </div>
      <button onClick={() => setShowItems(!showItems)}>Toggle View</button> 
    </main>
  )
}
