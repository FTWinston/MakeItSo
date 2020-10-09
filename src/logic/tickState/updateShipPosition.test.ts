import { durationToTimeSpan } from '../../common/data/Progression';
import { ShipState } from '../../common/data/server/ShipState';
import { Waypoint } from '../../common/data/Waypoint';
import { createShipState } from '../createShipState';
import { updateShipPosition, shouldUpdatePosition, addWaypoint } from './updateShipPosition';

test('moves to single waypoint then holds position', () => {
    const ship = createShipState();

    const waypoint: Waypoint = {
        x: 0,
        y: 50,
    };

    addWaypoint(ship, waypoint);

    let currentTime = 0;
    expect(shouldUpdatePosition(ship, currentTime))
        .toBeTruthy();
    
    updateShipPosition(ship, currentTime);

    expect(ship.position).toHaveLength(4);

    const [
        orig0,
        orig1,
        orig2,
        orig3,
    ] = ship.position;

    expect(orig0.val).toEqual({
        x: 0,
        y: 0,
        angle: 0,
    });

    expect(orig3.val).toEqual({
        x: waypoint.x,
        y: waypoint.y,
        angle: Math.PI / 2,
    });

    expect(orig0.time).toBeLessThan(currentTime);
    expect(orig1.time).toEqual(currentTime);
    expect(orig2.time).toBeGreaterThan(currentTime);
    expect(orig3.time).toBeGreaterThan(orig2.time);

    currentTime = (orig0.time + orig1.time) / 2;
    
    expect(shouldUpdatePosition(ship, currentTime))
        .toBeFalsy();
    
    currentTime = (orig1.time + orig2.time) / 2;
    
    expect(shouldUpdatePosition(ship, currentTime))
        .toBeFalsy();

    currentTime = (orig2.time + orig3.time) / 2;
    
    expect(shouldUpdatePosition(ship, currentTime))
        .toBeTruthy();

    updateShipPosition(ship, currentTime);

    expect(ship.waypoints).toHaveLength(1);
    expect(ship.waypoints[0]).toStrictEqual(waypoint);

    expect(ship.position).toHaveLength(4);

    const [
        final0,
        final1,
        final2,
        final3,
    ] = ship.position;

    expect(final0).toEqual(orig1);
    expect(final1).toEqual(orig2);
    expect(final2).toEqual(orig3);

    expect(final3.time).toBeGreaterThan(orig3.time);
    expect(final3.val).toEqual(orig3.val);

    currentTime = (final2.time + final3.time) / 2;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeTruthy();

    expect(ship.waypoints).toHaveLength(0);
});

test('moves through multiple waypoints (added together)', () => {
    const ship = createShipState();

    const waypoint1: Waypoint = {
        x: 0,
        y: 50,
    };

    const waypoint2: Waypoint = {
        x: 50,
        y: 50,
    };

    const waypoint3: Waypoint = {
        x: 50,
        y: 0,
    };

    addWaypoint(ship, waypoint1);
    addWaypoint(ship, waypoint2);
    addWaypoint(ship, waypoint3);

    let currentTime = 0;
    updateShipPosition(ship, currentTime);

    testThreeWaypoints(ship, currentTime, waypoint1, waypoint2, waypoint3);
});

test('moves through multiple waypoints (added separately)', () => {
    const ship = createShipState();

    const waypoint1: Waypoint = {
        x: 0,
        y: 50,
    };

    const waypoint2: Waypoint = {
        x: 50,
        y: 50,
    };

    const waypoint3: Waypoint = {
        x: 50,
        y: 0,
    };

    addWaypoint(ship, waypoint1);
    let currentTime = 0;
    updateShipPosition(ship, currentTime);

    addWaypoint(ship, waypoint2);
    currentTime = durationToTimeSpan(0.025);
    updateShipPosition(ship, currentTime);

    addWaypoint(ship, waypoint3);
    currentTime = durationToTimeSpan(0.05);
    updateShipPosition(ship, currentTime);

    testThreeWaypoints(ship, currentTime, waypoint1, waypoint2, waypoint3);
});

function testThreeWaypoints(ship: ShipState, currentTime: number, waypoint1: Waypoint, waypoint2: Waypoint, waypoint3: Waypoint) {
    expect(ship.position.length).toBeGreaterThanOrEqual(4);

    const [
        orig0,
        orig1,
        orig2,
        orig3,
    ] = ship.position;

    expect(orig0.val).toEqual({
        x: 0,
        y: 0,
        angle: 0,
    });

    expect(orig3.val).toEqual({
        x: waypoint1.x,
        y: waypoint1.y,
        angle: Math.PI / 4,
    });

    expect(orig0.time).toBeLessThan(currentTime);
    expect(orig1.time).toBeLessThanOrEqual(currentTime);
    expect(orig2.time).toBeGreaterThan(currentTime);
    expect(orig3.time).toBeGreaterThan(orig2.time);

    currentTime = (orig0.time + orig1.time) / 2;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeFalsy();

    currentTime = (orig1.time + orig2.time) / 2;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeFalsy();

    currentTime = (orig2.time + orig3.time) / 2;

    /*
    expect(shouldUpdatePosition(ship, currentTime))
        .toBeTruthy();
    */

    updateShipPosition(ship, currentTime);

    expect(ship.waypoints).toHaveLength(3);

    expect(ship.position).toHaveLength(5);

    const [
        update0,
        update1,
        update2,
        update3,
        update4,
    ] = ship.position;

    expect(update0.val).toEqual(orig1.val);
    expect(update1.val).toEqual(orig2.val);
    expect(update2.val).toEqual(orig3.val);
    expect(update4.val).toEqual({
        x: waypoint2.x,
        y: waypoint2.y,
        angle: 7 * Math.PI / 4,
    });

    expect(update0.time).toEqual(orig1.time);
    expect(update1.time).toEqual(orig2.time);
    expect(update2.time).toEqual(orig3.time);
    expect(update3.time).toBeGreaterThan(orig3.time);
    expect(update4.time).toBeGreaterThan(update3.time);

    currentTime = (update2.time + update3.time) / 2;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeFalsy();

    currentTime = (update3.time + update4.time) / 2;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeTruthy();

    updateShipPosition(ship, currentTime);

    expect(ship.waypoints).toHaveLength(2);

    expect(ship.position).toHaveLength(5);

    const [
        final0,
        final1,
        final2,
        final3,
        final4,
    ] = ship.position;

    expect(final0.val).toEqual(update2.val);
    expect(final1.val).toEqual(update3.val);
    expect(final2.val).toEqual(update4.val);
    expect(final4.val).toEqual({
        x: waypoint3.x,
        y: waypoint3.y,
        angle: 3 * Math.PI / 2
    });

    expect(final0.time).toEqual(update2.time);
    expect(final1.time).toEqual(update3.time);
    expect(final2.time).toEqual(update4.time);
    expect(final3.time).toBeGreaterThan(update4.time);
    expect(final4.time).toBeGreaterThan(final3.time);

    currentTime = (final2.time + final3.time) / 2;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeFalsy();

    currentTime = (final3.time + final4.time) / 2;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeTruthy();

    updateShipPosition(ship, currentTime);

    expect(ship.waypoints).toHaveLength(1);

    expect(ship.position).toHaveLength(4);

    const [
        absFinal0,
        absFinal1,
        absFinal2,
        absFinal3,
    ] = ship.position;

    expect(absFinal0).toEqual(final2);
    expect(absFinal1).toEqual(final3);
    expect(absFinal2).toEqual(final4);

    expect(absFinal3.time).toBeGreaterThan(final4.time);
    expect(absFinal3.val.x).toEqual(waypoint3.x);
    expect(absFinal3.val.y).toEqual(waypoint3.y);

    currentTime = absFinal3.time;

    expect(shouldUpdatePosition(ship, currentTime))
        .toBeTruthy();

    expect(ship.waypoints).toHaveLength(0);
}
