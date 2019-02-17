export default class SomeClass {
  public value = 4;

  constructor() {
    // console.log('SomeClass constructor called');
  }

  public moarValue(): number {
    return this.value + 2;
  }
}
