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
            <div className="flex flex-col min-h-screen relative overflow-x-hidden">
                {/* Background decorative elements */}
                <div className="absolute rounded-full bg-primary/20 w-[500px] h-[500px] blur-[80px] top-[-100px] left-[-100px] -z-10 pointer-events-none"></div>
                <div className="absolute rounded-full bg-secondary/20 w-[400px] h-[400px] blur-[80px] top-[30%] right-[-50px] -z-10 pointer-events-none"></div>
                
                <TopNav />
                
                {/* Hero Section */}
                <main className="flex-grow pt-32 pb-16 px-gutter max-w-container-max mx-auto w-full flex flex-col items-center">
                    <section className="text-center max-w-4xl mx-auto mb-16 pt-lg w-full relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            DevShort is now live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
                            Shorten URLs <span className="text-gradient">Instantly</span>.
                        </h1>
                        <p className="text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
                            Built for speed and scale. Optimize your DevOps workflow with high-velocity link management.
                        </p>
                        
                        <div className="glass-panel w-full max-w-3xl mx-auto p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 mb-12 hover:shadow-2xl transition-shadow duration-300">
                            <div className="flex-grow flex items-center bg-white/80 rounded-xl px-4 py-4 border border-outline-variant/30 w-full group focus-within:border-primary/50 transition-colors">
                                <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors mr-3">link</span>
                                <input 
                                    className="bg-transparent border-none focus:outline-none text-on-surface w-full text-lg placeholder:text-outline/60" 
                                    placeholder="Paste your long URL here..." 
                                    type="url" 
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
                                />
                            </div>
                            <button 
                                onClick={handleShorten}
                                disabled={loading}
                                className="btn-gradient text-white px-8 py-4 rounded-xl w-full sm:w-auto text-center font-bold text-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-primary/25"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">refresh</span>
                                        Shortening
                                    </>
                                ) : (
                                    <>
                                        Shorten <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Results / Errors */}
                        {error && (
                            <div className="text-left bg-error/10 text-error border border-error/20 p-4 rounded-xl max-w-3xl mx-auto mb-8 animate-fade-in flex items-center gap-3">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}
                        
                        {shortUrl && (
                            <div className="text-left bg-surface/80 backdrop-blur-md border border-primary/20 p-5 rounded-xl max-w-3xl mx-auto mb-8 flex items-center justify-between gap-4 animate-fade-in shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-on-surface-variant mb-1">Your short link is ready</p>
                                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-lg font-semibold text-primary hover:text-primary-container transition-colors break-all">
                                            {shortUrl}
                                        </a>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                                    className="p-2 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                    title="Copy to clipboard"
                                >
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        );
        };

        const App = () => {
            return (
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </MemoryRouter>
            );
        };

        const root = createRoot(document.getElementById('root'));
        root.render(<App />);
