import { $, path } from 'zx'
import { config as getEnv } from 'dotenv'
import { getPortPromise } from 'portfinder'

async function devCli() {
  const { parsed: devEnv } = getEnv({ path: path.resolve(process.cwd(), '.env') })
  const port = await getPortPromise({
    port: Number(devEnv?.VITE_BASE_PROT),
  })

  $`vite --config scripts/vite.config.ts  --port ${port}`

  await $`esno scripts/watch.ts ${port}`

  process.exit()
}

devCli()
