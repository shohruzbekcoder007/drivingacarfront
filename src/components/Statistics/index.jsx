import React, { useEffect, useState } from 'react'
import StatisticsHeader from './StatisticsHeader'
import DateTime from '../DateTime'
import StatisticsBody from './StatisticsBody'

export default function Statistics() {

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  return (
    <>
        <StatisticsHeader/>
        <StatisticsBody/>
    </>
  )
}
