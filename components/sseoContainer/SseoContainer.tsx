import React, { useState } from 'react'
import Input from '../input'
import { BallsWrapper, LeftSection, PlayerWrapper, PoolBall, Wrapper } from './style'

interface Players {
  one: string
  two: string
  three: string
  four: string
}

const SseoContainer: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<Players>({ one: '', two: '', three: '', four: '' })
  const [balls, setBalls] = useState<{ sunkBy: keyof Players | null; queued: boolean }[]>(
    new Array(15).fill({ sunkBy: null, queued: false }),
  )
  const [selectedPlayer, setSelectedPlayer] = useState<keyof Players>('one')

  return (
    <Wrapper>
      <LeftSection>
        {Object.keys(playerNames).map((playerKey, i) => (
          <PlayerWrapper key={playerKey}>
            <Input
              type="text"
              label={`Player ${i}`}
              value={playerNames[playerKey]}
              onChange={e => setPlayerNames(curr => ({ ...curr, [playerKey]: e.target.value }))}
            />
            {balls.map(
              ({ sunkBy, queued }, index) =>
                sunkBy === playerKey &&
                !queued && (
                  <PoolBall key={`ball-${index + 1}`} num={index + 1}>
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
        <div>Queued</div>
        <label>
          Player
          <select
            value={selectedPlayer}
            onChange={e => setSelectedPlayer(e.target.value as keyof Players)}
          >
            {Object.keys(playerNames).map(player => (
              <option
                key={player}
                label={playerNames[player] || `Player ${player}`}
                value={player}
              />
            ))}
          </select>
          <button
            onClick={() =>
              setBalls(curr =>
                curr.map(({ sunkBy, queued }) => ({
                  sunkBy: queued ? selectedPlayer : sunkBy,
                  queued: false,
                })),
              )
            }
          >
            Confirm
          </button>
        </label>
        <BallsWrapper>
          {balls.map(
            ({ queued }, index) =>
              queued && (
                <PoolBall
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
        <div>Sunk</div>
        <BallsWrapper>
          {balls.map(
            ({ sunkBy, queued }, index) =>
              sunkBy &&
              !queued && (
                <PoolBall key={`ball-${index + 1}`} num={index + 1} sunk>
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
