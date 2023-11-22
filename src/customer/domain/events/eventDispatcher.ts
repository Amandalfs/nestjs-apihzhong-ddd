import { EventInterface } from '@/@shared/events/event.interface';
import { EventDispatcherInterface } from '@/@shared/events/eventDispatcher.interface';
import { HandlerInterface } from '@/@shared/events/handler.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: HandlerInterface[] } = {};

  constructor() {}

  get getEventHandlers(): { [eventName: string]: HandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    const handlers = this.eventHandlers[eventName];
    if (handlers) {
      handlers.forEach((handler) => handler.handle(event));
    }
  }

  register(
    eventName: string,
    eventHandler: HandlerInterface<EventInterface>,
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: HandlerInterface<EventInterface>,
  ): void {
    if (this.eventHandlers[eventName].length > 0) {
      const indexHandler = this.eventHandlers[eventName].findIndex(
        (event) => event === eventHandler,
      );
      this.eventHandlers[eventName].splice(indexHandler, 1);
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
