import { Button } from '@headstorm/foundry-react-ui'
import React, { useState } from 'react'
import { useTheme } from '../../../providers/ThemeProvider'
import Input from '../../input'
import { formatBallType } from '../formatters'
import SseoGraph from '../sseoGraph'
import { BallType, Player, Roles } from '../types'
import { ballsSunkToRole, cascadeRoles } from '../utils'
import {
  BallsWrapper,
  ConfirmQueue,
  LeftSection,
  PlayerWrapper,
  PoolBall,
  RightSection,
  Wrapper,
} from './style'

const SseoContainer: React.FC = () => {
  const { theme } = useTheme()
  const [playerNames, setPlayerNames] = useState<Record<Player, string>>({
    [Player.One]: '',
    [Player.Two]: '',
    [Player.Three]: '',
    [Player.Four]: '',
  })
  const [balls, setBalls] = useState<{ sunkBy: Player | null; queued: boolean }[]>(
    new Array(15).fill({ sunkBy: null, queued: false }),
  )
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(Player.One)
  const [roles, setRoles] = useState<Roles>({
    [Player.One]: Object.values(BallType),
    [Player.Two]: Object.values(BallType),
    [Player.Three]: Object.values(BallType),
    [Player.Four]: Object.values(BallType),
  })

  return (
    <Wrapper>
      <LeftSection>
        <h1>Solids vs Stripes vs Evens vs Odds</h1>
        {Object.values(Player).map((playerKey, i) => (
          <PlayerWrapper key={playerKey}>
            <Input
              placeholder={`Player name`}
              type="text"
              label={`Player ${i + 1} - ${roles[playerKey]
                .map(ballType => formatBallType(ballType))
                .join(' | ')}`}
              value={playerNames[playerKey]}
              onChange={e => setPlayerNames(curr => ({ ...curr, [playerKey]: e.target.value }))}
            />
            {/* <div>
              {Object.values(BallType).map(ballType => (
                <Input
                  key={`${playerKey}-${ballType}`}
                  type="checkbox"
                  label={formatBallType(ballType)}
                  checked={roles[playerKey].includes(ballType)}
                  disabled
                />
              ))}
            </div> */}
            {balls.map(
              ({ sunkBy, queued }, index) =>
                sunkBy === playerKey &&
                !queued && (
                  <PoolBall key={`ball-${index + 1}`} num={index + 1} sunk>
                    <div>{index + 1}</div>
                  </PoolBall>
                ),
            )}
          </PlayerWrapper>
        ))}

        <div>Remaining - click a ball to queue</div>
        <BallsWrapper>
          {balls.map(
            ({ sunkBy, queued }, index) =>
              !sunkBy &&
              !queued && (
                <PoolBall
                  title="Click to add to queue"
                  key={`ball-${index + 1}`}
                  num={index + 1}
                  onClick={() => {
                    const currCopy = [...balls]
                    currCopy[index] = { sunkBy: null, queued: true }
                    setBalls(currCopy)
                  }}
                >
                  <div>{index + 1}</div>
                </PoolBall>
              ),
          )}
        </BallsWrapper>
        <ConfirmQueue>
          <div>Queue</div>
          <select
            value={selectedPlayer}
            onChange={e => setSelectedPlayer(e.target.value as Player)}
          >
            {Object.values(Player).map((player, i) => (
              <option
                key={player}
                label={playerNames[player] || `Player ${i + 1}`}
                value={player}
              />
            ))}
          </select>
          <Button
            onClick={() => {
              setRoles(curr =>
                cascadeRoles({
                  ...curr,
                  [selectedPlayer]: ballsSunkToRole(
                    balls
                      .map(({ queued }, i) => queued && i + 1)
                      .filter(val => typeof val === 'number'),
                    roles[selectedPlayer],
                  ),
                }),
              )
              setBalls(curr =>
                curr.map(({ sunkBy, queued }) => ({
                  sunkBy: queued ? selectedPlayer : sunkBy,
                  queued: false,
                })),
              )
            }}
            color={theme.focus}
            disabled={!balls.filter(({ queued }) => queued).length}
          >
            Confirm
          </Button>
        </ConfirmQueue>
        <BallsWrapper>
          {balls.map(
            ({ queued }, index) =>
              queued && (
                <PoolBall
                  title="Click to remove from queue"
                  key={`ball-${index + 1}`}
                  num={index + 1}
                  onClick={() => {
                    const currCopy = [...balls]
                    currCopy[index] = { sunkBy: null, queued: false }
                    setBalls(currCopy)
                  }}
                >
                  <div>{index + 1}</div>
                </PoolBall>
              ),
          )}
        </BallsWrapper>
      </LeftSection>
      <RightSection>
        <SseoGraph roles={roles} playerNames={playerNames} />
      </RightSection>
    </Wrapper>
  )
}

export default SseoContainer
