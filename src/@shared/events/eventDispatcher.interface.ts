import { EventInterface } from './event.interface';
import { HandlerInterface } from './handler.interface';

export abstract class EventDispatcherInterface {
  abstract notify(event: EventInterface): void;
  abstract register(eventName: string, eventHandler: HandlerInterface): void;
  abstract unregister(eventName: string, eventHandler: HandlerInterface): void;
  abstract unregisterAll(): void;
}
