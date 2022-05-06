import { Button } from '@headstorm/foundry-react-ui'
import React, { useState } from 'react'
import { useTheme } from '../../providers/ThemeProvider'
import Input from '../input'
import { BallsWrapper, ConfirmQueue, LeftSection, PlayerWrapper, PoolBall, Wrapper } from './style'

enum PlayerRoles {
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR',
}

enum BallTypes {
  Solid = 'SOLID',
  Stripe = 'STRIPE',
  Even = 'EVEN',
  Odd = 'ODD',
}

interface Players {
  one: string
  two: string
  three: string
  four: string
}

type Roles = {
  [key in PlayerRoles]: BallTypes[]
}

const ballsSunkToRole = (balls: number[], role: BallTypes[]): BallTypes[] => {
  console.log(balls)
  const sunkTypes = {
    [BallTypes.Even]: balls.filter(ball => ball % 2 === 0),
    [BallTypes.Odd]: balls.filter(ball => !(ball % 2 === 0)),
    [BallTypes.Solid]: balls.filter(ball => ball <= 8),
    [BallTypes.Stripe]: balls.filter(ball => ball >= 9),
  }

  const newRole = Object.values(BallTypes).reduce(
    (arr, type) => (sunkTypes[type].length > 0 && role.includes(type) ? [...arr, type] : arr),
    [],
  )

  return newRole.length > 0 ? newRole : role
}

const removeDecided = (roles: Roles): Roles => {
  const decidedCount = Object.values(roles).reduce(
    (curr, ballTypes) => curr + +(ballTypes.length === 1),
    0,
  )
  if (decidedCount < 4) {
    Object.values(PlayerRoles).forEach(decidedPlayer => {
      if (roles[decidedPlayer].length === 1) {
        Object.values(PlayerRoles)
          .filter(p => p !== decidedPlayer)
          .forEach(p => {
            roles[p] = roles[p].filter(ballType => ballType !== roles[decidedPlayer][0])
          })
      }
    })

    const newDecided = Object.values(roles).reduce(
      (curr, ballTypes) => curr + +(ballTypes.length === 1),
      0,
    )
    if (newDecided > decidedCount) return removeDecided(roles)
    return roles
  }
  return roles
}

const pushByQuarter = (roles: Roles): Roles => {
  const playersInQuarters = Object.keys(roles).filter(player => roles[player].length === 2)
  if (playersInQuarters.length <= 1) return roles

  const quarters = {
    solidEven: playersInQuarters.filter(player =>
      roles[player].includes(BallTypes.Solid, BallTypes.Even),
    ),
    solidOdd: playersInQuarters.filter(player =>
      roles[player].includes(BallTypes.Solid, BallTypes.Odd),
    ),
    stripeEven: playersInQuarters.filter(player =>
      roles[player].includes(BallTypes.Stripe, BallTypes.Even),
    ),
    stripeOdd: playersInQuarters.filter(player =>
      roles[player].includes(BallTypes.Stripe, BallTypes.Odd),
    ),
  }

  const fullCorner = Object.keys(quarters).find(q => quarters[q].length > 1)
  if (!fullCorner) return roles

  Object.keys(roles)
    .filter(player => !quarters[fullCorner].includes(player))
    .forEach(player => {
      roles[player] = roles[player].filter(
        ballType => !roles[quarters[fullCorner][0]].includes(ballType),
      )
    })

  roles = removeDecided(roles)

  return roles
}

const cascadeRoles = (roles: Roles): Roles => {
  let rolesCopy = { ...roles }
  rolesCopy = removeDecided(rolesCopy)
  rolesCopy = pushByQuarter(rolesCopy)

  return rolesCopy
}

const SseoContainer: React.FC = () => {
  const { theme } = useTheme()
  const [playerNames, setPlayerNames] = useState<Record<PlayerRoles, string>>({
    [PlayerRoles.One]: '',
    [PlayerRoles.Two]: '',
    [PlayerRoles.Three]: '',
    [PlayerRoles.Four]: '',
  })
  const [balls, setBalls] = useState<{ sunkBy: PlayerRoles | null; queued: boolean }[]>(
    new Array(15).fill({ sunkBy: null, queued: false }),
  )
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerRoles>(PlayerRoles.One)
  const [roles, setRoles] = useState<Roles>({
    [PlayerRoles.One]: Object.values(BallTypes),
    [PlayerRoles.Two]: Object.values(BallTypes),
    [PlayerRoles.Three]: Object.values(BallTypes),
    [PlayerRoles.Four]: Object.values(BallTypes),
  })

  return (
    <Wrapper>
      <LeftSection>
        {Object.values(PlayerRoles).map((playerKey, i) => (
          <PlayerWrapper key={playerKey}>
            <Input
              type="text"
              label={`Player ${i + 1} ${roles[playerKey]}`}
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

        <div>Remaining</div>
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
          <div>Queued</div>
          <select
            value={selectedPlayer}
            onChange={e => setSelectedPlayer(e.target.value as PlayerRoles)}
          >
            {Object.values(PlayerRoles).map((player, i) => (
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
      {/* <RightSection>right</RightSection> */}
    </Wrapper>
  )
}

export default SseoContainer
