import {beforeEach, describe, expect, test} from '@jest/globals';

import { Player } from '../../src/common/Player';
import { Roster } from '../../src/common/Roster';

describe('Roster', () => {
    let roster: Roster;

    beforeEach(() => {
        roster = new Roster();
    });

    test('default constructor', () => {
        expect(roster.getPlayers()).toEqual([]);
    });

    test('setPlayers updates players', () => {
        const players: Player[] = [new Player(), new Player()];
        roster.setPlayers(players);

        expect(roster.getPlayers()).toEqual(players);
    });

    test('addPlayer adds player', () => {
        const player: Player = new Player();
        roster.addPlayer(player);

        expect(roster.getPlayers()).toEqual([player]);
    });

    test('removePlayer removes player', () => {
        const player: Player = new Player();
        roster.addPlayer(player);
        roster.removePlayer(player);

        expect(roster.getPlayers()).toEqual([]);
    });

    test('create creates roster', () => {
        const players: Player[] = [new Player(), new Player()];
        roster = Roster.create(players);

        expect(roster.getPlayers()).toEqual(players);
    });
});
