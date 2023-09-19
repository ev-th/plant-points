import { calculatePoints } from '@/utils/points'

const PointsCard = ({meals}) => {
  const points = calculatePoints(meals)
  return (
    <p>Your plant points over the last 7 days: {points}</p>
  )
}

export default PointsCard