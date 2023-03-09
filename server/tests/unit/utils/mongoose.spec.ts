import * as utils from "../../../src/utils/mongoose";

describe('translateReadyState', () => {
  it('should map 0 to "disconnected"', () => {
    // Arrange
    const readyState: number = 0;

    // Act
    const translation = utils.translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('disconnected');

  })

  it('should map 1 to "connected"', () => {
    // Arrange
    const readyState: number = 1;

    // Act
    const translation = utils.translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('connected');
  })

  it('should map 2 to "connecting"', () => {
    // Arrange
    const readyState: number = 2;

    // Act
    const translation = utils.translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('connecting');
  })

  it('should map 3 to "disconnecting"', () => {
    // Arrange
    const readyState: number = 3;

    // Act
    const translation = utils.translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('disconnecting');
  })

  it('should map 99 to "unknown"', () => {
    // Arrange
    const readyState: number = 99;

    // Act
    const translation = utils.translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('unknown');
  })
})

describe('isConnected', () => {
  it('should return true when the ready state is 1', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(1);

    // Act
    const received = utils.isConnected()

    // Assert
    expect(received).toBeTruthy()
  })

  it('should return false when the ready state is 4', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(4);

    // Act
    const received = utils.isConnected()

    // Assert
    expect(received).toBeFalsy()
  })
})

describe('getReadyStateMessage', () => {
  it('should return "disconnected" when the ready state is 0', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(0);

    // Act
    const received = utils.getReadyStateMessage()

    // Assert
    expect(received).toEqual('disconnected')
  })

  it('should return "connected" when the ready state is 1', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(1);

    // Act
    const received = utils.getReadyStateMessage()

    // Assert
    expect(received).toEqual('connected')
  })

  it('should return "connecting" when the ready state is 2', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(2);

    // Act
    const received = utils.getReadyStateMessage()

    // Assert
    expect(received).toEqual('connecting')
  })

  it('should return "disconnecting" when the ready state is 3', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(3);

    // Act
    const received = utils.getReadyStateMessage()

    // Assert
    expect(received).toEqual('disconnecting')
  })

  it('shouold return "unknown" when the ready state is 4', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(4);

    // Act
    const received = utils.getReadyStateMessage()

    // Assert
    expect(received).toEqual('unknown')
  })

  it('should return "unknown" when the ready state is 99', () => {
    // Arrange
    jest.spyOn(utils, 'getReadyState').mockReturnValue(99);

    // Act
    const received = utils.getReadyStateMessage()

    // Assert
    expect(received).toEqual('unknown')
  })
})
