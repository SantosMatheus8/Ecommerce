export interface PayloadType {
  sub: number
  email: string
  name: string
  avatar: string
  featureIds: number[]
}

export interface SessionsPayloadType {
  sub: number
}
