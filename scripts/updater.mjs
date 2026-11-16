import { existsSync, readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { getBaseVersion } from './version-utils.mjs'

const repo = process.env.GITHUB_REPOSITORY || 'ToruOlenyeva/clash-party'
const isDev = process.argv.includes('--dev')
const version = (process.env.TARGET_VERSION || getBaseVersion()).replace(/^v/, '')
const downloadUrl = isDev
  ? `https://github.com/${repo}/releases/download/dev`
  : `https://github.com/${repo}/releases/download/v${version}`

let changelog = ''
if (existsSync('changelog.md')) {
  changelog = readFileSync('changelog.md', 'utf-8').trim()
}
if (!changelog) {
  let recentCommits = ''
  try {
    recentCommits = execSync('git log -n 8 --pretty=format:"- %s (%h)"', {
      encoding: 'utf-8'
    }).trim()
  } catch {
    recentCommits = '- 同步上游最新特性与修复'
  }
  changelog = `### Clash Party v${version} (Hysteria 2 测速增强版)\n\n#### 内置定制特性：\n- 支持 Hysteria 2 订阅带宽策略弹窗（BBR / Brutal 自定义与直连测速自动填入）\n- 支持旁路 TUN 与系统代理的物理网卡直连上下行测速\n- 订阅更新自动重放已保存的 Hysteria 2 带宽策略\n\n#### 最近更新记录：\n${recentCommits}`
}

const upstreamSha = process.env.UPSTREAM_SHA || 'local'
changelog += `\n\n### 下载地址（Windows 10/11 64位）：\n- 安装版：[clash-party-windows-${version}-x64-setup.exe](${downloadUrl}/clash-party-windows-${version}-x64-setup.exe)\n- 便携版：[clash-party-windows-${version}-x64-portable.7z](${downloadUrl}/clash-party-windows-${version}-x64-portable.7z)\n\n<!-- upstream-sha: ${upstreamSha} -->\n`

const indentedChangelog = changelog
  .replace(/\r\n/g, '\n')
  .split('\n')
  .map((line) => (line.length > 0 ? `  ${line}` : ''))
  .join('\n')
const latestYaml = `version: ${version}\nchangelog: |-\n${indentedChangelog}\n`

writeFileSync('latest.yml', latestYaml)
writeFileSync('release-notes.md', changelog)
