<h1>
  <img src="./public/faultlens.svg" width="52" style="vertical-align: middle; margin-right: 8px;" />
  FaultLens — Chaos-Enabled API Testing & Debugging Tool
</h1>

FaultLens is a frontend-focused API debugging tool designed to simulate real-world failure scenarios such as latency, network errors, and server failures. It enables developers to test how their applications behave under adverse conditions — without modifying backend systems.

---

## ✨ Key Features

### 🔍 API Request Builder
- Supports GET, POST, PUT, DELETE
- Custom headers and JSON body input
- Responsive UI with custom-styled dropdown
- Input validation for headers and body

---

### ⚡ Chaos Engine (Core Feature)
Simulate real-world conditions:

- ⏱️ Latency Injection (delay requests)
- 💥 Error Injection (timeouts, 500 errors, network failures)
- 🌐 Offline Mode (simulate complete network loss)

> Helps test frontend behavior under unstable environments

---

### 📊 Request Monitor
- Real-time logging of all API requests
- Displays:
  - Status
  - Method
  - URL
  - Response time
- Search & filter support for debugging

---

### 🔎 Request Inspector
- Detailed breakdown of selected request:
  - Response (JSON / text)
  - Error messages
  - Status code
- Retry request instantly
- Copy response with fallback support

---

### 🧠 Smart Timeline
Each request includes a structured timeline:

- Request sent
- Delay applied (if any)
- Error triggered (if any)
- Final response received

> Provides clear insight into request lifecycle

---

### 💾 Saved Requests
- Save frequently used API configurations
- Load saved requests instantly
- Delete with confirmation
- Accordion-based UI
- Empty-state fallback for better UX

---

### 🔔 Toast Notification System
- Real-time feedback:
  - Request sent
  - Request failed
  - Request loaded
  - Request deleted
- Auto-dismiss with smooth transitions

---

### 🎨 UI/UX Highlights
- Fully responsive design
- Custom select dropdown (no native browser select)
- Dark developer-centric theme
- Smooth transitions and hover states
- Clean visual hierarchy
- Custom scrollbar

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

---

## ⚙️ Architecture Overview

FaultLens wraps the native `fetch` API with a custom chaos layer:

```js
chaosFetch(url, options)
```

Internally:
1. Applies artificial latency
2. Injects random failures (based on error rate)
3. Performs actual API request
4. Safely parses response
5. Logs structured request data + timeline

## 📁 Project Structure
```md
src/
├── components/
│   ├── ControlPanel
│   ├── MethodSelect
│   ├── RequestBuilder
│   ├── RequestInspector
│   ├── RequestMonitor
│   ├── SavedRequestsPanel
│   ├── TestButton
│   ├── Toast
│
├── chaos-engine/
│   └── chaosFetch.js
│
├── store/
│   └── useChaosStore.js
│
├── utils/
│   └── statusMapper.js
```

---

## 🧪 Example Use Cases

- Test frontend behavior under slow network conditions
- Simulate backend failures without backend changes
- Debug API response handling
- Validate retry logic
- Stress test UI workflows

---

## 🎯 Why FaultLens?

Traditional tools test APIs in isolation.
FaultLens focuses on:
> How your frontend behaves when things go wrong

---

## 🔮 Future Enhancements
- Export logs (JSON / CSV)
- Request grouping and tagging
- Keyboard shortcuts
- Visual analytics dashboard

---

## 👤 Author
Marsha Sharma

---
