//
const width = 960;
const height = 500;
const centerx = width / 2;
const centery = height / 2;
const strokeWidth = 10;
const eyeoffsetx = 100;
const eyeoffsety = 50;
const eyeradius = 50;

//import arc from d3
const mouthArc = d3.arc()
  .innerRadius(150)
  .outerRadius(140)
  .startAngle(2*Math.PI/3)
  .endAngle(Math.PI*4/3);


// let BackGroundCicle = require('./modules/BackGroundCircle').default;

// 驼峰命名函数 可以返回html标签 
function AppContent() {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerx},${centery})`}> 
      <BackGroundCicle radius={centery-strokeWidth / 2} strokeWidth={strokeWidth}/>
      <circle 
      cx={-eyeoffsetx} 
      cy={-eyeoffsety} 
      r= {eyeradius} />
      <circle 
      cx={+eyeoffsetx} 
      cy={-eyeoffsety}
      r={eyeradius} />
      <path d={mouthArc()}  />
      </g>
    </svg>
  )
}

const appEl = document.querySelector("#app");
const root = ReactDOM.createRoot(appEl); //根据真实dom创建虚拟dom 

root.render(<AppContent />);
