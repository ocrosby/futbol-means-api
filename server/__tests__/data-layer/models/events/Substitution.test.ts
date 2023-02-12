import { beforeEach, describe, expect, test } from '@jest/globals';

import { Player } from '../../../../src/data-layer/models/Player';
import { Substitution } from '../../../../src/data-layer/models/events/Substitution';

describe('Substitution', () => {
  let substitution: Substitution;

  beforeEach(() => {
    substitution = new Substitution();
  });

  test('default constructor', () => {
    expect(substitution.getTimestamp()).toBe(null);
    expect(substitution.getPlayer()).toBe(null);
  });

  test('setTimestamp updates timestamp', () => {
    const timestamp = new Date();

    substitution.setTimestamp(timestamp);

    expect(substitution.getTimestamp()).toBe(timestamp);
  });

  test('setPlayer updates player', () => {
    const player = new Player();

    substitution.setPlayer(player);

    expect(substitution.getPlayer()).toBe(player);
  });

  test('toString returns timestamp and player', () => {
    const timestamp = new Date();
    const player = new Player();

    substitution.setTimestamp(timestamp);
    substitution.setPlayer(player);

    expect(substitution.toString()).toBe(
      'Substitution: ' + player.toString() + ' ' + timestamp
    );
  });
});
