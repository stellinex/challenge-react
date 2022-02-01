import baanKruNoi from '../public/images/baan-kru-noi.jpg'
import habitatHumanity from '../public/images/habitat-for-humanity-thailand.jpg'
import makhampom from '../public/images/makhampom-theater.jpg'
import papaerRanger from '../public/images/paper-ranger.jpg'
import thailandAsso from '../public/images/thailand-association-of-the-blind.jpg'

export const summaryDonations = (donations) =>
  donations.reduce((accumulator, value) => accumulator + value)

export const getImage = (imageName) => {
  switch (imageName) {
    case 'baan-kru-noi.jpg':
      return baanKruNoi
    case 'habitat-for-humanity-thailand.jpg':
      return habitatHumanity
    case 'makhampom-theater.jpg':
      return makhampom
    case 'paper-ranger.jpg':
      return papaerRanger
    case 'thailand-association-of-the-blind.jpg':
      return thailandAsso
    default:
      return null
  }
}
