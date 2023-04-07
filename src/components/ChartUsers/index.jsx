import React from 'react'
import { VictoryPie, VictoryLabel } from 'victory';

export default function ChartUsers({ data, label }) {
  return (
    <svg viewBox="0 0 400 400" >
      <VictoryPie
        standalone={false}
        width={400} height={400}
        data={data}
        innerRadius={70} labelRadius={100}
        style={{ labels: { fontSize: 8, fill: "white" } }}
      />
      <circle cx="200" cy="200" r="65" fill="none" stroke="black" strokeWidth={3} />
      <circle cx="200" cy="200" r="155" fill="none" stroke="black" strokeWidth={3} />
      <VictoryLabel
        textAnchor="middle" verticalAnchor="middle"
        x={200} y={200}
        style={{ fontSize: 20 }}
        text={label}
      />
    </svg>
  )
}
