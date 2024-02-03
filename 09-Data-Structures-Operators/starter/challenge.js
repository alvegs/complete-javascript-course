/*
 */

// CODING CHALLENGE 3

const gameEvents = new Map([
  [17, 'goal'],
  [36, 'substitution'],
  [47, 'goal'],
  [61, 'substitution'],
  [64, 'yellow card'],
  [69, 'red card'],
  [70, 'substitution'],
  [72, 'substitution'],
  [76, 'goal'],
  [80, 'goal'],
  [92, 'yellow card'],
]);

// 1.
const events = new Set(gameEvents.values());
console.log(events);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// 3.
console.log(`an event happened every ${90 / gameEvents.size} minutes`);

// 4.
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}
