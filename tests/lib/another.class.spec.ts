import AnotherClass from '@/lib/another.class';

let anot: AnotherClass

describe('Another Class', () => {
  beforeEach(() => {
    anot = new AnotherClass();
  });

  test('it initialises', () => {
    expect(anot.text).toBe('text');
  });

  test('it has moar test', () => {
    expect(anot.moarText()).toBe('moar text');
  });
});
