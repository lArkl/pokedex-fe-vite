import { FC } from 'react'
import './ColorCell.scss'
import Typography from '../../components/Typography'

interface ColorCellProps {
  token: string
}

const ColorCell: FC<ColorCellProps> = ({ token }) => {
  const styles = getComputedStyle(document.documentElement)
  const value = styles.getPropertyValue(token)
  if (!value) return null
  return (
    <div className="colorcell">
      <div className="color" style={{ backgroundColor: `var(${token})` }}></div>
      <Typography variant="sm" className="text">
        {value}
      </Typography>
    </div>
  )
}

export default ColorCell
