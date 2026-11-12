import yaml from 'yaml'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { getProcessedVersion, isDevBuild } from './version-utils.mjs'

const repo = process.env.GITHUB_REPOSITORY || 'ToruOlenyeva/clash-party'
const version = getProcessedVersion()
const isDev = isDevBuild()
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

const latest = {
  version,
  changelog
}

const upstreamSha = process.env.UPSTREAM_SHA || 'local'
changelog += `\n\n### 下载地址（Windows 10/11 64位）：\n- 安装版：[clash-party-windows-${version}-x64-setup.exe](${downloadUrl}/clash-party-windows-${version}-x64-setup.exe)\n- 便携版：[clash-party-windows-${version}-x64-portable.7z](${downloadUrl}/clash-party-windows-${version}-x64-portable.7z)\n\n<!-- upstream-sha: ${upstreamSha} -->\n`

writeFileSync('latest.yml', yaml.stringify(latest))
writeFileSync('release-notes.md', changelog)
