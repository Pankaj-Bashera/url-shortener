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
                            DevShort 2.0 is now live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
                            Shorten URLs <span className="text-gradient">Instantly</span>.
                        </h1>
                        <p className="text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
                            Built for speed and scale. Optimize your DevOps workflow with high-velocity link management, detailed analytics, and custom domains.
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

                    {/* Stats Section */}
                    <section className="w-full max-w-5xl mx-auto py-12 border-y border-outline-variant/20 mb-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-extrabold text-on-surface mb-2">50M+</h3>
                            <p className="text-on-surface-variant font-medium">Links Shortened</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-on-surface mb-2">99.9%</h3>
                            <p className="text-on-surface-variant font-medium">Uptime SLA</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-on-surface mb-2">&lt;50ms</h3>
                            <p className="text-on-surface-variant font-medium">Global Latency</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-on-surface mb-2">10k+</h3>
                            <p className="text-on-surface-variant font-medium">Active Teams</p>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="w-full max-w-6xl mx-auto mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Everything you need to manage links</h2>
                            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">DevShort provides enterprise-grade infrastructure packed into an elegant, easy-to-use interface.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center text-primary mb-6">
                                    <span className="material-symbols-outlined text-3xl">bolt</span>
                                </div>
                                <h3 className="text-xl font-bold text-on-surface mb-3">Lightning Fast</h3>
                                <p className="text-on-surface-variant leading-relaxed">Built on edge infrastructure, our redirects happen in milliseconds, ensuring your users never notice a delay.</p>
                            </div>
                            
                            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center text-secondary mb-6">
                                    <span className="material-symbols-outlined text-3xl">monitoring</span>
                                </div>
                                <h3 className="text-xl font-bold text-on-surface mb-3">Deep Analytics</h3>
                                <p className="text-on-surface-variant leading-relaxed">Track clicks, geographic locations, device types, and referrers in real-time with our comprehensive dashboard.</p>
                            </div>
                            
                            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                <div className="bg-tertiary/10 w-14 h-14 rounded-xl flex items-center justify-center text-tertiary mb-6">
                                    <span className="material-symbols-outlined text-3xl">api</span>
                                </div>
                                <h3 className="text-xl font-bold text-on-surface mb-3">Developer API</h3>
                                <p className="text-on-surface-variant leading-relaxed">Integrate link shortening directly into your workflows with our robust, well-documented RESTful API.</p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="w-full max-w-4xl mx-auto text-center bg-inverse-surface text-inverse-on-surface p-12 md:p-16 rounded-3xl mb-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[60px] rounded-full pointer-events-none"></div>
                        
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to supercharge your links?</h2>
                        <p className="text-lg text-inverse-on-surface/80 mb-8 max-w-2xl mx-auto relative z-10">Join thousands of developers who are already using DevShort to manage their URLs at scale.</p>
                        <button className="bg-white text-inverse-surface font-bold text-lg px-8 py-4 rounded-xl hover:bg-surface-variant transition-colors relative z-10">
                            Get Started for Free
                        </button>
                    </section>
                </main>

                {/* Footer */}
                <footer className="w-full border-t border-outline-variant/30 py-12 px-gutter mt-auto bg-surface-container-low">
                    <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        <div className="col-span-2 lg:col-span-2 pr-8">
                            <Link to="/" className="font-headline-md text-2xl font-bold text-primary tracking-tight block mb-4">DevShort</Link>
                            <p className="text-on-surface-variant mb-6 leading-relaxed">
                                The ultimate link management platform for developers, teams, and enterprises. Built for speed, reliability, and scale.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined">code</span></a>
                                <a href="#" className="text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined">terminal</span></a>
                                <a href="#" className="text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined">cloud</span></a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-on-surface mb-4">Product</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Features</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Integrations</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Pricing</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-on-surface mb-4">Resources</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">API Reference</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Blog</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Community</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-on-surface mb-4">Company</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">About</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Careers</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy</a></li>
                                <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-container-max mx-auto mt-12 pt-8 border-t border-outline-variant/30 text-center text-on-surface-variant text-sm">
                        <p>© {new Date().getFullYear()} DevShort Inc. All rights reserved.</p>
                    </div>
                </footer>
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
