"use client";

import {useState} from "react";
import Square from "./Square";
import { join } from "path";

interface GridConfig{
  rows: number;
  cols: number;
  bombs: Array<[number, number]>;
}

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

function countBombNeighbors(row, col, bombs){
  // let bomb = [1, 1]
  let isbomb = false

  bombs.forEach((bomb) => {
    if (row === bomb[0] && col == bomb[1])
      isbomb = true
  })
  if (isbomb){
    return "💣"
  }
  let neighbors = 0;

  // foreach neighbor -> if bomb -> raise countReset;
  // TODO edges

  neighbour_fields.forEach((neigh) => {
    bombs.forEach((bomb) => {
      if (row+neigh[0] === bomb[0] && col+neigh[1] === bomb[1]){
        neighbors+=1
      }
    })
    
  }
    );
  return neighbors.toString();
}

function Grid({rows, cols, bombs}: GridConfig){
  const [squareValues, setSquareValues] = useState(Array.from({length:  rows},() => new Array(cols).fill(0)));
  let output = []
  let counter = 0;
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){

    //   counter++;
    //   if (bombs[0][0] === i && bombs[0][1] === j){
    //     output.push(<Square id={counter} input = "💣"/>)
    //   } else{
    //     output.push(<Square id={counter} input = {counter}/>)
    //   }
    // }
      output.push(<Square key = {counter} input= {countBombNeighbors(i, j, bombs)} />)  
    }
    output.push(<br></br>)  
  }
  return (<div>{output}</div>)
}

function GridConfig({currentValue, maxSize, name, setVariable}){
  return (
    <div>
    <label>{name}:</label>
      <select name="{name}" onChange={e => setVariable(e.target.value)} value = {currentValue}> 
      {
        Array(parseInt(maxSize)).fill(0).map((_, i) => <option key= {i+1} value={i+1}>{i+1}</option>)
      }
      </select>
    
    </div>
  )
}

// interface Position{
//   x : number, 
//   y : number
// }

function create_random_points(n, rows, cols){
  function getRandInt(i){
    return Math.floor(Math.random()*i)
  }
  let points = []
  for (let i = 0; i < n; i ++){
    points.push([getRandInt(rows), getRandInt(cols)])
  }
  // points.unshift([0,0])
  return [... new Set(points)];
}


export default function Home() {


  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [bombcount, setbombcount] = useState(30);

  const bombs = create_random_points(bombcount, rows, cols);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">   
    
    <Grid
      rows={rows} 
      cols={cols}
      bombs = {bombs}
    />

  <div className="config">
  <GridConfig currentValue={cols} maxSize = "40" name = "cols" setVariable = {setCols}/>
  <GridConfig currentValue={rows} maxSize = "40" name = "rows" setVariable = {setRows}/>
  <GridConfig currentValue={rows} maxSize = "40" name = "bombs" setVariable = {setbombcount}/>

  </div>

    </main>
  )
}
