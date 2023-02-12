import { beforeEach, describe, expect, test } from '@jest/globals';

import { Player } from '../../../../src/data-layer/models/Player';
import { Steal } from '../../../../src/data-layer/models/events/Steal';

describe('Steal', () => {
  let steal: Steal;

  beforeEach(() => {
    steal = new Steal();
  });

  test('default constructor', () => {
    expect(steal.getTimestamp()).toBe(null);
    expect(steal.getPlayer()).toBe(null);
  });

  test('setTimestamp updates timestamp', () => {
    const timestamp = new Date();

    steal.setTimestamp(timestamp);

    expect(steal.getTimestamp()).toBe(timestamp);
  });

  test('setPlayer updates player', () => {
    const player = new Player();

    steal.setPlayer(player);

    expect(steal.getPlayer()).toBe(player);
  });

  test('toString returns timestamp and player', () => {
    const timestamp = new Date();
    const player = new Player();

    steal.setTimestamp(timestamp);
    steal.setPlayer(player);

    expect(steal.toString()).toBe(
      'Steal: ' + player.toString() + ' ' + timestamp
    );
  });
});
