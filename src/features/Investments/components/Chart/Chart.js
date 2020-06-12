import React from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'

export const formatTooltipLabel = (item) => {
  return numeral(parseFloat(item.value)).format('$ 0,0.00')
}

export const formatYAxisLabel = (value) => {
  const numericValue = Number(value)
  if (numericValue >= 1000) {
    return numeral(numericValue).format('$ 0a')
  }
  return numericValue
}

export const formatXAxisLabel = (value) => {
  return moment(value).format('DD/MM/YYYY')
}

export const formatTooltipTitle = (item) => {
  const numericTitle = Number(item[0].label)
  return moment(numericTitle).format('DD/MM/YYYY')
}

export const options = {
  legend: { display: false },
  elements: {
    line: { tension: 0 }
  },
  tooltips: {
    callbacks: {
      label: formatTooltipLabel,
      title: formatTooltipTitle
    }
  },
  scales: {
    xAxes: [{
      gridLines: { display: false },
      ticks: { callback: formatXAxisLabel }
    }],
    yAxes: [{
      ticks: { callback: formatYAxisLabel }
    }]
  }
}

export const formatData = (chartData) => ({
  labels: chartData.dates,
  datasets: [{
    label: 'Valor',
    data: chartData.values,
    backgroundColor: 'rgba(21, 156, 228, .7)',
    borderColor: 'rgb(21, 156, 228)'
  }]
})

export const Chart = () => {
  const chartData = useSelector(state => state.investments.chartData)
  if (!chartData || !chartData.dates) {
    return null
  }

  return (
    <Line
      testId='investmentChart'
      options={options}
      data={formatData(chartData)}
    />
  )
}
