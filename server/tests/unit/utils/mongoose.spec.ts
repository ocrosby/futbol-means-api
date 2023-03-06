import {translateReadyState} from "../../../src/utils/mongoose";

describe('translateReadyState', () => {
  it('should map 0 to "disconnected"', () => {
    // Arrange
    const readyState: number = 0;

    // Act
    const translation = translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('disconnected');

  })

  it('should map 1 to "connected"', () => {
    // Arrange
    const readyState: number = 1;

    // Act
    const translation = translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('connected');
  })

  it('should map 2 to "connecting"', () => {
    // Arrange
    const readyState: number = 2;

    // Act
    const translation = translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('connecting');
  })

  it('should map 3 to "disconnecting"', () => {
    // Arrange
    const readyState: number = 3;

    // Act
    const translation = translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('disconnecting');
  })

  it('should map 99 to "unknown"', () => {
    // Arrange
    const readyState: number = 99;

    // Act
    const translation = translateReadyState(readyState);

    // Assert
    expect(translation).toEqual('unknown');
  })



})
