import { Routes, Route, useLocation } from 'react-router';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { SubmitMediaPage } from './pages/SubmitMediaPage';
import { ArchivePage } from './pages/ArchivePage';
import { FactCheckPage } from './pages/FactCheckPage';
import { TrustedSourcesPage } from './pages/TrustedSourcesPage';
import { AuthPage } from './pages/AuthPage';

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      {!isAuthPage && <Header />}

      <main className={!isAuthPage ? "max-w-7xl mx-auto px-6 py-8" : ""}>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/submit" element={<SubmitMediaPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/fact-check" element={<FactCheckPage />} />
          <Route path="/trusted-sources" element={<TrustedSourcesPage />} />
        </Routes>
      </main>
    </div>
  );
}