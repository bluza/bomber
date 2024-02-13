interface FieldConfig{
  rows: number
  cols: number
}

interface Point {
  x:number,
  y:number
}
interface Config{
  fieldSize: FieldConfig
  bombs: Array<Point>
}

class FieldValue{
  value: string;
  display: string;
  
  constructor(value: string, display: string){
    this.value = value; 
    this.display = display;
  }
}

export {
  FieldValue
}
export type{
    FieldConfig,
    Point,
    Config
}