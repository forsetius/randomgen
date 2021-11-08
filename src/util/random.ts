/**
 * Roll a number of specified dice
 *
 * For 2d10+1 use roll(2, 10, 1);
 *
 * @param n Roll that many dice
 * @param sides Roll dices with that many sides
 * @param modifier Add this modifier to the roll result
 * @returns
 */
export function roll(n: number, sides: number, modifier = 0): number {
  return new Array(n).map(() => Math.floor(Math.random() * sides) + 1).reduce((p, c) => p + c, 0) + modifier;
}

export function flipCoin(): boolean {
  return Math.random() > 0.5;
}
