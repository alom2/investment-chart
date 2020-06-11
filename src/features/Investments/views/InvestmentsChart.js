import React, { useEffect } from 'react'
import { Card } from '../../sharedComponents'
import { useDispatch } from 'react-redux'
import { fetchInvestmentsData } from '../redux'

export const InvestmentsChart = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInvestmentsData())
  }, [dispatch])

  return (
    <Card>InvestmentChart</Card>
  )
}
