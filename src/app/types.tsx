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
export type{
    FieldConfig,
    Point,
    Config
}