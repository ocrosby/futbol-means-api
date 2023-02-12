import { beforeEach, describe, expect, test } from '@jest/globals';

import { Player } from '../../../../src/data-layer/models/Player';
import { FreeKick } from '../../../../src/data-layer/models/events/FreeKick';

describe('FreeKick', () => {
  let freeKick: FreeKick;

  beforeEach(() => {
    freeKick = new FreeKick();
  });

  test('default constructor', () => {
    expect(freeKick.getTimestamp()).toBe(null);
    expect(freeKick.getPlayer()).toBe(null);
  });

  test('setTimestamp updates timestamp', () => {
    const timestamp = new Date();

    freeKick.setTimestamp(timestamp);

    expect(freeKick.getTimestamp()).toBe(timestamp);
  });

  test('setPlayer updates player', () => {
    const player = new Player();

    freeKick.setPlayer(player);

    expect(freeKick.getPlayer()).toBe(player);
  });

  test('toString returns timestamp and player', () => {
    const timestamp = new Date();
    const player = new Player();

    freeKick.setTimestamp(timestamp);
    freeKick.setPlayer(player);

    expect(freeKick.toString()).toBe(
      'Free Kick: ' + player.toString() + ' ' + timestamp
    );
  });
});
