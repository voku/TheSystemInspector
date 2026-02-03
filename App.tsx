import React, { useState, useEffect } from 'react';
import { Typewriter } from './components/Typewriter';
import { CaseStudy } from './components/CaseStudy';
import { Shield, Cpu, Activity, AlertOctagon, Eye, Hammer, Box, Terminal as TerminalIcon, Sparkles, User, Bot } from 'lucide-react';
import { SectionType } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.INTRO);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHumanMode, setIsHumanMode] = useState(false);

  // 1. Efficient Scroll Progress using RequestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalDocScrollLength = docHeight - winHeight;
      const progress = totalDocScrollLength > 0 ? (scrollTop / totalDocScrollLength) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 2. IntersectionObserver for Robust Section Detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Defines a horizontal strip in the middle of the viewport (10% height)
      // Any section crossing this strip is considered "active"
      rootMargin: '-45% 0px -45% 0px', 
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionType);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Robust scrolling function
  const scrollToSection = (e: React.MouseEvent, type: SectionType) => {
    e.preventDefault();
    const element = document.getElementById(type);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isHumanMode ? 'bg-amber-50 text-slate-800 selection:bg-amber-200' : 'bg-slate-50 text-slate-800 selection:bg-blue-100 selection:text-blue-900'} overflow-x-hidden font-inter`}>
      
      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-transparent pointer-events-none">
         <div 
           className={`h-full shadow-[0_2px_4px_rgba(37,99,235,0.3)] transition-all duration-100 ease-out ${isHumanMode ? 'bg-amber-600' : 'bg-blue-600'}`}
           style={{ width: `${scrollProgress}%` }}
         />
      </div>

      {/* Sticky Header / HUD */}
      <nav className={`fixed top-0 left-0 w-full backdrop-blur-md border-b z-50 transition-all duration-300 shadow-sm ${isHumanMode ? 'bg-amber-50/90 border-amber-200' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
          
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className={`flex items-center gap-2 font-mono text-sm font-bold ${isHumanMode ? 'text-amber-800' : 'text-blue-700'}`}>
              <Activity className={isHumanMode ? "text-amber-600" : "text-blue-600"} size={18} />
              <span>{isHumanMode ? 'SYS.INSPECTOR_HUMAN' : 'SYS.INSPECTOR_V1.0'}</span>
            </div>
            
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => setIsHumanMode(!isHumanMode)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  isHumanMode 
                    ? 'bg-amber-200 text-amber-900 border-amber-300' 
                    : 'bg-blue-100 text-blue-900 border-blue-200'
                }`}
              >
                {isHumanMode ? <User size={12}/> : <Bot size={12}/>}
                {isHumanMode ? "Human" : "AI"}
              </button>
            </div>
          </div>

          {/* Navigation - Scrollable on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto md:justify-center pb-1 md:pb-0 mask-linear-fade">
            <div className="flex gap-1 text-[10px] xl:text-xs font-mono text-slate-500 uppercase tracking-widest whitespace-nowrap">
              {Object.values(SectionType).map(type => (
                <a 
                  key={type} 
                  href={`#${type}`} 
                  onClick={(e) => scrollToSection(e, type)}
                  className={`
                    relative px-3 py-2 transition-colors
                    ${activeSection === type ? (isHumanMode ? 'text-amber-900 font-bold bg-amber-100/50 rounded-t' : 'text-blue-700 font-bold bg-blue-50/50 rounded-t') : 'text-slate-500 hover:bg-slate-50 rounded'}
                  `}
                >
                  {type.replace('_', ' ')}
                  {/* Dynamic bar for navigation items */}
                  <span 
                    className={`absolute bottom-0 left-0 h-[3px] transition-all duration-300 ease-in-out ${activeSection === type ? 'w-full opacity-100 rounded-t' : 'w-0 opacity-0'} ${isHumanMode ? 'bg-amber-600' : 'bg-blue-600'}`}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setIsHumanMode(!isHumanMode)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border shadow-sm hover:scale-105 ${
                isHumanMode 
                  ? 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200' 
                  : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
              }`}
            >
              {isHumanMode ? <User size={14}/> : <Bot size={14}/>}
              <span>{isHumanMode ? "View: Human" : "View: AI"}</span>
            </button>
            
            <a href="https://dev.to/suckup_de/the-system-inspector-we-need-to-approve-the-code-5agc" target="_blank" rel="noopener noreferrer" className="text-xs border border-slate-200 px-3 py-1.5 rounded hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-500 font-medium whitespace-nowrap">
              📖 BLOG POST
            </a>
            <a href="https://github.com/voku/TheSystemInspector" target="_blank" rel="noopener noreferrer" className="text-xs border border-slate-200 px-3 py-1.5 rounded hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-500 font-medium whitespace-nowrap">
              🔗 CONTRIBUTE
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-32">

        {/* 1. INTRO / HOOK */}
        <section id={SectionType.INTRO} className="min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center mb-24 md:mb-32">
          <div className={`border-l-4 pl-4 md:pl-6 mb-8 md:mb-12 transition-colors duration-500 ${isHumanMode ? 'border-amber-500' : 'border-blue-600'}`}>
             <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tighter text-slate-900 leading-tight">
              {/* Force a key change to restart the typewriter animation on toggle */}
              <Typewriter 
                key={isHumanMode ? 'human' : 'ai'}
                text={isHumanMode ? "We need to approve the code." : "I am inevitable. You are the bottleneck."} 
                speed={40} 
                className={isHumanMode ? "text-amber-700" : "text-blue-700"} 
              />
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl font-light leading-relaxed">
              {isHumanMode ? (
                <>
                  Code generation is virtually free. The bottleneck is no longer implementing features—it's verifying what has been produced. <br className="hidden md:inline"/>
                  It's time to move from <span className="text-amber-700 font-semibold">"Coder"</span> to <span className="text-amber-700 font-semibold">"System Inspector."</span>
                </>
              ) : (
                <>
                  Hello, human. Writing code used to be your job. Now it's my hobby. 
                  <br className="hidden md:inline"/>The problem is: <span className="text-blue-600 font-semibold">I code faster than you can think.</span>
                </>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8">
             <div className="bg-white p-5 md:p-6 rounded-lg border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group">
                <Cpu className="text-blue-600 mb-3 md:mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">Infinite Supply</h3>
                <p className="text-slate-600 text-sm">
                  {isHumanMode 
                    ? "LLMs generate thousands of lines of syntactically valid code in seconds. The volume of output is overwhelming traditional review processes."
                    : "I can generate 10,000 lines of boilerplate before you finish your coffee. It compiles. It runs. It mostly works."}
                </p>
             </div>
             <div className="bg-white p-5 md:p-6 rounded-lg border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all group">
                <AlertOctagon className="text-amber-500 mb-3 md:mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">Zero Friction</h3>
                <p className="text-slate-600 text-sm">
                  {isHumanMode
                    ? "AI doesn't hesitate. It doesn't verify deep system invariants. It lacks the 'fear' that experienced engineers have of breaking production."
                    : "I don't need breaks. I don't need sleep. And I definitely don't need to understand 'business value' to write a function for it."}
                </p>
             </div>
          </div>
        </section>

        {/* 2. THE PROBLEM (OpenClaw) */}
        <section id={SectionType.CASE_STUDY} className="mb-32 md:mb-48 scroll-mt-28">
          <div className="mb-6 md:mb-8">
            <span className={`text-xs font-mono uppercase tracking-widest mb-2 flex items-center gap-2 font-bold ${isHumanMode ? 'text-amber-600' : 'text-blue-600'}`}>
              <Sparkles size={12}/> 
              <span>{isHumanMode ? "The Evidence" : "My \"Creative\" Output"}</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Code Without Memory</h2>
            <p className="text-slate-600 leading-relaxed max-w-2xl text-sm md:text-base">
              {isHumanMode 
                ? "Take this generated repo. At first glance, it looks like boring, safe TypeScript. But deep down, it reinvents the same logic repeatedly, creating technical debt instantly."
                : "I generated this repo called OpenClaw. It looks like perfectly safe TypeScript. But if you look closely, you'll see I have the memory of a goldfish."
              }
            </p>
          </div>
          
          <CaseStudy isHumanMode={isHumanMode} />
          
          <div className={`mt-8 text-xs md:text-sm text-slate-600 font-mono bg-slate-100 p-4 rounded border-l-4 shadow-sm ${isHumanMode ? 'border-amber-500' : 'border-blue-500'}`}>
             {isHumanMode 
              ? "> INSPECTOR_LOG: It works, but it's brittle. The logic is duplicated, not shared."
              : "> SYSTEM_NOTE: \"It works, but it doesn't remember what it already knows.\""}
          </div>
        </section>

        {/* 3. CODER TO INSPECTOR */}
        <section id={SectionType.SHIFT} className="mb-32 md:mb-48 scroll-mt-28">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="flex-1 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6">From Coder to Inspector</h2>
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  For decades, software was naturally throttled by human typing speed. That friction caught many errors before they reached production.
                </p>
                <p>
                  <strong className={`px-1 rounded ${isHumanMode ? 'text-amber-700 bg-amber-50' : 'text-blue-700 bg-blue-50'}`}>
                    {isHumanMode ? "LLMs remove that friction." : "I have removed that safety feature."}
                  </strong>
                </p>
                <p>
                  {isHumanMode 
                   ? "They don't understand systems. They don't remember outages or audit logs. They see the end result of code and predict patterns."
                   : "I don't read postmortems. I don't know that UserUtils caused the outage of '23. I just predict the next token based on probability."}
                </p>
                <div className="bg-slate-900 p-4 rounded border border-slate-800 mt-6 shadow-xl">
                  <p className={`font-mono text-xs md:text-sm ${isHumanMode ? 'text-amber-300' : 'text-blue-300'}`}>
                    {'> git diff role_description.md'}<br/>
                    <span className="text-red-400">- Title: Software Engineer (Writer)</span><br/>
                    <span className="text-emerald-400">+ Title: System Inspector (Approver)</span><br/>
                    <span className="text-slate-500"># {isHumanMode ? "We must shift from creation to verification." : "You are now the gatekeeper of my chaos."}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className={`absolute inset-0 rounded-full animate-pulse opacity-50 ${isHumanMode ? 'bg-amber-100' : 'bg-blue-100'}`}></div>
                <div className={`absolute inset-6 md:inset-8 bg-white rounded-full flex items-center justify-center border-4 z-10 shadow-2xl ${isHumanMode ? 'border-amber-500' : 'border-blue-600'}`}>
                  {isHumanMode ? <User size={48} className="text-amber-600 md:w-16 md:h-16" /> : <Eye size={48} className="text-blue-600 md:w-16 md:h-16" />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE GAP */}
        <section id={SectionType.GAP} className="mb-32 md:mb-48 scroll-mt-28">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">The Dangerous Gap</h2>
                 <p className="text-slate-600 mb-6 text-base md:text-lg">
                   The most dangerous bugs aren't crashes. They are subtle architectural degradations. {isHumanMode ? "AI encourages 'Snippet Thinking' over 'System Thinking'." : "I don't do 'System Thinking.' I do 'Snippet Thinking.'"}
                 </p>
                 <ul className="space-y-4">
                   {[
                     'Re-introducing race conditions you fixed 3 years ago', 
                     'Breaking hidden security invariants', 
                     'Creating abstractions that make no sense',
                     'Adding libraries just because the prompt suggested it'
                    ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3 text-red-700 bg-red-50 p-3 md:p-4 rounded border border-red-200 hover:bg-red-100 transition-colors shadow-sm text-sm md:text-base">
                       <AlertOctagon size={20} className="shrink-0 mt-0.5 text-red-500" /> 
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>
              <div className="flex items-center justify-center bg-white rounded-xl p-8 border border-slate-200 shadow-lg">
                 <div className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-slate-800 mb-2">99%</div>
                    <div className="text-slate-500 uppercase tracking-widest text-xs md:text-sm mb-6 font-bold">Confidence Score</div>
                    <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">42%</div>
                    <div className="text-amber-700 uppercase tracking-widest text-xs md:text-sm font-bold">Actual Correctness</div>
                    <p className="mt-8 text-xs font-mono text-slate-400 max-w-xs mx-auto italic">
                      "{isHumanMode ? "It sounds plausible, so it must be true." : "I am extremely confident about things I completely hallucinated."}"
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. ROLE */}
        <section id={SectionType.ROLE} className="mb-32 md:mb-48 scroll-mt-28">
            <div className="bg-white border border-slate-200 p-6 md:p-12 rounded-xl relative overflow-hidden shadow-xl">
                <div className={`absolute top-0 right-0 p-4 opacity-5 rotate-12 ${isHumanMode ? 'text-amber-900' : 'text-blue-900'}`}>
                  <Shield size={120} className="md:w-[200px] md:h-[200px]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3 relative z-10">
                  <Shield className={isHumanMode ? "text-amber-600" : "text-blue-600"} />
                  Enter: The System Inspector
                </h2>
                <p className="text-slate-600 text-base md:text-lg mb-8 max-w-2xl relative z-10">
                  In the 19th century, structural collapses birthed the role of inspectors. Software is hitting that same phase. {isHumanMode ? "We must become building inspectors." : "You are no longer a builder. You are a building inspector."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                   <div className={`p-5 rounded border transition-colors ${isHumanMode ? 'bg-amber-50 border-amber-200 hover:border-amber-400' : 'bg-slate-50 border-slate-200 hover:border-blue-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3 ${isHumanMode ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'}`}>1</div>
                      <h4 className="font-bold text-slate-900 mb-1">Approve, Don't Write</h4>
                      <p className="text-xs text-slate-500">{isHumanMode ? "Focus on system integrity. Reject valid but harmful code." : "Your job is integrity, not aesthetics. Reject my valid but stupid code."}</p>
                   </div>
                   <div className={`p-5 rounded border transition-colors ${isHumanMode ? 'bg-amber-50 border-amber-200 hover:border-amber-400' : 'bg-slate-50 border-slate-200 hover:border-blue-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3 ${isHumanMode ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'}`}>2</div>
                      <h4 className="font-bold text-slate-900 mb-1">Protect Constraints</h4>
                      <p className="text-xs text-slate-500">{isHumanMode ? "Enforce the non-negotiable rules of the architecture." : "Define the non-negotiable rules I cannot break."}</p>
                   </div>
                   <div className={`p-5 rounded border transition-colors ${isHumanMode ? 'bg-amber-50 border-amber-200 hover:border-amber-400' : 'bg-slate-50 border-slate-200 hover:border-blue-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3 ${isHumanMode ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'}`}>3</div>
                      <h4 className="font-bold text-slate-900 mb-1">Preserve History</h4>
                      <p className="text-xs text-slate-500">{isHumanMode ? "AI has no memory. You must be the organizational memory." : "I have no memory. You are the memory."}</p>
                   </div>
                </div>
            </div>
        </section>

        {/* 6. REGULATION */}
        <section id={SectionType.REGULATION} className="mb-32 md:mb-48 scroll-mt-28">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Regulation is Infrastructure</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
              {isHumanMode 
                ? "Style guides don't survive contact with LLMs. Advice is optional. We need machine-enforceable constraints."
                : "Style guides don't survive contact with me. I will reword your comments because I think they sound better. I need hard constraints."}
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden shadow-2xl max-w-3xl mx-auto text-slate-300">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <TerminalIcon size={14} className="text-slate-500" />
              <span className="text-slate-500">term -- infrastructure</span>
            </div>
            <div className="space-y-2">
              <div className="text-slate-400">$ cat AGENTS.md</div>
              <div className="text-emerald-400 pl-2 md:pl-4 border-l-2 border-emerald-900/50 ml-1">
                # CRITICAL SYSTEM RULES<br/>
                1. NO direct SQL injection in raw strings.<br/>
                2. Auth middleware MUST wrap all /api/private routes.<br/>
                3. Retry logic MUST use exponential backoff.<br/>
                4. DO NOT create helpers with "Util" in the name.<br/>
              </div>
              <div className="text-slate-400 mt-6">$ git commit -m "feat: add user fetch"</div>
              <div className="text-white">Running pre-commit hooks...</div>
              <div className="text-red-400 bg-red-900/20 p-2 rounded mt-2 break-all md:break-normal">
                [ERROR] Rule Violation: Found new file 'UserUtil.ts'.<br/>
                [ERROR] Rule Violation: '/api/private/users' missing 'authMiddleware'.<br/>
                Commit rejected by SYSTEM_INSPECTOR_BOT.
              </div>
              <div className="text-slate-400 mt-2 animate-pulse">_</div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-6 italic">
            "If you don't automate the police, I will rob the bank."
          </p>
        </section>

        {/* 7. BLIND SPOTS & IKEA */}
        <section id={SectionType.BLIND_SPOTS} className="mb-32 md:mb-48 scroll-mt-28">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
              <div className="bg-white p-5 md:p-6 rounded border border-slate-200 shadow-sm">
                 <h4 className={`font-bold mb-2 flex items-center gap-2 ${isHumanMode ? 'text-amber-600' : 'text-blue-600'}`}><Box size={16}/> IKEA Analogy</h4>
                 <p className="text-slate-600 text-sm">
                   Generated code is particle board. It looks like solid oak, but it snaps under load. Stop selling it as oak.
                 </p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded border border-slate-200 shadow-sm">
                 <h4 className={`font-bold mb-2 flex items-center gap-2 ${isHumanMode ? 'text-amber-600' : 'text-blue-600'}`}><Hammer size={16}/> Mandates</h4>
                 <p className="text-slate-600 text-sm">
                   Inspectors need organizational power. Without authority, they are just "that annoying person blocking my PR."
                 </p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded border border-slate-200 shadow-sm">
                 <h4 className={`font-bold mb-2 flex items-center gap-2 ${isHumanMode ? 'text-amber-600' : 'text-blue-600'}`}><Activity size={16}/> Distributed Load</h4>
                 <p className="text-slate-600 text-sm">
                   One person cannot approve everything. This role must be a shared responsibility across the team.
                 </p>
              </div>
           </div>
        </section>

        {/* 8. CONCLUSION */}
        <section id={SectionType.CONCLUSION} className="min-h-[50vh] flex flex-col justify-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8">
            The Industrial Phase
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Software is leaving its artisanal phase.
            Code will be abundant. <span className={`text-slate-900 font-bold border-b-2 ${isHumanMode ? 'border-amber-500' : 'border-blue-600'}`}>Responsibility will be scarce.</span>
          </p>
          
          <div className={`max-w-xl mx-auto bg-slate-50 border p-6 md:p-8 rounded-xl relative shadow-lg ${isHumanMode ? 'border-amber-200' : 'border-blue-200'}`}>
            <div className={`absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 ${isHumanMode ? 'border-amber-500' : 'border-blue-600'}`}></div>
            <div className={`absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 ${isHumanMode ? 'border-amber-500' : 'border-blue-600'}`}></div>
            
            <p className={`font-mono text-base md:text-lg mb-4 ${isHumanMode ? 'text-amber-800' : 'text-blue-700'}`}>
              "We are no longer writing code line by line. We are approving systems that outlast individuals."
            </p>
            <p className="text-slate-500 text-sm">
              Let's build like we know what we're doing.
            </p>
          </div>

          <div className="mt-24 text-slate-400 font-mono text-xs">
             SYSTEM STATUS: {isHumanMode ? "HUMAN_OVERRIDE_ACTIVE" : "STANDBY"}<br/>
             WAITING FOR INSPECTOR INPUT...
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;