import { useMutation, useQuery } from 'react-query'
import axios from 'axios'

export const useMakePayment = () => {
  return useMutation((params) =>
    axios
      .post('http://localhost:3001/payments', {
        charitiesId: params.id,
        amount: params.amount,
        currency: params.currency,
      })
      .then((res) => res.data)
  )
}

export const usePayments = () => {
  return useQuery('payments', () =>
    axios.get('http://localhost:3001/payments').then((res) => res.data)
  )
}

export const useCharities = () => {
  return useQuery('charities', () =>
    axios.get('http://localhost:3001/charities').then((res) => res.data)
  )
}
