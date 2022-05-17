function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}

