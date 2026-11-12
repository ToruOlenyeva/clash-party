<h3 align="center">
  <img height='48px' src='./images/icon-white.png#gh-dark-mode-only'>
  <img height='48px' src='./images/icon-black.png#gh-light-mode-only'>
</h3>

<h3 align="center">Clash Party (Hysteria 2 测速增强版)</h3>

<p align="center">
  <a href="https://github.com/ToruOlenyeva/clash-party/releases">
    <img src="https://img.shields.io/github/v/release/ToruOlenyeva/clash-party?include_prereleases&label=Release">
  </a>
</p>
<div align='center'>
<img width='90%' src="./images/preview.jpg">
</div>

### 定制增强特性

- [x] <b>Hysteria 2 订阅带宽策略弹窗</b>：导入含 `hysteria2` / `hy2` 节点的订阅时自动引导选择拥塞控制策略（一键清空切换 BBR、自定义 Brutal 限速或保持订阅原值）
- [x] <b>旁路 TUN 与系统代理的物理网卡直连测速</b>：自动绑定本机物理网卡 IPv4 并发测速，剔除连接初期突发脉冲并按稳定峰值 `85%` 自动填入推荐上下行带宽
- [x] <b>策略独立持久化与自动重放</b>：每个订阅的带宽策略独立保存于 `hy2-bandwidth.yaml`，订阅定时或手动更新后自动重放，永不被远端订阅冲掉
- [x] <b>自动同步上游与客户端自更新</b>：GitHub Actions 每日自动同步上游最新代码并编译发布 Windows x64 安装包与便携包，客户端内点击「检查更新」直接拉取本仓库最新构建

### 基础特性

- [x] 一键 Smart Core 规则覆写，基于 AI 模型自动选择最优节点
- [x] 开箱即用，无需服务模式的 Tun
- [x] 多种配色主题可选，UI 焕然一新
- [x] 支持大部分 Mihomo(Clash Meta) 常用配置修改
- [x] 内置 Smart内核 与 Mihomo(Clash Meta) 内核
- [x] 通过 WebDAV 一键备份和恢复配置
- [x] 强大的覆写功能，任意修订配置文件
- [x] 深度集成 Sub-Store，轻松管理订阅
