        const { useState, useEffect } = React;
        const { createRoot } = ReactDOM;
        const { MemoryRouter, Routes, Route, Link, useNavigate, useLocation } = ReactRouterDOM;

        // --- Shared Components ---
        const TopNav = () => {
            const location = useLocation();
            const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
            
            return (
                <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
                    <div className="flex items-center gap-lg">
                        <Link to="/" className="font-headline-md text-xl font-bold text-primary tracking-tight">DevShort</Link>
                        <nav className="hidden md:flex gap-md">
                            <Link to="/" className={`font-medium pb-5 pt-5 border-b-2 ${isActive('/') && location.pathname === '/' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'}`}>Home</Link>
                            <Link to="/dashboard" className={`font-medium pb-5 pt-5 border-b-2 ${isActive('/dashboard') ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'}`}>Dashboard</Link>
                        </nav>
                    </div>
                </header>
            );
        };



   

        const DocLayout = ({ children }) => (
            <div className="flex flex-col min-h-screen">
                <TopNav />
                <div className="flex flex-1 pt-16">
                    <main className="flex-1 lg:ml-64 pt-8 p-gutter lg:p-lg min-h-screen flex flex-col relative z-10 w-full max-w-container-max mx-auto">
                        {children}
                    </main>
                </div>
            </div>
        );

        // --- Screens ---

        const Home = () => {
            const [url, setUrl] = useState('');
            const [shortUrl, setShortUrl] = useState('');
            const [error, setError] = useState('');
            const [loading, setLoading] = useState(false);

            const handleShorten = async () => {
                const trimmedUrl = url.trim();
                if (!trimmedUrl) {
                    setError('Please enter a URL.');
                    setShortUrl('');
                    return;
                }

                setLoading(true);
                setError('');
                setShortUrl('');

                try {
                    const res = await fetch('/shorten', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ original_url: trimmedUrl })
                    });

                    if (!res.ok) throw new Error('Server error');

                    const data = await res.json();
                    setShortUrl(data.short_url);
                } catch (err) {
                    setError('Error: Could not shorten URL. Is the API running?');
                } finally {
                    setLoading(false);
                }
            };

            return (
            <div className="flex flex-col min-h-screen relative">
                <div className="absolute rounded-full bg-primary/20 w-[500px] h-[500px] blur-[80px] top-[-100px] left-[-100px] -z-10 pointer-events-none"></div>
                <div className="absolute rounded-full bg-secondary/20 w-[400px] h-[400px] blur-[80px] top-[30%] right-[-50px] -z-10 pointer-events-none"></div>
                
                <TopNav />
                <main className="flex-grow pt-32 pb-xl px-gutter max-w-container-max mx-auto w-full flex flex-col items-center">
                    <section className="text-center max-w-3xl mx-auto mb-xl pt-lg w-full">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-4">
                            Shorten URLs <span className="text-gradient">Instantly</span>.
                        </h1>
                        <p className="text-lg text-on-surface-variant mb-8">Build for Speed. Optimize your devops workflow with high-velocity link management.</p>
                        
                        <div className="glass-panel w-full p-2 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-2 mb-8">
                            <div className="flex-grow flex items-center bg-white rounded-md px-3 py-3 border border-outline-variant/50 w-full">
                                <span className="material-symbols-outlined text-outline mr-2">link</span>
                                <input 
                                    className="bg-transparent border-none focus:outline-none text-on-surface w-full" 
                                    placeholder="Paste long URL here..." 
                                    type="url" 
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
                                />
                            </div>
                            <button 
                                onClick={handleShorten}
                                disabled={loading}
                                className="btn-gradient text-white px-6 py-3 rounded-md w-full sm:w-auto text-center font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
                            >
                                {loading ? 'Shortening...' : 'Shorten'}
                            </button>
                        </div>

                        {error && (
                            <div className="text-left bg-error/10 text-error border border-error/20 p-4 rounded-md mb-8">
                                {error}
                            </div>
                        )}
                        
                        {shortUrl && (
                            <div className="text-left bg-primary/10 text-primary-container border border-primary/20 p-4 rounded-md mb-8 flex items-center justify-between gap-4">
                                <div>
                                    <span className="font-medium">Short URL:</span>{' '}
                                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-mono hover:underline break-all">
                                        {shortUrl}
                                    </a>
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            </div>
            );
        };

        const Dashboard = () => (
            <div className="flex flex-col min-h-screen bg-background">
                <TopNav />
                <div className="max-w-container-max mx-auto px-gutter py-8 mt-16 flex flex-col lg:flex-row gap-6 w-full">
                    <main className="flex-1 flex flex-col gap-6">
                        <header className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-on-surface mb-1">All Links</h1>
                                <p className="text-on-surface-variant">Manage and track shortened URLs.</p>
                            </div>
                        </header>
                        
                        <div className="glass-panel rounded-xl shadow-sm overflow-hidden flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low text-on-surface-variant text-sm uppercase">
                                        <th className="px-6 py-4 font-medium">Original URL</th>
                                        <th className="px-6 py-4 font-medium">Short URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors">
                                        <td className="px-6 py-4 truncate max-w-[200px]">https://github.com/docker/compose</td>
                                        <td className="px-6 py-4"><a href="#" className="text-primary font-mono text-sm hover:underline">devsh.rt/dkr-cmp</a></td>
                                    </tr>
                                    <tr className="hover:bg-surface-variant/30 transition-colors">
                                        <td className="px-6 py-4 truncate max-w-[200px]">https://kubernetes.io/docs/</td>
                                        <td className="px-6 py-4"><a href="#" className="text-primary font-mono text-sm hover:underline">devsh.rt/k8s-pod</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        );


        const App = () => {
            return (
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </MemoryRouter>
            );
        };

        const root = createRoot(document.getElementById('root'));
        root.render(<App />);
