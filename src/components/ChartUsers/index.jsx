import React from 'react'
import { VictoryBar, VictoryPie, VictoryLabel } from 'victory';

export default function ChartUsers() {
  return (
    <div>
        <p>ChartUsers</p>
        <svg viewBox="0 0 400 400" >
  <VictoryPie
    standalone={false}
    width={400} height={400}
    data={[
      {x: "A", y: 33},
      {x: "B", y: 33},
      {x: "C", y: 33}
    ]}
    innerRadius={70} labelRadius={100}
    style={{ labels: { fontSize: 20, fill: "white"}}}
  />
  <circle cx="200" cy="200" r="65" fill="none" stroke="black" strokeWidth={3}/>
  <circle cx="200" cy="200" r="155" fill="none" stroke="black" strokeWidth={3}/>
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={200} y={200}
    style={{fontSize: 30}}
    text="Label"
  />
</svg>
    </div>
  )
}
