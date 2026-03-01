import { Routes, Route, NavLink, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NewInspection from "./components/NewInspection";
import InspectionReport from "./components/InspectionReport";
import EquipmentDetail from "./components/EquipmentDetail";
import Timeline from "./components/Timeline";

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 mx-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-navy-700 text-white"
            : "text-navy-200 hover:bg-navy-800 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={isActive ? "text-cat" : "text-navy-400"}>{icon}</span>
          <span>{label}</span>
          {isActive && <span className="ml-auto w-1 h-4 rounded-full bg-cat" />}
        </>
      )}
    </NavLink>
  );
}

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-shrink-0 w-60 h-full bg-navy-900 flex-col">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-navy-800">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cat">
            <svg className="w-5 h-5 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.773 4.773zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white">FieldSense</p>
            <p className="text-[10px] text-navy-400 uppercase tracking-widest">AI Inspection</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1">
          <p className="px-5 mb-2 text-[10px] font-semibold tracking-widest uppercase text-navy-500">
            Main
          </p>
          <NavItem
            to="/"
            label="Dashboard"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            }
          />
          <NavItem
            to="/inspect"
            label="New Inspection"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            }
          />
          <NavItem
            to="/timeline"
            label="Timeline"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-navy-800">
          <p className="text-[10px] text-navy-500 uppercase tracking-wide">
            Powered by AI
          </p>
          <p className="text-xs text-navy-400 mt-0.5">
            OpenAI &middot; Supermemory &middot; ElevenLabs
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-navy-900 border-b border-navy-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cat">
              <svg className="w-4 h-4 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.773 4.773zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">FieldSense</span>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={({ isActive }) => `px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${isActive ? "bg-navy-700 text-white" : "text-navy-300 hover:text-white"}`}>
              Home
            </NavLink>
            <NavLink to="/inspect" className={({ isActive }) => `px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${isActive ? "bg-navy-700 text-white" : "text-navy-300 hover:text-white"}`}>
              Inspect
            </NavLink>
            <NavLink to="/timeline" className={({ isActive }) => `px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${isActive ? "bg-navy-700 text-white" : "text-navy-300 hover:text-white"}`}>
              Timeline
            </NavLink>
          </nav>
        </header>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inspect" element={<NewInspection />} />
              <Route path="/report" element={<InspectionReport />} />
              <Route path="/equipment/:equipmentId" element={<EquipmentDetail />} />
              <Route path="/timeline" element={<Timeline />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
