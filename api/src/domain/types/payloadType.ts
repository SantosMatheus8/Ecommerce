import { UUID } from "crypto";

export interface PayloadType {
  sub: UUID
  email: string
  name: string
  avatar: string
  featureIds: number[]
}

export interface SessionsPayloadType {
  sub: UUID
}
