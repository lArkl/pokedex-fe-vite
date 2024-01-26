import ColorCell from './ColorCell'
import { FC } from 'react'
import Typography from '../../components/Typography'

const colors = ['gray', 'purple', 'red', 'white']
const gradientNumbers = Array.apply({}, Array(6)).map((_, index) => index + 1)

const Colors: FC<{ mainClassName: string; rowClassName: string; textClassName: string; cellClassName: string }> = ({
  mainClassName,
  rowClassName,
  textClassName,
  cellClassName,
}) => {
  return (
    <div className={mainClassName}>
      {colors.map((color) => (
        <div className={rowClassName} key={color}>
          <Typography className={textClassName}>--color-{color}</Typography>
          <div className={cellClassName}>
            {gradientNumbers.map((gradient) => (
              <ColorCell token={`--color-${color}-${gradient}`} key={`${color}-${gradient}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export default Colors
