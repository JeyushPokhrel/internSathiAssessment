import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ApplicationList from './pages/ApplicationList';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';
import ViewApplication from './pages/ViewApplication';

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#fef6f6' }}>

   
        <header style={{ backgroundColor: '#ef2628' }} className="shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ backgroundColor: '#fef6f6', color: '#ef2628' }}>
                IS
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight m-0">
                InternSathi Job Tracker
              </h1>
            </Link>
          </div>
        </header>
 
        <main>
          <Routes>
            <Route path="/"          element={<ApplicationList />} />
            <Route path="/add"       element={<AddApplication />} />
            <Route path="/view/:id"  element={<ViewApplication />} />
            <Route path="/edit/:id"  element={<EditApplication />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
