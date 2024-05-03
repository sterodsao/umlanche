import { EntityID } from '../entities/entity-id'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): EntityID
}
