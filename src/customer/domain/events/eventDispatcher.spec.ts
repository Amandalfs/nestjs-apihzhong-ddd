import { CreateCredencialsEvent } from './CreateCredencials';
import { CreateCredencialsHandler } from './CreateCredencialsHandler';
import { EventDispatcher } from './eventDispatcher';

describe('domain events tests', () => {
  it('Should register event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const AuthUserFacade = {
      createUserAuth: jest.fn(),
    };
    const eventHandler = new CreateCredencialsHandler(AuthUserFacade);

    eventDispatcher.register('CreateCredencialsEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers['CreateCredencialsEvent'],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CreateCredencialsEvent'].length,
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers['CreateCredencialsEvent'][0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const AuthUserFacade = {
      createUserAuth: jest.fn(),
    };
    const eventHandler = new CreateCredencialsHandler(AuthUserFacade);

    eventDispatcher.register('CreateCredencialsEvent', eventHandler);
    eventDispatcher.unregister('CreateCredencialsEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers['CreateCredencialsEvent'],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CreateCredencialsEvent'].length,
    ).toBe(0);
  });

  it('should unregister all events', () => {
    const eventDispatcher = new EventDispatcher();
    const AuthUserFacade = {
      createUserAuth: jest.fn(),
    };
    const eventHandler = new CreateCredencialsHandler(AuthUserFacade);

    eventDispatcher.register('CreateCredencialsEvent', eventHandler);
    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers['CreateCredencialsEvent'],
    ).toBeUndefined();
  });

  it('should notify event', () => {
    const eventDispatcher = new EventDispatcher();
    const AuthUserFacade = {
      createUserAuth: jest.fn(),
    };
    const eventHandler = new CreateCredencialsHandler(AuthUserFacade);
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CreateCredencialsEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['CreateCredencialsEvent'].length,
    ).toBe(1);

    const createCredencialsEvent = new CreateCredencialsEvent({
      customerId: 'id',
      email: 'email@email.com',
      password: '123345677',
    });

    eventDispatcher.notify(createCredencialsEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
