import { beforeEach, describe, expect, test } from '@jest/globals';

import { Player } from '../../../../src/data-layer/models/Player';
import { CardIssued } from '../../../../src/data-layer/models/events/CardIssued';
import { CardTypes } from '../../../../src/data-layer/models/CardTypes';

describe('CardIssued', () => {
  let cardIssued: CardIssued;

  beforeEach(() => {
    cardIssued = new CardIssued();
  });

  test('default constructor', () => {
    expect(cardIssued.getTimestamp()).toBe(null);
    expect(cardIssued.getPlayer()).toBe(null);
    expect(cardIssued.getCardType()).toBe(null);
  });

  test('setTimestamp updates timestamp', () => {
    const timestamp = new Date();

    cardIssued.setTimestamp(timestamp);

    expect(cardIssued.getTimestamp()).toBe(timestamp);
  });

  test('setPlayer updates player', () => {
    const player = new Player();

    cardIssued.setPlayer(player);

    expect(cardIssued.getPlayer()).toBe(player);
  });

  test('setCardType updates card', () => {
    const card = CardTypes.Yellow;

    cardIssued.setCardType(card);

    expect(cardIssued.getCardType()).toBe(card);
  });

  test('toString returns timestamp, player, and card', () => {
    const timestamp = new Date();
    const player = new Player();
    const card = CardTypes.Red;

    player.setName('Player 1');

    cardIssued.setTimestamp(timestamp);
    cardIssued.setPlayer(player);
    cardIssued.setCardType(card);

    expect(cardIssued.toString()).toBe(
      'Card Issued: ' + player.getName() + ' ' + card + ' ' + timestamp
    );
  });
});
