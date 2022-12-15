import { BetterDatePipe } from './better-date.pipe';

describe('BetterDatePipe', () => {
  it('create an instance', () => {
    const pipe = new BetterDatePipe();
    expect(pipe).toBeTruthy();
  });
});
