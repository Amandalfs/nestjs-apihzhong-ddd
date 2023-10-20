import { EventInterface } from './event.interface';

export interface HandlerInterface<T extends EventInterface = EventInterface> {
  handle(event: T): void;
}
