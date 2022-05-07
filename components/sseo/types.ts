export enum Player {
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR',
}

export enum BallType {
  Solid = 'SOLID',
  Stripe = 'STRIPE',
  Even = 'EVEN',
  Odd = 'ODD',
}

export type Roles = {
  [key in Player]: BallType[]
}

export enum BallTypeCombo {
  SolidEven = 'SOLID_EVEN',
  SolidOdd = 'SOLID_ODD',
  StripeEven = 'STRIPE_EVEN',
  StripeOdd = 'STRIPE_ODD',
}
