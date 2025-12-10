import React, { useEffect, useState } from 'react';
import { useJarvis } from './hooks/useJarvis';
import ArcReactor from './components/ArcReactor';
import StatusPanel from './components/StatusPanel';
import { ConnectionState } from './types';

const App: React.FC = () => {
  const { 
    connect, 
    disconnect, 
    connectionState, 
    messages, 
    audioVolume,
    isVisionEnabled,
    setIsVisionEnabled,
    videoRef,
    canvasRef,
    currentTranscript,
    mobileStatus
  } = useJarvis();

  const [initialized, setInitialized] = useState(false);

  const handleInitialize = () => {
    setInitialized(true);
    connect();
  };

  const handleToggleVision = () => {
    setIsVisionEnabled(!isVisionEnabled);
  };

  if (!initialized) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-cyan-500/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border border-cyan-400/50 border-dashed animate-[spin_5s_linear_infinite_reverse]"></div>
            </div>
            
            <button 
            onClick={handleInitialize}
            className="group cursor-pointer relative"
            >
            <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-all duration-500"></div>
            <div className="relative border border-cyan-500/50 bg-black/80 text-cyan-400 px-8 py-4 md:px-12 md:py-4 rounded-full font-mono text-lg md:text-xl tracking-[0.2em] md:tracking-[0.3em] backdrop-blur-md group-hover:border-cyan-400 group-hover:text-cyan-200 transition-all uppercase text-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Initialize Mark VII
            </div>
            </button>
            
            <div className="flex flex-col items-center gap-2">
                <p className="text-cyan-800 font-mono text-[10px] md:text-xs tracking-[0.5em] animate-pulse text-center">
                    BIOMETRICS CONFIRMED
                </p>
                <p className="text-cyan-900 font-mono text-[8px] tracking-[0.2em]">
                    SECURE CHANNEL ENCRYPTED
                </p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black text-cyan-400 overflow-hidden flex flex-col font-rajdhani pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Background Grid & Vignette */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]"></div>

      {/* Top Header */}
      <header className="relative z-20 flex justify-between items-center px-6 py-4 border-b border-cyan-900/30 bg-black/60 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-4">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_#22d3ee]"></div>
            <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                    J.A.R.V.I.S.
                </h1>
                <span className="text-[10px] tracking-[0.4em] text-cyan-700">MARK VII</span>
            </div>
        </div>
        
        <div className="flex items-center gap-6 font-mono text-[10px] md:text-xs text-cyan-600">
            <div className="hidden md:flex flex-col items-end border-r border-cyan-900/50 pr-4">
                <span className="text-cyan-500">PROTOCOL: ADVANCED</span>
                <span>CPU: NOMINAL</span>
            </div>
            <div className={`px-3 py-1 border ${connectionState === ConnectionState.CONNECTED ? 'border-green-500/50 bg-green-950/20 text-green-400' : 'border-red-500/50 bg-red-950/20 text-red-400'} rounded tracking-wider shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                {connectionState}
            </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 lg:p-6 overflow-hidden">
        
        {/* LEFT COLUMN: System Diagnostics (Hidden on mobile initially, or stacked) */}
        <div className="hidden lg:flex flex-col gap-4 h-full animate-slideRight">
            <StatusPanel messages={messages} isVisionEnabled={isVisionEnabled} mobileStatus={mobileStatus} />
        </div>

        {/* CENTER COLUMN: Arc Reactor & Transcript (Spans 2 cols on Desktop) */}
        <div className="lg:col-span-2 flex flex-col items-center justify-between py-4 lg:py-8 h-full relative">
             
             {/* Reactor Container */}
             <div className="flex-1 flex items-center justify-center w-full relative">
                {/* Mobile specific background decoration */}
                <div className="lg:hidden absolute inset-0 border border-cyan-900/20 rounded-lg"></div>
                <ArcReactor active={connectionState === ConnectionState.CONNECTED} volume={audioVolume} />
             </div>
             
             {/* Transcript Area */}
             <div className="w-full max-w-2xl min-h-[120px] flex flex-col justify-end items-center text-center gap-3 z-20 mt-4 lg:mb-8">
                {/* Visualizer */}
                {audioVolume > 0.05 && !currentTranscript.model && (
                    <div className="flex gap-1 h-6 items-center opacity-80">
                        {[...Array(7)].map((_, i) => (
                             <div key={i} className="w-1 bg-cyan-400 shadow-[0_0_5px_#22d3ee] animate-[pulse_0.4s_ease-in-out_infinite]" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.05}s` }}></div>
                        ))}
                    </div>
                )}
                
                <div className="w-full px-4 space-y-2">
                     {currentTranscript.user && (
                        <div className="text-cyan-600/80 text-xs md:text-sm font-mono tracking-wider uppercase animate-fadeIn">
                            cmd: {currentTranscript.user}
                        </div>
                     )}
                     
                     {currentTranscript.model && (
                        <div className="text-cyan-100 text-lg md:text-2xl font-medium tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-slideUp">
                            "{currentTranscript.model}"
                        </div>
                     )}
                </div>
             </div>
        </div>

        {/* RIGHT COLUMN: Controls & Vision (Stacked on Mobile below Reactor) */}
        <div className="flex flex-col gap-4 h-full lg:overflow-y-auto animate-slideLeft">
            
            {/* Vision Feed */}
            <div className="relative border border-cyan-800/50 bg-black/60 aspect-video rounded-sm overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] group">
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[gradient_3s_linear_infinite] opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                 <video 
                    ref={videoRef} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVisionEnabled ? 'opacity-90' : 'opacity-20 grayscale'}`}
                    muted 
                    playsInline 
                 />
                 <canvas ref={canvasRef} className="hidden" />
                 
                 {/* Camera HUD Overlay */}
                 <div className="absolute inset-0 p-2 pointer-events-none">
                    <div className="w-full h-full border border-cyan-500/10 relative">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
                        {isVisionEnabled && (
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-[8px] font-mono text-red-500">LIVE FEED</span>
                            </div>
                        )}
                        {!isVisionEnabled && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-cyan-900 text-[10px] font-mono tracking-widest">OFFLINE</span>
                             </div>
                        )}
                    </div>
                 </div>
            </div>

            {/* Control Panel */}
            <div className="flex flex-col gap-3 p-4 border border-cyan-900/50 bg-cyan-950/10 backdrop-blur-sm relative">
                <div className="absolute top-0 left-0 w-1 h-4 bg-cyan-500"></div>
                <h3 className="text-cyan-600 font-mono text-[10px] tracking-[0.2em] mb-2 border-b border-cyan-900/30 pb-1">MANUAL OVERRIDE</h3>
                
                <button 
                    onClick={handleToggleVision}
                    className={`w-full py-3 px-4 font-mono text-[10px] md:text-xs tracking-widest border transition-all duration-300 flex items-center justify-between group
                        ${isVisionEnabled 
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                            : 'border-cyan-900/50 text-cyan-700 hover:border-cyan-700 hover:text-cyan-500'}`}
                >
                    <span>VISION_SYSTEM</span>
                    <span className={isVisionEnabled ? 'text-green-400' : 'text-cyan-900'}>{isVisionEnabled ? 'ON' : 'OFF'}</span>
                </button>

                <button 
                    onClick={connectionState === ConnectionState.CONNECTED ? disconnect : connect}
                    className={`w-full py-3 px-4 font-mono text-[10px] md:text-xs tracking-widest border transition-all duration-300 text-center
                        ${connectionState === ConnectionState.CONNECTED 
                            ? 'border-red-900/50 text-red-500 hover:bg-red-950/30 hover:border-red-500' 
                            : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]'}`}
                >
                    {connectionState === ConnectionState.CONNECTED ? 'DISENGAGE PROTOCOL' : 'ENGAGE SYSTEM'}
                </button>
            </div>

            {/* Mobile Only: Status Panel shown at bottom */}
            <div className="lg:hidden mt-4">
                 <StatusPanel messages={messages} isVisionEnabled={isVisionEnabled} mobileStatus={mobileStatus} />
            </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 py-2 border-t border-cyan-900/30 bg-black/80 flex justify-between px-6 text-[8px] md:text-[9px] font-mono text-cyan-800 tracking-[0.2em] uppercase shrink-0">
        <span>Systems Online © 2025</span>
        <span className="hidden md:inline">Restricted Access // Level 10</span>
        <span>v.7.0.4</span>
      </footer>

    </div>
  );
};

export default App;