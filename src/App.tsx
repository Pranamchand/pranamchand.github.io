import React, { useState } from 'react';
import { WindowManagerProvider } from './hooks/useWindowManager';
import { BootScreen } from './components/BootScreen';
import { MenuBar } from './components/MenuBar';
import { Desktop } from './components/Desktop';

export function App() {
  const [bootFinished, setBootFinished] = useState(false);

  return (
    <WindowManagerProvider>
      <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
        <BootScreen onComplete={() => setBootFinished(true)} />
        <MenuBar bootFinished={bootFinished} />
        <Desktop bootFinished={bootFinished} />
      </div>
    </WindowManagerProvider>
  );
}

export default App;
