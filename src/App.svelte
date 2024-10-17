<script lang="ts">
  import dayjs from "dayjs";
  import formatEmail from "./format_email";

  const settingsKey = 'emailGeneratorSettings';

  let email: string
  let pattern = 'test_[YYYYMMDD-HHmm]@example.com';
  let history: string[] = [];

  const generateEmail = () => {
    const date = dayjs();
    email = formatEmail(pattern, date);
  }
  setInterval(generateEmail, 1000);

  const generateEmailAndSaveSettings = () => {
    generateEmail();

    saveSettings();
  }

  const copyAndSave = async () => {
    await navigator.clipboard.writeText(email);

    if (!history.includes(email)) {
      history = [email, ...history];
    }

    saveSettings();
  }

  const clearHistory = () => {
    history.length = 0

    saveSettings();
  }

  const loadSettings = () => {
    const settings = localStorage.getItem(settingsKey);
    if (!settings) return;

    try {
      const parsedSettings = JSON.parse(settings);
      pattern = parsedSettings.pattern;
      history = parsedSettings.history;
    } catch {
      // Ignore errors
    }
  }
  loadSettings();
  generateEmail();

  const saveSettings = () => {
    const settings = JSON.stringify({ pattern, history });
    localStorage.setItem(settingsKey, settings);
  }
</script>

<main>
  <h1>Generate e-mail address</h1>

  <form>
    <div class="pattern">
      <p>Text within [] is formatted using the format function of dayjs. <a href="https://day.js.org/docs/en/display/format" target="_blank" rel="noopener noreferrer">Formatting options.</a></p>
      <input type="text" name="pattern" id="pattern" bind:value={pattern} on:change={generateEmailAndSaveSettings} />
    </div>

    <div class="result">
      {email}
    </div>

    <div class="buttons">
      <button type="button" on:click={copyAndSave}>Copy and save</button>
    </div>

    <div class="history">
      {#each history as item}
        <div>{item}</div>
      {/each}
    </div>

    <div class="clear">
      {#if history.length}
        <button type="button" on:click={clearHistory}>Clear</button>
      {/if}
    </div>

  </form>

</main>

<style>
  #pattern {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding: 4px 8px;
    margin-bottom: 24px;
    border-radius: 3px;
    width: 100%;
  }

  .result {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding: 4px 8px;
    margin-bottom: 24px;
    border-radius: 3px;
    width: 100%;
  }

  .history {
    font-size: 24px;
    margin-top: 24px;
    height: 250px;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .5);
  }

  .clear {
    margin-top: 24px;
    height: 100px;
  }
</style>
