export default class SomeClass {
  public value = 4;

  constructor() {
    // console.log('SomeClass constructor called');
  }

  public moarValue(): Number {
    return this.value + 2;
  }
}
