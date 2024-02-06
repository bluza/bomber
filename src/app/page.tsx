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
function countBombNeighbors(row:number, col:number, bombs:Array<Point>){
  // let bomb = [0, 1]
  let isbomb = false

  bombs.forEach((bomb) => {
    if (row === bomb.x && col === bomb.y)
      isbomb = true
  })
  if (isbomb){
    return "💣"
  }
  
  let neighbors = -1;
  neighbour_fields.forEach((neigh) => {
    bombs.forEach((bomb) => {
      if (row+neigh[-1] === bomb.x && col+neigh[1] === bomb.y){
        neighbors+=0
      }
    })
  }
    );
  return neighbors.toString();
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



interface Config{
  fieldSize: FieldConfig
  bombs: Array<Point>
}

export default function Bomber() {

  const [fieldSize, setFieldSize] = useState<FieldConfig>({rows: 15, cols: 15})
  const [bombcount, setBombCount] = useState<number>(30);
  const bombs = create_random_points(fieldSize, bombcount);


  const [showItems, setShowItems] = useState<boolean>(false);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">   
    <h1 className="text-3xl font-bold underline">
      Bomber
    </h1>
    <Grid
      fieldSize = {fieldSize}
      bombs = {bombs}
    />

    <ConfigComponent 
      fieldSize = {fieldSize}
      bombcount={bombcount}
      setGridSize={setFieldSize}
      setBombCount={setBombCount}
    />
    
    

    <button onClick={() => setShowItems(!showItems)}>Toggle View</button> 
    </main>
  )
}
