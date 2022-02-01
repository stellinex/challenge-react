import React from 'react'
import styled from 'styled-components'
import { useCharities, usePayments } from './app/hooks'
import Card from './Card'
import { summaryDonations } from './helpers'
import { Toaster } from 'react-hot-toast'

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`

const Header = styled.h1`
  margin: 40px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: rgb(34, 44, 64);
`

const Text = styled.h1`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  color: rgb(34, 44, 64);
`

const Tamboon = () => {
  const { data: charities } = useCharities()
  const { data: payments } = usePayments()

  const totalDonate = payments && summaryDonations(payments.map((item) => item.amount))

  return (
    <>
      <Header>OPN Tamboon React</Header>
      <Text>All donation: {totalDonate}</Text>
      <Main>
        {charities?.map((item) => (
          <Card key={item.id} charity={item} />
        ))}
        <Toaster />
      </Main>
    </>
  )
}

export default Tamboon
