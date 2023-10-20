import { EventInterface } from './event.interface';
import { HandlerInterface } from './handler.interface';

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: HandlerInterface): void;
  unregister(eventName: string, eventHandler: HandlerInterface): void;
  unregisterAll(): void;
}
