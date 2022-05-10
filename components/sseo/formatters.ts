import { BallType, Player } from './types'

export const formatBallType = (ballType: BallType): string => {
  if (ballType === BallType.Odd) return 'Odds'
  if (ballType === BallType.Solid) return 'Solids'
  if (ballType === BallType.Even) return 'Evens'
  return 'Stripes'
}

export const formatPlayerName = (player: Player, playerNames: Record<Player, string>): string =>
  playerNames[player] ? playerNames[player] : `Player ${player.toLowerCase()}`

export const formatOrdinal = (i: number) => {
  let j = i % 10
  let k = i % 100

  if (j == 1 && k != 11) return i + 'st'
  if (j == 2 && k != 12) return i + 'nd'
  if (j == 3 && k != 13) return i + 'rd'
  return i + 'th'
}
