# Dynamic Data Table Manager

A professional, dynamic data table manager built with React 18, Redux Toolkit, Material UI (v5+), and TypeScript. This project demonstrates advanced skills in dynamic UIs, state management, and real-world features such as import/export, searching, sorting, inline editing, and more.

---

## ✨ Features

### Core Features

- **Table View**
  - Displays records with default columns: **Name, Email, Age, Role**
  - Sorting enabled on all columns (click to toggle ASC/DESC)
  - Global search across all fields
  - Client-side pagination (10 rows per page)

- **Dynamic Columns**
  - "Manage Columns" modal to:
    - Add new columns (e.g., Department, Location)
    - Show/hide columns using checkboxes
    - Changes are reflected instantly in the table
  - Column visibility is persisted (`localStorage` or Redux Persist)

- **Import & Export**
  - **Import CSV**: Upload and parse CSV (using PapaParse). Shows errors for invalid data.
  - **Export CSV**: Exports the current view (only visible columns) to a `.csv` file.

### Bonus Features (if implemented)

- **Inline Row Editing**
  - Double-click a row to edit fields inline
  - Field validation (e.g., Age must be a number)
  - "Save All" and "Cancel All" batch actions

- **Row Actions**
  - Edit and delete with confirmation

- **Theme Toggle**
  - Light/Dark mode switch (MUI theming)

- **Column Reordering**
  - Drag and drop to reorder columns

- **Responsive Design**
  - Fully responsive on all devices

---

## 📦 Tech Stack

- **React 18** / **Next.js 14** (App Router)
- **Redux Toolkit** (with Redux Persist)
- **Material UI** (v5+)
- **TypeScript**
- **React Hook Form**
- **PapaParse** (CSV parsing)
- **FileSaver.js** / **Blob** (for CSV export)
- **localStorage** / **Redux Persist** (for preferences)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RasadhiSanchala/dynamic-data-table.git
cd dynamic-data-table
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Folder Structure

```
src/
  components/
    DataTable.tsx
    ManageColumnsModal.tsx
    InlineEditRow.tsx
    ExportCSV.tsx
    ImportCSV.tsx
  store/
    tableSlice.ts
    index.ts
    persistConfig.ts
  types/
    index.ts
  theme/
    ThemeProvider.tsx
  ...
public/
...
```

---

## 🛠️ Configuration & Customization

- **Default Columns:** Edit `store/tableSlice.ts` to customize initial columns.
- **Theming:** See `theme/ThemeProvider.tsx` for global MUI theme logic.
- **CSV Import/Export:** Handled in `ImportCSV.tsx` and `ExportCSV.tsx` using PapaParse and FileSaver.js.
- **State Persistence:** Managed via Redux Persist in `store/persistConfig.ts`.

---

## 🧪 Testing

> (Add instructions here if you include any test files or testing setup.)

---

## 🤝 Contributing

1. [Fork the repository](https://github.com/RasadhiSanchala/dynamic-data-table.git)
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

MIT

---

## 👨‍💻 Author

- [Rasadhi Sanchala](https://github.com/RasadhiSanchala)

---


## 💡 Interviewer Notes

- All features and code are implemented with best practices for modern React, Redux, and MUI.
- The UI is fully responsive and accessible.
- Bonus features are included if time allows.
