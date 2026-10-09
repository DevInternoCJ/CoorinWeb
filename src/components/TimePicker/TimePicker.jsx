import React, { useEffect, useRef, useState } from 'react';

// Reusable TimePicker
// Props:
// - id (string) optional
// - value (string) optional, in format 'HH:MM' (24h) or display string
// - onChange (fn) receives value in 'HH:MM' 24-hour format when user confirms
// - placeholder (string)
// - className (string) extra classes for input
const pad = (n) => String(n).padStart(2, '0');

const formatTo12 = (hh, mm) => {
    const h = Number(hh);
    const m = Number(mm);
    const am = h < 12 ? 'AM' : 'PM';
    const h12 = ((h + 11) % 12) + 1; // 1..12
    return `${pad(h12)}:${pad(m)} ${am}`;
};

const nowParts = () => {
    const d = new Date();
    return { hh: pad(d.getHours()), mm: pad(d.getMinutes()) };
};

export default function TimePicker({ id, value, onChange, placeholder = 'hh:mm aa', className = '' }) {
    const uid = id || `tp-${Math.random().toString(36).slice(2, 9)}`;
    const wrapperRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState(() => {
        if (value && typeof value === 'string') {
            // try parse HH:MM
            const m = value.match(/(\d{1,2}):(\d{2})/);
            if (m) return { hh: pad(Number(m[1])), mm: pad(Number(m[2])) };
        }
        const p = nowParts();
        return { hh: p.hh, mm: p.mm };
    });

    useEffect(() => {
        const handleOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    useEffect(() => {
        if (value && typeof value === 'string') {
            const m = value.match(/(\d{1,2}):(\d{2})/);
            if (m) setInternal({ hh: pad(Number(m[1])), mm: pad(Number(m[2])) });
        }
    }, [value]);

    const hours = Array.from({ length: 24 }, (_, i) => pad(i));
    const minutes = Array.from({ length: 60 }, (_, i) => pad(i));

    const display = () => formatTo12(internal.hh, internal.mm);

    const handleNow = () => {
        const p = nowParts();
        setInternal({ hh: p.hh, mm: p.mm });
    };

    const handleOk = () => {
        setOpen(false);
        if (onChange) onChange(`${internal.hh}:${internal.mm}`);
    };

    return (
        <div className="max-w-32" ref={wrapperRef}>
            <div className="relative w-full">
                <input
                    id={uid}
                    type="text"
                    readOnly
                    value={display()}
                    placeholder={placeholder}
                    onClick={() => setOpen(v => !v)}
                    className={`${className} py-2.5 sm:py-3 ps-4 pe-12 block w-full bg-surface-secondary text-foreground border-border rounded-lg sm:text-sm focus:border-jerarquia2 focus:ring-jerarquia2 disabled:opacity-50 disabled:pointer-events-none placeholder:text-muted-foreground`}
                />

                <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <div className="relative inline-flex">
                        <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={open}
                            aria-label="Dropdown"
                            onClick={() => setOpen(v => !v)}
                            className="size-7 shrink-0 inline-flex justify-center items-center rounded-full bg-surface text-muted-foreground hover:bg-surface-secondary focus:outline-hidden focus:bg-surface-secondary disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <span className="sr-only">Dropdown</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </button>

                        <div className={`hs-dropdown-menu transition-[opacity,margin] duration ${open ? 'opacity-100 block' : 'opacity-0 hidden'} min-w-30 bg-surface border border-border shadow-xl rounded-lg mt-2`} role="menu">
                            <div className="flex flex-row divide-x divide-border">
                                <div className="p-1 max-h-56 overflow-y-auto">
                                    {hours.map(h => (
                                        <label key={h} className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-surface-secondary ${internal.hh === h ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}>
                                            <input type="radio" className="hidden" name={`${uid}-hh`} checked={internal.hh === h} onChange={() => setInternal(i => ({ ...i, hh: h }))} />
                                            <span className="block">{h}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="p-1 max-h-56 overflow-y-auto">
                                    {minutes.map(m => (
                                        <label key={m} className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-surface-secondary ${internal.mm === m ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}>
                                            <input type="radio" className="hidden" name={`${uid}-mm`} checked={internal.mm === m} onChange={() => setInternal(i => ({ ...i, mm: m }))} />
                                            <span className="block">{m}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="p-1 max-h-56 overflow-y-auto">
                                    <label className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-surface-secondary ${Number(internal.hh) < 12 ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}>
                                        <input type="radio" className="hidden" name={`${uid}-ampm`} checked={Number(internal.hh) < 12} onChange={() => setInternal(i => ({ ...i, hh: pad((Number(i.hh) % 12)) }))} />
                                        <span className="block">AM</span>
                                    </label>
                                    <label className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-surface-secondary ${Number(internal.hh) >= 12 ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}>
                                        <input type="radio" className="hidden" name={`${uid}-ampm`} checked={Number(internal.hh) >= 12} onChange={() => setInternal(i => ({ ...i, hh: pad((Number(i.hh) % 12) + 12) }))} />
                                        <span className="block">PM</span>
                                    </label>
                                </div>
                            </div>

                            <div className="py-2 px-3 flex flex-wrap justify-between items-center gap-2 border-t border-border">
                                <button type="button" onClick={handleNow} className="text-[13px] font-medium rounded-md bg-surface text-jerarquia3 hover:text-jerarquia3 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-jerarquia3">Now</button>
                                <button type="button" onClick={handleOk} className="py-1 px-2.5 text-[13px] font-medium rounded-md bg-primary text-primary-foreground hover:bg-jerarquia3 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-jerarquia2">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
