import React, { useMemo } from 'react'
import { formatBallType, formatPlayerName } from '../formatters'
import { BallType, BallTypeCombo, Player, Roles } from '../types'
import { getQuarters } from '../utils'
import { GraphBody, GraphLabels, GridCell, GridHeader, Label, Wrapper } from './style'

interface Props {
  roles: Roles
  playerNames: Record<Player, string>
  decided: Record<BallType, Player | undefined>
  winners: Player[]
}

const getLocation = (
  player: Player,
  decided: Record<BallType, Player | undefined>,
  quarters: Record<BallTypeCombo, Player[]>,
): BallType | BallTypeCombo | 'hidden' => {
  const single = Object.values(BallType).find(ballType => decided[ballType] === player)
  if (single) return single

  const combo = Object.values(BallTypeCombo).find(ballTypeCombo =>
    quarters[ballTypeCombo].includes(player),
  )
  if (combo) return combo

  return 'hidden'
}

const getIndex = (player: Player, quarters: Record<BallTypeCombo, Player[]>): -1 | 0 | 1 => {
  const quarter = Object.keys(quarters).find(quarter => quarters[quarter].includes(player))
  if (!quarter || quarters[quarter].length === 1) return -1
  return quarters[quarter][0] === player ? 0 : 1
}

const SseoGraph: React.FC<Props> = ({ roles, playerNames, decided, winners }) => {
  const quarters = useMemo(() => getQuarters(roles), [roles])

  return (
    <Wrapper>
      <GraphLabels>
        <div></div>
        <GridHeader ballType={BallType.Solid}>{formatBallType(BallType.Solid)}</GridHeader>
        <GridHeader ballType={BallType.Stripe}>{formatBallType(BallType.Stripe)}</GridHeader>
        <GridHeader ballType={BallType.Even}>{formatBallType(BallType.Even)}</GridHeader>
        <GridHeader ballType={BallType.Odd}>{formatBallType(BallType.Odd)}</GridHeader>
        <GraphBody>
          <GridCell>
            {Object.values(Player).map(player => (
              <Label
                key={`${BallTypeCombo.SolidEven}-${player}`}
                location={getLocation(player, decided, quarters)}
                index={getIndex(player, quarters)}
                winner={winners.includes(player)}
              >
                <span>
                  {winners.includes(player) && <span>&#9733; </span>}
                  {formatPlayerName(player, playerNames)}
                  {winners.includes(player) && <span> - WINNER! &#9733;</span>}
                </span>
              </Label>
            ))}
          </GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
        </GraphBody>
      </GraphLabels>
    </Wrapper>
  )
}

export default SseoGraph
