## deployement link : https://paste-app-roan-seven.vercel.app

# React Paste App Usage Guide

## Table of Contents

1. [Project Structure](#project-structure)
2. [Redux Toolkit Usage](#redux-toolkit-usage)
3. [Layouts and Components](#layouts-and-components)
4. [Toaster Notifications](#toaster-notifications)
5. [DOM Usage](#dom-usage)
6. [Routing](#routing)

---

## Project Structure

```
src/
  App.jsx                # Main app entry, sets up routing
  main.jsx               # ReactDOM.render entry point
  components/
    layout/
      NavBar.jsx         # Layout component (navigation bar)
    paste/
      Home.jsx           # Home page component
      Paste.jsx          # Paste creation/listing
      ViewPaste.jsx      # View single paste
  redux/
    slices/
      pasteSlice.js      # Redux slice for paste state
    store.js             # Redux store setup
  styles/
    App.css              # App-wide styles
    index.css            # Global styles
```

---

## Redux Toolkit Usage

Redux Toolkit simplifies state management in React. Here’s how it’s used in this project:

### 1. Store Setup

- The store is defined in `src/redux/store.js`.
- Slices (like `pasteSlice.js`) define state and reducers.

**Example: `src/redux/store.js`**
```js
import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './slices/pasteSlice'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})
```

### 2. Creating a Slice

**Example: `src/redux/slices/pasteSlice.js`**
```js
import { createSlice } from '@reduxjs/toolkit'

const pasteSlice = createSlice({
  name: 'paste',
  initialState: { /* ... */ },
  reducers: {
    addPaste: (state, action) => { /* ... */ },
    // other reducers
  },
})

export const { addPaste } = pasteSlice.actions
export default pasteSlice.reducer
```

### 3. Using Redux in Components

- Use `useSelector` to read state.
- Use `useDispatch` to dispatch actions.

**Example:**
```js
import { useSelector, useDispatch } from 'react-redux'
import { addPaste } from '../redux/slices/pasteSlice'

const MyComponent = () => {
  const pastes = useSelector(state => state.paste.pastes)
  const dispatch = useDispatch()

  const handleAdd = (data) => {
    dispatch(addPaste(data))
  }
}
```

---

## Layouts and Components

- **Layout components** (like `NavBar`) are used to provide consistent structure across pages.
- **Page components** (like `Home`, `Paste`, `ViewPaste`) are rendered based on the route.

**Example:**
```jsx
// In App.jsx
<NavBar />
<Home />
```

- **Reusable components** can be created in `components/` and imported as needed.

---

## Toaster Notifications

Toaster notifications provide user feedback (e.g., success, error messages).

### 1. Install a Toaster Library

Common choice: `react-hot-toast` or `react-toastify`.

```bash
npm install react-hot-toast
```

### 2. Setup Toaster in App

**Example:**
```jsx
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}
```

### 3. Using Toaster in Components

**Example:**
```js
import toast from 'react-hot-toast'

const handleSuccess = () => {
  toast.success('Paste created!')
}
```

---

## DOM Usage

- React manages the DOM for you.
- For direct DOM manipulation, use `useRef` and `useEffect`.

**Example:**
```js
import { useRef, useEffect } from 'react'

const MyComponent = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}
```

---

## Routing

Routing is handled by `react-router-dom` v6+.

### 1. Define Routes

**Example: `src/App.jsx`**
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <><NavBar /><Home /></>
  },
  {
    path: '/pastes',
    element: <><NavBar /><Paste /></>
  },
  {
    path: '/pastes/:id',
    element: <><NavBar /><ViewPaste /></>
  }
])

function App() {
  return <RouterProvider router={router} />
}
```

### 2. Navigating Between Routes

Use the `Link` component or `useNavigate` hook.

**Example:**
```jsx
import { Link, useNavigate } from 'react-router-dom'

<Link to="/pastes">Go to Pastes</Link>

const navigate = useNavigate()
navigate('/pastes/123')
```

---

## Summary

- **Redux Toolkit**: For state management (`store.js`, `pasteSlice.js`).
- **Layouts/Components**: Organize UI and reuse code.
- **Toaster**: For user notifications (`react-hot-toast`).
- **DOM**: Use React hooks for DOM access.
- **Router**: Use `react-router-dom` for navigation.

---

**For more details, see the code in each referenced file.**
Feel free to copy this guide into your project’s documentation! If you need code samples for a specific part, let me know.
