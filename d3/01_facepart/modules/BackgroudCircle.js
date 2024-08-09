
export const BackGroundCicle = ({radius, strokeWidth }) => {
  return (
    <circle 
    r= {radius}
    fill="yellow" 
    stroke="black" 
    stroke-width={strokeWidth}/>
  );
}