import {afterEach, beforeEach, describe, expect, test} from '@jest/globals';

import {Player, PlayerBuilder} from '../../src/models/player';

describe('player module', () => {
    describe('Player', () => {
        let player: Player;

        beforeEach(() => {
            player = new Player();
        });

        test('default constructor', () => {
            expect(player.getName()).toBe(null);
            expect(player.getJerseyNumber()).toBe(null);
            expect(player.getPosition()).toBe(null);
        });

        test('setName updates name', () => {
            player.setName('John Doe');

            expect(player.getName()).toBe('John Doe');
        });

        test('setJerseyNumber updates jersey number', () => {
            player.setJerseyNumber(42);
            expect(player.getJerseyNumber()).toBe(42);
        });

        test('setPosition updates position', () => {
            player.setPosition('QB');
            expect(player.getPosition()).toBe('QB');
        });

        test('toString returns name, jersey number, and position', () => {
            player.setName('John Doe');
            player.setJerseyNumber(42);
            player.setPosition('QB');

            expect(player.toString()).toBe('John Doe 42 QB');
        });
    });

    describe('PlayerBuilder', () => {
    });
});
