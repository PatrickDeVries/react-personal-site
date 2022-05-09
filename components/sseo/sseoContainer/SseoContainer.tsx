import { Button } from '@headstorm/foundry-react-ui'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import Input from '../../input'
import { formatBallType } from '../formatters'
import SseoGraph from '../sseoGraph'
import { Ball, BallType, Player, Roles } from '../types'
import { ballsSunkToRole, cascadeRoles, getDecided, getWinners, wouldWin } from '../utils'
import {
  BallsWrapper,
  ConfirmQueue,
  Header,
  LeftSection,
  PlayerWrapper,
  PoolBall,
  RightSection,
  Wrapper,
} from './style'

const INITIAL_ROLES: Roles = {
  [Player.One]: Object.values(BallType),
  [Player.Two]: Object.values(BallType),
  [Player.Three]: Object.values(BallType),
  [Player.Four]: Object.values(BallType),
}

const INITIAL_BALLS = new Array(15).fill({ sunkBy: null, queued: false })

const SseoContainer: React.FC = () => {
  const theme = useTheme()
  const [playerNames, setPlayerNames] = useState<Record<Player, string>>({
    [Player.One]: '',
    [Player.Two]: '',
    [Player.Three]: '',
    [Player.Four]: '',
  })
  const [balls, setBalls] = useState<Ball[]>(INITIAL_BALLS)
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(Player.One)
  const [roles, setRoles] = useState<Roles>(INITIAL_ROLES)
  const [lost, setLost] = useState<boolean>(false)
  const [winners, setWinners] = useState<Player[]>([])
  const [losers, setLosers] = useState<Player[]>([])
  const decided: Record<BallType, Player | undefined> = useMemo(() => getDecided(roles), [roles])
  const winningShot = useMemo(
    () => wouldWin(selectedPlayer, balls, decided),
    [balls, decided, selectedPlayer],
  )

  useEffect(() => !winningShot && setLost(false), [winningShot])
  useEffect(
    () =>
      setWinners(curr => [
        ...curr,
        ...getWinners(balls, decided).filter(
          winner => !curr.includes(winner) && !losers.includes(winner),
        ),
      ]),
    [balls, decided, losers],
  )

  return (
    <Wrapper>
      <LeftSection>
        <Header>
          <h1>Solids vs Stripes vs Evens vs Odds </h1>
          <Button
            onClick={() => {
              setRoles(INITIAL_ROLES)
              setBalls(INITIAL_BALLS)
            }}
            color={theme.focus}
          >
            New game
          </Button>
        </Header>
        {Object.values(Player).map((playerKey, i) => (
          <PlayerWrapper key={playerKey}>
            <Input
              placeholder={`Player name`}
              type="text"
              label={`Player ${playerKey.toLowerCase()} - ${roles[playerKey]
                .map(ballType => formatBallType(ballType))
                .join(' | ')}`}
              value={playerNames[playerKey]}
              onChange={e => setPlayerNames(curr => ({ ...curr, [playerKey]: e.target.value }))}
            />
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
                disabled={winners.includes(player) || losers.includes(player)}
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
              if (winningShot) {
                if (lost) setLosers(curr => [...curr, selectedPlayer])
                else setWinners(curr => [...curr, selectedPlayer])

                setSelectedPlayer(
                  curr =>
                    Object.values(Player).find(
                      player =>
                        !winners.includes(player) && !losers.includes(player) && player !== curr,
                    ) ?? curr,
                )
              }
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
          {winningShot && balls.some(ball => ball.queued) && (
            <Input
              type="checkbox"
              label="called wrong pocket / scratched"
              checked={lost}
              onChange={e => setLost(e.target.checked)}
            />
          )}
        </BallsWrapper>
      </LeftSection>
      <RightSection>
        <SseoGraph
          roles={roles}
          playerNames={playerNames}
          decided={decided}
          winners={winners}
          losers={losers}
        />
      </RightSection>
    </Wrapper>
  )
}

export default SseoContainer
