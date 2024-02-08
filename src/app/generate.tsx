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
  let points: Array<Point> = []
  for (let i = 0; i < bombCount; i ++){
    points.push({x:getRandInt(fieldSize.rows), y:getRandInt(fieldSize.cols)})
  }
  return points.filter((element, index) => {return points.indexOf(element)=== index;})
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

export function generateGridValues(fieldSize: FieldConfig, bombCount: number){

  const bombs = create_random_points(fieldSize, bombCount);
  let values = [];

  for (let i = 0; i < fieldSize.rows; i++){
    let col_values = []
    for (let j = 0; j < fieldSize.cols; j++){
      col_values.push(countBombNeighbors(i, j, bombs))
    }
    values.push(col_values);
  }
  return values;
}

