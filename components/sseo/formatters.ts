import { BallType, Player } from './types'

export const formatBallType = (ballType: BallType): string => {
  if (ballType === BallType.Odd) return 'Odds'
  if (ballType === BallType.Solid) return 'Solids'
  if (ballType === BallType.Even) return 'Evens'
  return 'Stripes'
}

export const formatPlayerName = (player: Player, playerNames: Record<Player, string>): string =>
  playerNames[player] ? playerNames[player] : `Player ${player.toLowerCase()}`
