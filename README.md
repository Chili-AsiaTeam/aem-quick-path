 Chili-AEM 路径直达助手 (Chrome 扩展)
Chili-AEM Path Shortcut Assistant 是一款专为 ChiliGrafx / Chili Studio 模板制作打造的效率提升工具。它完美解决了在 Chili 中通过 AEM (Adobe Experience Manager) 选图时，文件夹目录层级过深、重复繁琐点击、同名文件夹难以区分等痛点，实现深层 AEM 路径的一键精准直达。

🌟 核心功能特性
⚡ 一键精准直达 (ID 匹配算法) 通过 AEM 资产在 Chili DOM 树中的绝对唯一 ID 路径进行导航，从根本上解决不同目录下“同名文件夹”（如都叫 Destination 或 aou）导致的误触混淆问题。

🔴🔵 智能红蓝指示灯防误触

预加载锁定 (红光 🔴)：触发跳转后，目标文件夹周围闪烁红光并锁定点击，防止在 Chili 异步加载网络杂图时提前误触。
就绪可点击 (蓝光 🔵)：1.5 秒后数据加载洗牌完成，高亮变蓝并解封点击，确保点进去内部 100% 纯净无杂图。
🖼️ 自动联动 MEDIA 选图侧边栏
支持自动触发左下角 Resources 图标。
提供专属的 🖼️ 打开 MEDIA 选图列表 按钮，秒级切入 AEMv10 选图界面。
📌 自动清空搜索框（恢复原生态视图） 当您双击进入目标文件夹的瞬间，插件会自动清空顶部的 Search 搜索框，自动切回 Chili 原生纯净文件夹视图，使内部图片毫秒级无缝加载呈现。

🎈 自由拖拽悬浮球 (Draggable UI) 右下角悬浮球支持全屏幕自由拖拽，随心摆放，不遮挡任何 Chili 编辑区或属性面板。

📦 安装与部署指南
1. 准备插件文件
在本地新建一个文件夹（如 chili-aem-helper），确保文件夹内包含以下 3 个文件：

manifest.json
content.js
styles.css
2. 在浏览器中加载插件 (Chrome / Edge)
打开 Chrome 浏览器，在地址栏输入：chrome://extensions/
开启右上角的 “开发者模式” (Developer mode)。
点击左上角的 “加载已解压的扩展程序” (Load unpacked)。
选择刚才新建的 chili-aem-helper 文件夹完成加载。
🚀 最佳使用工作流 (Workflow)
步骤一：添加/保存目标文件夹书签
打开 Chili 编辑器，在左侧 AEMv10 侧边栏中找到您常用的目标文件夹。
按 F12 打开开发者工具，用鼠标审查（Inspect）该文件夹元素，复制其 <section> 标签上的完整 id 属性：
示例 ID：/content/dam/tccc/marketing/multi-brand/portfolio-gettogether-2025/none/shoppers/destination

点击右下角 ⚡ AEM 路径直达 悬浮球，展开插件面板。
输入书签别名（如：SA Destination 1）和刚才复制的完整 ID，点击 + 保存唯一书签。
步骤二：日常高效选图使用
点击右下角 ⚡ AEM 路径直达 悬浮球（自动打开左侧 Resources 面板）。
点击插件面板顶部的 🖼️ 1. 打开 MEDIA 选图列表 绿色按钮，左侧瞬间切入 AEMv10 选图区。
在快捷列表中点击您保存的目标书签：
目标文件夹会在侧边栏中被独家保留，其余重名文件夹被自动屏蔽；
文件夹四周呈现 🔴 红色发光预警（数据传输中）；
1.5 秒后自动变为 🔵 蓝色发光框（就绪）。
双击这个蓝色发光框进入文件夹，顶栏搜索词自动清空，里面的专属图片秒级无缝呈现，直接拖拽或填入模板使用！
