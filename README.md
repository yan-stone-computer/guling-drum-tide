# 鼓令 · DRUM TIDE

《鼓令 · DRUM TIDE》的官网与 Windows 发布仓库。

- [打开官网](https://yan-stone-computer.github.io/guling-drum-tide/)
- [下载 Windows 安装包](https://github.com/yan-stone-computer/guling-drum-tide/releases/latest/download/Guling-Setup-1.0.3-x64.exe)
- [查看 Release](https://github.com/yan-stone-computer/guling-drum-tide/releases)

![四时灯阵游戏官网预览](docs/shots/desktop-hero.png)

## 内容

- `docs/`：GitHub Pages 官网，包含四时灯阵、核心玩法、四时地图、角色武器、实机截图和下载入口。
- `docs/design-tokens.json`：官网色板与语义颜色。
- GitHub Release：Windows x64 安装包与 SHA256 校验文件。

## 关于安装包

当前发布版本为 `1.0.3`，支持 Windows x64。下载后运行 `Guling-Setup-1.0.3-x64.exe` 完成安装。

安装包由项目现有 Electron 构建产物生成，不包含源码修改。Release 同时提供 SHA256 校验文件。

安装包当前未配置代码签名证书，Windows SmartScreen 可能在首次运行时提示未知发布者。正式商业发行前应补充代码签名。

## 开发

官网源文件位于主项目的 `fashion-site/`，本仓库的 `docs/` 是部署副本。更新官网后同步覆盖 `docs/` 并重新提交即可触发 GitHub Pages。
