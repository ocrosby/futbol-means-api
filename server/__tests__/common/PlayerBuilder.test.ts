import {beforeEach, describe, expect, test} from '@jest/globals';

import {Player} from '../../src/common/Player';
import {PlayerBuilder} from '../../src/common/PlayerBuilder';

describe('PlayerBuilder', () => {
    let playerBuilder: PlayerBuilder;

    beforeEach(() => {
        playerBuilder = new PlayerBuilder();
    });

    test('default constructor', () => {
        expect(playerBuilder.getInstance()).toBe(null);
    });

    test('build', () => {
        playerBuilder.build();

        expect(playerBuilder.getInstance()).toBeInstanceOf(Player);
    });

    test('buildName', () => {
        playerBuilder.build().buildName('John Doe');

        expect(playerBuilder.getInstance().getName()).toBe('John Doe');
    });

    test('buildJerseyNumber', () => {
        playerBuilder.build().buildJerseyNumber(42);

        expect(playerBuilder.getInstance().getJerseyNumber()).toBe(42);
    });

    test('buildPosition', () => {
        playerBuilder.build().buildPosition('QB');

        expect(playerBuilder.getInstance().getPosition()).toBe('QB');
    });

    test('buildName, buildJerseyNumber, buildPosition', () => {
        playerBuilder.build().buildName('John Doe').buildJerseyNumber(42).buildPosition('QB');

        expect(playerBuilder.getInstance().getName()).toBe('John Doe');
        expect(playerBuilder.getInstance().getJerseyNumber()).toBe(42);
        expect(playerBuilder.getInstance().getPosition()).toBe('QB');
    });
});
