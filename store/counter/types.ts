export interface CounterState extends RootState {
  // Not used, simulating a value which is not initialised
  clickCount: number;
}

export interface RootState {
  count: number;
}
