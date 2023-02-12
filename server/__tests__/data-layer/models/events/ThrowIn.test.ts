import { beforeEach, describe, expect, test } from '@jest/globals';

import { Player } from '../../../../src/data-layer/models/Player';
import { ThrowIn } from '../../../../src/data-layer/models/events/ThrowIn';

describe('ThrowIn', () => {
  let throwIn: ThrowIn;

  beforeEach(() => {
    throwIn = new ThrowIn();
  });

  test('default constructor', () => {
    expect(throwIn.getTimestamp()).toBe(null);
    expect(throwIn.getPlayer()).toBe(null);
  });

  test('setTimestamp updates timestamp', () => {
    const timestamp = new Date();

    throwIn.setTimestamp(timestamp);

    expect(throwIn.getTimestamp()).toBe(timestamp);
  });

  test('setPlayer updates player', () => {
    const player = new Player();

    throwIn.setPlayer(player);

    expect(throwIn.getPlayer()).toBe(player);
  });

  test('toString returns timestamp and player', () => {
    const timestamp = new Date();
    const player = new Player();

    throwIn.setTimestamp(timestamp);
    throwIn.setPlayer(player);

    expect(throwIn.toString()).toBe(
      'ThrowIn: ' + player.toString() + ' ' + timestamp
    );
  });
});
