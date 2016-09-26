import {TOGGLE_FULLSCREEN} from '../mutation-types'
import * as utils from '../../utils'
export const fullscreen = ({ dispatch }) => {
  dispatch(TOGGLE_FULLSCREEN)
  utils.fullscreen()
}