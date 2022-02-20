function forceSearch (text, pattern) {
  const M = text.length,
        N = pattern.length;

  for (let i = 0; i < M - N + 1; i++) {
    let matched = true;

    for (let j = 0; j < N; j++) {
      if (text[i + j] !== pattern[j]) {
        matched = false;
        break;
      }
    }

    if (matched) return i;
  }

  return -1;
}

console.log(forceSearch("axbcabcabx", "abca"));