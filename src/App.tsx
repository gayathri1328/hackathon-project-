import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EvaluationMetricsModal } from './components/evaluation/EvaluationMetricsModal';

// 7 Required Pages
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ResourceViewPage } from './pages/ResourceViewPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { ProfilePage } from './pages/ProfilePage';

import { LearningLevel, ResourceFormat, RetrievalEvaluationMetrics } from './types';
import { getResourceById } from './services/ragEngine';

const MainAppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  // FIRST SCREEN = Student Sign In page as strictly required!
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [activeLevel, setActiveLevel] = useState<LearningLevel>('Beginner');
  const [activeFormat, setActiveFormat] = useState<ResourceFormat>('Explanation');
  const [activeResourceId, setActiveResourceId] = useState<string>('');
  const [activeAssessmentTopic, setActiveAssessmentTopic] = useState<string>('');
  
  // No fake hardcoded metrics! Starts as null
  const [globalMetrics, setGlobalMetrics] = useState<RetrievalEvaluationMetrics | null>(null);
  const [showMetricsModal, setShowMetricsModal] = useState<boolean>(false);

  // When session loads, if user is already logged in, navigate to dashboard
  useEffect(() => {
    if (!isLoading) {
      if (user && (currentPage === 'login' || currentPage === 'signup')) {
        setCurrentPage('dashboard');
      } else if (!user && currentPage !== 'signup') {
        setCurrentPage('login');
      }
    }
  }, [user, isLoading]);

  // Search initiation from Dashboard
  const handleSearch = (query: string, level: LearningLevel, format: ResourceFormat) => {
    setActiveQuery(query);
    setActiveLevel(level);
    setActiveFormat(format);
    setCurrentPage('search');
  };

  // Open resource view
  const handleOpenResource = (resourceId: string) => {
    const res = getResourceById(resourceId);
    if (res && res.format) {
      setActiveFormat(res.format);
    }
    setActiveResourceId(resourceId);
    setCurrentPage('resource');
  };

  // Trigger assessment
  const handleTakeAssessment = (topicName: string) => {
    setActiveAssessmentTopic(topicName);
    setCurrentPage('assessment');
  };

  // Adaptive follow-up search
  const handleSearchTopic = (queryText: string) => {
    setActiveQuery(queryText);
    setCurrentPage('search');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-warm flex items-center justify-center">
        <div className="text-burgundy font-serif font-bold text-lg animate-pulse">
          Loading Fourbidden Logic...
        </div>
      </div>
    );
  }

  // Routing render
  const renderPage = () => {
    // If not authenticated, only allow login or signup
    if (!user) {
      if (currentPage === 'signup') {
        return <SignUpPage onNavigate={setCurrentPage} />;
      }
      return <LoginPage onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'signup':
        return <SignUpPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'search':
        return (
          <SearchResultsPage
            query={activeQuery}
            initialLevel={activeLevel}
            initialFormat={activeFormat}
            onFormatChange={(fmt) => setActiveFormat(fmt)}
            onLevelChange={(lvl) => setActiveLevel(lvl)}
            onOpenResource={handleOpenResource}
            onNavigate={setCurrentPage}
            onMetricsComputed={(m) => setGlobalMetrics(m)}
          />
        );
      case 'resource':
        return (
          <ResourceViewPage
            resourceId={activeResourceId}
            onTakeAssessment={handleTakeAssessment}
            onNavigate={setCurrentPage}
            onFormatChange={(fmt) => setActiveFormat(fmt)}
          />
        );
      case 'assessment':
        return (
          <AssessmentPage
            topicName={activeAssessmentTopic}
            onNavigate={setCurrentPage}
            onSearchTopic={handleSearchTopic}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onOpenResource={handleOpenResource}
            onSearchTopic={handleSearchTopic}
            onNavigate={setCurrentPage}
          />
        );
      case 'dashboard':
      default:
        return (
          <DashboardPage
            onSearch={handleSearch}
            onOpenResource={handleOpenResource}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  const isAuthPage = !user || currentPage === 'login' || currentPage === 'signup';

  return (
    <div className="min-h-screen flex flex-col bg-cream-warm text-charcoal">
      {!isAuthPage && (
        <Navbar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenMetrics={() => setShowMetricsModal(true)}
        />
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      {!isAuthPage && <Footer />}

      <EvaluationMetricsModal
        isOpen={showMetricsModal}
        onClose={() => setShowMetricsModal(false)}
        metrics={globalMetrics}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
};

export default App;
