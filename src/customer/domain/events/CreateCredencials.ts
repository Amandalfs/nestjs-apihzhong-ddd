import { EventInterface } from '@/@shared/events/event.interface';

export class CreateCredencialsEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(data: { password: string; email: string; customerId: string }) {
    this.dateTimeOccurred = new Date();
    this.eventData = data;
  }
}
