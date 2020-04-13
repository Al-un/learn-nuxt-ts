<template>
  <div>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-image: linear-gradient(
    to bottom right,
    $colorBgStart,
    $colorBgEnd
  );
  min-height: 100vh;
}

main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: #fafcff;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
