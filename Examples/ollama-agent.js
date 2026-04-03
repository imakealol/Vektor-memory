const { createMemory } = require('vektor-slipstream');

async function run() {
  // Fully local — zero API cost, zero cloud, air-gapped
  const memory = await createMemory({
    agentId:    'local-01',
    dbPath:     './local-bot.db',
    licenceKey: process.env.VEKTOR_LICENCE_KEY,
    provider:   'ollama',
  });

  await memory.remember('I am currently learning about graph databases');
  await memory.remember('Preference: local-first tools with no cloud dependency');

  const ctx = await memory.recall('What have I been learning?', 5);
  console.log('Local context retrieval:', ctx);

  // REM compression — run when idle
  await memory.dream();
  console.log('REM cycle complete');
}
run();
