export class SomeClass {
  value = 4;

  constructor() {
    console.log('SomeClass constructor called');
  }

  moarValue(): Number {
    return this.value + 2;
  }
}

export class AnotherClass {
  text = 'text';

  moarText(): String {
    return 'moar ' + this.text;
  }
}
