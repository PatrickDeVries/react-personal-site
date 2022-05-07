import React, { useMemo } from 'react'
import { formatBallType, formatPlayer } from '../formatters'
import { BallType, BallTypeCombo, Player, Roles } from '../types'
import { getQuarters } from '../utils'
import { GraphBody, GraphLabels, GridCell, GridHeader, Label, Wrapper } from './style'

interface Props {
  roles: Roles
  playerNames: Record<Player, string>
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

const SseoGraph: React.FC<Props> = ({ roles, playerNames }) => {
  const decided: Record<BallType, Player | undefined> = useMemo(() => {
    const solidPlayer = Object.values(Player).find(
      player => roles[player].length === 1 && roles[player].includes(BallType.Solid),
    )
    const stripePlayer = Object.values(Player).find(
      player => roles[player].length === 1 && roles[player].includes(BallType.Stripe),
    )
    const evenPlayer = Object.values(Player).find(
      player => roles[player].length === 1 && roles[player].includes(BallType.Even),
    )
    const oddPlayer = Object.values(Player).find(
      player => roles[player].length === 1 && roles[player].includes(BallType.Odd),
    )

    return {
      [BallType.Solid]: solidPlayer,
      [BallType.Stripe]: stripePlayer,
      [BallType.Even]: evenPlayer,
      [BallType.Odd]: oddPlayer,
    }
  }, [roles])

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
                location={getLocation(player, decided, quarters)} // TODO: style position based on each possible option to allow animation
                index={Object.values(quarters).find(arr => arr[0] === player) ? 0 : 1}
              >
                <span>{formatPlayer(player, playerNames)}</span>
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

// <GraphGrid>
//   <div></div>
//   <GridHeader ballType={BallType.Solid}>{formatBallType(BallType.Solid)}</GridHeader>
//   <GridHeader ballType={BallType.Stripe}>{formatBallType(BallType.Stripe)}</GridHeader>

//   <GridHeader ballType={BallType.Even}>{formatBallType(BallType.Even)}</GridHeader>
//   <GridCell>
// {Object.values(Player).map(player => (
//   <Label
//     key={`${BallTypeCombo.SolidEven}-${player}`}
//     location={
//       quarters[BallTypeCombo.SolidEven].includes(player)
//         ? BallTypeCombo.SolidEven
//         : quarters[BallTypeCombo.StripeEven].includes(player)
//         ? BallTypeCombo.StripeEven
//         : quarters[BallTypeCombo.SolidEven].includes(player)
//         ? BallTypeCombo.SolidEven
//         : quarters[BallTypeCombo.SolidOdd].includes(player)
//         ? BallTypeCombo.SolidOdd
//         : decided[BallType.Solid] === player
//         ? BallType.Solid
//         : decided[BallType.Stripe] === player
//         ? BallType.Stripe
//         : decided[BallType.Odd] === player
//         ? BallType.Odd
//         : decided[BallType.Even] === player
//         ? BallType.Even
//         : 'hidden'
//     } // TODO: style position based on each possible option to allow animation
//     index={quarters[BallTypeCombo.SolidEven][0] === player ? 0 : 1} // TODO:for each quarter check if it is at 0
//   >
//     {quarters[BallTypeCombo.SolidEven].includes(player) ||
//     decided[BallType.Solid] === player ||
//     decided[BallType.Even] === player
//       ? formatPlayer(player, playerNames)
//       : ''}{' '}
//     // TODO: accept all possible values
//   </Label>
// ))}
//   </GridCell>
//   <GridCell>
//     {/* {Object.values(Player).map(player => (
//       <Label
//         key={`${BallTypeCombo.StripeEven}-${player}`}
//         location={
//           quarters[BallTypeCombo.StripeEven].includes(player)
//             ? BallTypeCombo.StripeEven
//             : decided[BallType.Solid] === player
//             ? BallType.Stripe
//             : decided[BallType.Even] === player
//             ? BallType.Even
//             : 'hidden'
//         }
//         index={quarters[BallTypeCombo.StripeEven][0] === player ? 0 : 1}
//       >
//         {quarters[BallTypeCombo.StripeEven].includes(player) ||
//         decided[BallType.Solid] === player ||
//         decided[BallType.Even] === player
//           ? formatPlayer(player, playerNames)
//           : ''}
//       </Label>
//     ))} */}
//   </GridCell>

//   <GridHeader ballType={BallType.Odd}>{formatBallType(BallType.Odd)}</GridHeader>
//   <GridCell>
//     {/* <Label location={BallTypeCombo.SolidOdd}>
//       {quarters[BallTypeCombo.SolidOdd]
//         .map(player => formatPlayer(player, playerNames))
//         .join(' | ')}
//     </Label>
//     <Label location={BallType.Odd}>
//       {decided[BallType.Odd] ? decided[BallType.Odd] : ''}
//     </Label> */}
//   </GridCell>
//   <GridCell>
//     {/* <Label location={BallTypeCombo.StripeOdd}>
//       {quarters[BallTypeCombo.StripeOdd]
//         .map(player => formatPlayer(player, playerNames))
//         .join(' | ')}
//     </Label> */}
//   </GridCell>
// </GraphGrid>
