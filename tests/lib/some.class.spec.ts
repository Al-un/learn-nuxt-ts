import SomeClass from '@/lib/some.class';

let some: SomeClass

describe('SomeClass', () => {
  beforeEach(() => {
    some = new SomeClass();
  });

  test('it initialises', () => {
    expect(some.value).toBe(4);
  });

  test('it has moar value', () => {
    expect(some.moarValue()).toBe(6);
  });
});
