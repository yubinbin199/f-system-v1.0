# F System Demo

这是一个基于 React + TypeScript + Tailwind CSS 的前端项目演示。
This is a frontend demo project based on React + TypeScript + Tailwind CSS.

## 功能 Features

1. **Sidebar Sidebar (左侧边栏)**
   - 包含 "F SYSTEM" Logo。
   - 包含导航菜单 ("交易记录", "银行明细", "科目匹配")。
   - **User Profile (左下角用户信息)**:
     - 点击头像/邮箱可展开菜单。
     - 支持切换语言 (ZH, ZH-TW, EN, JP)。
     - 支持切换币种 (CNY, TWD, USD, JPY)。
     - 支持退出登录。

2. **Upload Module (表格上传模块)**
   - 位于右上角的 "表格上传" 按钮。
   - 点击后弹出模态框 (Modal)。
   - **Upload Modal (上传弹窗)**:
     - 选择银行 (包含指定的8家银行选项)。
     - 上传 CSV 文件模拟。
     - 确认上传。

## 如何运行 How to Run

1. 安装依赖 (Install dependencies):
   ```bash
   npm install
   ```

2. 启动开发服务器 (Start development server):
   ```bash
   npm run dev
   ```

3. 打开浏览器访问 (Open browser):
   通常地址是 http://localhost:5173

## 项目结构 Project Structure

- `src/App.tsx`: 主布局组件 (Main layout)。
- `src/components/Sidebar.tsx`: 左侧边栏 (Sidebar)。
- `src/components/UserProfile.tsx`: 用户菜单与设置 (User menu & settings)。
- `src/components/MainContent.tsx`: 主内容区域与顶部栏 (Main content & header)。
- `src/components/UploadModal.tsx`: 上传文件的弹窗 (Upload modal)。

## 注意事项 Notes

- 图标使用了 `lucide-react` 库。
- 样式使用了 `tailwindcss`。
- 目前仅为前端 UI 演示，数据为静态模拟数据。
