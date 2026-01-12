import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, ArrowLeftRight, CreditCard } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link to={to}>
      <div
        className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 group ${
          isActive(to)
            ? "bg-primary/10 text-primary"
            : "text-text-muted hover:bg-surface-hover hover:text-text-main"
        }`}
      >
        <Icon size={20} className={isActive(to) ? "text-primary" : "group-hover:text-text-main"} />
        <span className="font-medium text-sm">{label}</span>
      </div>
    </Link>
  );

  return (
    <div className="flex flex-col w-64 h-screen border-r border-slate-700/50 bg-background flex-shrink-0 sticky top-0">
      {/* Logo */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
            <img src="/src/assets/perk_icon.png" alt="Perk Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold tracking-tight text-white">PERK</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mt-6">
        <p className="px-6 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Menu
        </p>
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/add" icon={PlusCircle} label="Add Card" />
        <NavItem to="/compare" icon={ArrowLeftRight} label="Compare" />
      </nav>

      {/* Bottom Section (Optional stats or info) */}
      <div className="mt-auto p-6">
        <div className="p-4 rounded-2xl bg-surface/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="text-accent" size={20} />
            <span className="text-sm font-medium text-text-main">Wallet Status</span>
          </div>
          <p className="text-xs text-text-muted">Managed via Perk</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
