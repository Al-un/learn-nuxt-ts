<template>
  <nuxt/>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  height: 100%;
  background: linear-gradient(to right bottom, #42b883 25%, #35495e 75%);
}

html,
body {
  margin: 0;
  padding: 0;
}

button {
  /* sizing */
  padding: 0.25rem 0.75rem;
  /* borders */
  border-radius: 4px;
  border-color: peru;
  /* color */
  background-color: white;
  color: peru;
  transition: background-color 0.2s, color 0.2s;
}

button:hover {
  background-color: peru;
  color: white;
  cursor: pointer;
}
</style>
