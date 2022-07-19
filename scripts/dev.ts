import 'zx/globals'
import { config as getEnv } from 'dotenv'
import { getPortPromise } from 'portfinder'

async function dev() {
  const { parsed: devEnv } = getEnv({ path: path.resolve(process.cwd(), '.env') })
  const port = await getPortPromise({
    port: Number(devEnv?.VITE_BASE_PROT)
  })

  const viteProcess = $`vite --config scripts/vite.config.ts  --port ${port}`
  const rollupProcess = $`esno scripts/watch.ts ${port}`

  viteProcess?.child?.on('close', () => {
    process.exit()
  })

  rollupProcess?.child?.on('close', () => {
    process.exit()
  })
}

dev()
