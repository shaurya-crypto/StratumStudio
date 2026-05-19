import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Download, Package, RefreshCw, Trash2, Search, Info, AlertCircle } from 'lucide-react';

interface MpyPackage {
  name: string;
  version: string;
  description: string;
  path: string;
  license: string;
}

interface LibraryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LibraryManager: React.FC<LibraryManagerProps> = ({ isOpen, onClose }) => {
  const { libraries, refreshLibraries, installLibrary, openedFolderPath, showNotification, interpreter } = useAppStore();
  const [installInput, setInstallInput] = useState('');
  const [isInstalling, setIsInstalling] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState<MpyPackage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimerRef = useRef<any>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'search' | 'installed'>('search');

  useEffect(() => {
    if (isOpen && openedFolderPath) {
      refreshLibraries();
    }
  }, [isOpen, openedFolderPath, refreshLibraries]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchInput = useCallback((value: string) => {
    setInstallInput(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    if (!value.trim() || value.startsWith('http')) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    searchTimerRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const result = await (window as any).electronAPI.searchLibraries({
          query: value.trim(),
          language: interpreter ? interpreter.language : 'micropython'
        });
        if (result.success && result.packages) {
          setSearchResults(result.packages);
          setShowResults(true);
        }
      } catch (e) {
        console.error('Search failed', e);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, []);

  if (!isOpen) return null;

  const handleInstall = async (name?: string) => {
    const pkg = name || installInput.trim();
    if (!pkg) return;
    setIsInstalling(pkg);
    setShowResults(false);
    await installLibrary(pkg);
    if (name) {
      // Don't clear input when installing from search results
    } else {
      setInstallInput('');
    }
    setIsInstalling('');
  };

  const filteredLibraries = libraries.filter(lib =>
    lib.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal anim-fade-in" style={{ width: 700, maxWidth: '92vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Package size={16} style={{ color: 'var(--accent)' }} />
            </div>
            <span>Library Manager</span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body custom-scrollbar" style={{ flex: 1, overflow: 'auto' }}>
          {!openedFolderPath ? (
            <div style={{
              padding: '40px 20px', textAlign: 'center',
              background: 'var(--bg-surface)', border: '1px dashed var(--border)',
              borderRadius: 'var(--radius-lg)', margin: '10px 0'
            }}>
              <AlertCircle size={40} style={{ color: 'var(--text-dim)', marginBottom: 12, opacity: 0.5 }} />
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>No Workspace Open</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 300, margin: '0 auto' }}>
                Open a local folder first to manage MicroPython libraries in your project.
              </p>
            </div>
          ) : (
            <>
              {/* Tab Bar */}
              <div style={{
                display: 'flex', gap: 0, borderBottom: '1px solid var(--border)',
                marginBottom: 16
              }}>
                {(['search', 'installed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '8px 16px', fontSize: 12, fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)',
                      borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {tab === 'search' ? `Browse & Install` : `Installed (${libraries.length})`}
                  </button>
                ))}
              </div>

              {activeTab === 'search' ? (
                <>
                  {/* Search / Install Input */}
                  <div style={{ marginBottom: 16, position: 'relative' }} ref={resultsRef}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={14} style={{
                          position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                          color: 'var(--text-dim)', pointerEvents: 'none'
                        }} />
                        <input
                          className="form-input"
                          placeholder="Search MicroPython packages (e.g. dht, neopixel, ssd1306) or paste URL"
                          style={{ flex: 1, paddingLeft: 32, width: '100%' }}
                          value={installInput}
                          onChange={(e) => handleSearchInput(e.target.value)}
                          onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
                          onKeyDown={(e) => e.key === 'Enter' && handleInstall()}
                        />
                        {isSearching && (
                          <RefreshCw size={14} className="animate-spin" style={{
                            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                            color: 'var(--text-dim)'
                          }} />
                        )}
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleInstall()}
                        disabled={!!isInstalling || !installInput.trim()}
                        style={{ minWidth: 90, justifyContent: 'center' }}
                      >
                        {isInstalling ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                        <span>{isInstalling ? 'Installing' : 'Install'}</span>
                      </button>
                    </div>

                    {/* Search Results Dropdown */}
                    {showResults && searchResults.length > 0 && (
                      <div style={{
                        position: 'absolute', top: '100%', left: 0, right: 0,
                        zIndex: 100, marginTop: 4,
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        maxHeight: 320, overflowY: 'auto',
                      }} className="custom-scrollbar">
                        <div style={{
                          padding: '6px 12px', fontSize: 10, fontWeight: 700,
                          color: 'var(--text-dim)', textTransform: 'uppercase',
                          borderBottom: '1px solid var(--border)', letterSpacing: '0.05em'
                        }}>
                          {searchResults.length} package{searchResults.length !== 1 ? 's' : ''} found
                        </div>
                        {searchResults.map((pkg) => {
                          const alreadyInstalled = libraries.some(l => l.replace('.py', '').toLowerCase() === pkg.name.toLowerCase());
                          const installing = isInstalling === pkg.name;
                          return (
                            <div
                              key={pkg.name}
                              style={{
                                display: 'flex', alignItems: 'center', padding: '10px 12px',
                                borderBottom: '1px solid var(--border)', gap: 10,
                                background: 'transparent', transition: 'background 0.1s ease',
                                cursor: 'pointer',
                              }}
                              className="group-hover-bg"
                              onClick={() => {
                                if (!alreadyInstalled && !installing) {
                                  handleInstall(pkg.name);
                                }
                              }}
                            >
                              <div style={{
                                width: 30, height: 30, borderRadius: 'var(--radius-sm)',
                                background: alreadyInstalled ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-surface)',
                                border: `1px solid ${alreadyInstalled ? 'rgba(34, 197, 94, 0.3)' : 'var(--border)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                              }}>
                                <Package size={13} style={{ color: alreadyInstalled ? 'rgb(34, 197, 94)' : 'var(--text-secondary)' }} />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{pkg.name}</span>
                                  <span style={{
                                    fontSize: 10, color: 'var(--text-dim)',
                                    background: 'var(--bg-surface)', padding: '1px 5px',
                                    borderRadius: 3, border: '1px solid var(--border)'
                                  }}>v{pkg.version}</span>
                                  {alreadyInstalled && (
                                    <span style={{
                                      fontSize: 10, color: 'rgb(34, 197, 94)',
                                      background: 'rgba(34, 197, 94, 0.1)', padding: '1px 5px',
                                      borderRadius: 3,
                                    }}>installed</span>
                                  )}
                                </div>
                                {pkg.description && (
                                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>
                                    {pkg.description.length > 100 ? pkg.description.slice(0, 100) + '...' : pkg.description}
                                  </div>
                                )}
                              </div>
                              {!alreadyInstalled && (
                                <button
                                  className="btn btn-primary"
                                  style={{ padding: '4px 10px', fontSize: 11, minWidth: 'auto' }}
                                  disabled={installing}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleInstall(pkg.name);
                                  }}
                                >
                                  {installing ? <RefreshCw size={12} className="animate-spin" /> : <Download size={12} />}
                                  <span>{installing ? '...' : 'Install'}</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Popular Packages */}
                  <div style={{
                    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    overflow: 'hidden', background: 'var(--bg-base)'
                  }}>
                    <div style={{
                      padding: '8px 12px', background: 'var(--bg-elevated)',
                      borderBottom: '1px solid var(--border)', display: 'flex',
                      alignItems: 'center', justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Popular MicroPython Libraries
                      </span>
                    </div>
                    <div style={{ maxHeight: 260, overflowY: 'auto' }} className="custom-scrollbar">
                      {[
                        { name: 'neopixel', desc: 'WS2812 / NeoPixel LED strip driver', icon: '💡' },
                        { name: 'dht', desc: 'DHT11 & DHT22 temperature/humidity sensor', icon: '🌡️' },
                        { name: 'ssd1306', desc: 'SSD1306 OLED display driver (I2C/SPI)', icon: '🖥️' },
                        { name: 'ds18x20', desc: 'DS18x20 temperature sensor driver', icon: '🌡️' },
                        { name: 'aiohttp', desc: 'HTTP client for MicroPython asyncio', icon: '🌐' },
                        { name: 'umqtt.simple', desc: 'Lightweight MQTT client', icon: '📡' },
                        { name: 'urequests', desc: 'HTTP requests library for MicroPython', icon: '🔗' },
                        { name: 'bmi270', desc: 'BOSCH BMI270 IMU driver', icon: '🎛️' },
                      ].map((pkg) => {
                        const alreadyInstalled = libraries.some(l => l.replace('.py', '').toLowerCase() === pkg.name.toLowerCase());
                        const installing = isInstalling === pkg.name;
                        return (
                          <div
                            key={pkg.name}
                            style={{
                              display: 'flex', alignItems: 'center', padding: '10px 14px',
                              borderBottom: '1px solid var(--border)', gap: 12,
                              background: 'transparent', transition: 'background 0.15s ease'
                            }}
                            className="group-hover-bg"
                          >
                            <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{pkg.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{pkg.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{pkg.desc}</div>
                            </div>
                            {alreadyInstalled ? (
                              <span style={{
                                fontSize: 11, color: 'rgb(34, 197, 94)', fontWeight: 500,
                                background: 'rgba(34, 197, 94, 0.1)', padding: '3px 8px',
                                borderRadius: 'var(--radius-sm)',
                              }}>Installed</span>
                            ) : (
                              <button
                                className="btn btn-primary"
                                style={{ padding: '4px 10px', fontSize: 11, minWidth: 'auto' }}
                                disabled={installing}
                                onClick={() => handleInstall(pkg.name)}
                              >
                                {installing ? <RefreshCw size={12} className="animate-spin" /> : <Download size={12} />}
                                <span>{installing ? 'Installing...' : 'Install'}</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{
                    marginTop: 16, padding: '10px 12px', background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius)', border: '1px solid var(--border)',
                    display: 'flex', gap: 10, alignItems: 'flex-start'
                  }}>
                    <Info size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Packages are sourced from the official <strong>micropython-lib</strong> index.
                      Libraries are saved to the <code style={{ color: 'var(--accent)', background: 'var(--accent-dim)', padding: '1px 4px', borderRadius: 3 }}>/lib</code> folder
                      and automatically synced to your hardware.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Installed Tab */}
                  <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--bg-base)' }}>
                    <div style={{
                      padding: '8px 12px', background: 'var(--bg-elevated)',
                      borderBottom: '1px solid var(--border)', display: 'flex',
                      alignItems: 'center', justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Installed in /lib ({libraries.length})
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ position: 'relative', width: 180 }}>
                          <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                          <input
                            placeholder="Filter installed..."
                            style={{
                              width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-light)',
                              borderRadius: 'var(--radius-sm)', padding: '3px 8px 3px 26px', fontSize: 11, color: 'var(--text-primary)',
                              outline: 'none'
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <button
                          className="icon-btn"
                          onClick={() => refreshLibraries()}
                          title="Refresh"
                          style={{ padding: 4 }}
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </div>

                    <div style={{ maxHeight: 340, overflowY: 'auto' }} className="custom-scrollbar">
                      {filteredLibraries.length === 0 ? (
                        <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
                          {searchQuery ? 'No matching libraries found' : 'No libraries installed in /lib'}
                        </div>
                      ) : (
                        filteredLibraries.map((lib) => (
                          <div
                            key={lib}
                            style={{
                              display: 'flex', alignItems: 'center', padding: '10px 14px',
                              borderBottom: '1px solid var(--border)', background: 'transparent',
                              transition: 'background 0.15s ease', gap: 12
                            }}
                            className="group-hover-bg"
                          >
                            <div style={{
                              width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                              background: 'var(--bg-surface)', border: '1px solid var(--border)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                            }}>
                              <Package size={14} style={{ color: 'var(--text-secondary)' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{lib}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <code style={{ fontSize: 10, opacity: 0.7 }}>import {lib.replace('.py', '')}</code>
                              </div>
                            </div>
                            <button
                              onClick={async () => {
                                const p = openedFolderPath + '/lib/' + lib;
                                const res = await (window as any).electronAPI.fsDeleteSafe({ filePath: p });
                                if (res.success) {
                                  showNotification(`Removed ${lib}`, 'info');
                                  refreshLibraries();
                                  useAppStore.getState().refreshLocalFolder();
                                }
                              }}
                              style={{
                                padding: 6, color: 'var(--text-dim)', background: 'transparent',
                                border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.background = 'transparent' }}
                              title="Delete Library"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <div style={{ flex: 1 }} />
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>

      <style>{`
        .group-hover-bg:hover {
          background: var(--bg-hover) !important;
        }
        .anim-fade-in {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </div>
  );
};
