import React, { useState } from 'react'
import styled from 'styled-components'
import { useMakePayment } from './app/hooks'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { getImage } from './helpers'

const CardContainer = styled.div`
  margin: 20px;
  background-color: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  min-width: 480px;
  width: calc(30% - 80px);
`

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #c2f2e7;
  :hover {
    filter: brightness(90%);
  }
`

const Button = styled.button`
  background: #c2f2e7;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;

  :hover {
    filter: brightness(90%);
  }
`

const RadioLabel = styled.label`
  margin-right: 12px;
`

const RadioInput = styled.input``

const CharityContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
  padding: 0 auto 24px;
`

const AmountCotent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 0.95);
`

const Text = styled.span`
  font-size: 16px;
  text-align: center;
  color: rgb(34, 44, 64);
`

const Amounts = styled.div`
  margin-bottom: 24px;
`

const Image = styled.img`
  overflow-x: hidden;
  width: 100%;
  height: 240px;
  background: #e5e5e5;
  object-fit: contain;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px 16px;
`

const Card = ({ charity }) => {
  const { id, name, currency, image } = charity
  const queryClient = useQueryClient()
  const [isShowDonateAmount, setIsShowDonateAmount] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(null)
  const { mutate: makePayment } = useMakePayment()

  const toggleDonateAmount = () => {
    setIsShowDonateAmount(!isShowDonateAmount)
  }

  const handlePay = () => {
    makePayment(
      { id, amount: selectedAmount, currency },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('payments')
          toast.success('Your payment is successful!')
        },
        onError: () => {
          toast.error('Your payment is failed!')
        },
      }
    )
  }

  const donateOptions = [10, 20, 50, 100, 500]

  return (
    <CardContainer>
      <CardContent>
        <CharityContent>
          <Image src={getImage(image)} alt={name} />
          <Footer>
            <Text>{name}</Text>
            <Button onClick={toggleDonateAmount}> Donate</Button>
          </Footer>
        </CharityContent>
        {isShowDonateAmount ? (
          <AmountCotent>
            <CloseButton onClick={toggleDonateAmount}>X</CloseButton>
            <Text style={{ marginBottom: '20px' }}>Select amount to donate</Text>
            <Amounts>
              {donateOptions.map((amount, i) => (
                <RadioLabel key={i}>
                  <RadioInput
                    type="radio"
                    name="payment"
                    onClick={() => setSelectedAmount(amount)}
                  />
                  {amount}
                </RadioLabel>
              ))}
            </Amounts>
            <Button onClick={() => handlePay()}>Pay</Button>
          </AmountCotent>
        ) : null}
      </CardContent>
    </CardContainer>
  )
}
export default Card
