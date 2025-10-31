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
                    className={`${className} py-2.5 sm:py-3 ps-4 pe-12 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-neutral-600`}
                />

                <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <div className="relative inline-flex">
                        <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={open}
                            aria-label="Dropdown"
                            onClick={() => setOpen(v => !v)}
                            className="size-7 shrink-0 inline-flex justify-center items-center rounded-full bg-white text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                            <span className="sr-only">Dropdown</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </button>

                        <div className={`hs-dropdown-menu transition-[opacity,margin] duration ${open ? 'opacity-100 block' : 'opacity-0 hidden'} min-w-30 bg-white border border-gray-200 shadow-xl rounded-lg mt-2 dark:bg-neutral-800 dark:border-neutral-700`} role="menu">
                            <div className="flex flex-row divide-x divide-gray-200 dark:divide-neutral-700">
                                <div className="p-1 max-h-56 overflow-y-auto">
                                    {hours.map(h => (
                                        <label key={h} className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 ${internal.hh === h ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>
                                            <input type="radio" className="hidden" name={`${uid}-hh`} checked={internal.hh === h} onChange={() => setInternal(i => ({ ...i, hh: h }))} />
                                            <span className="block">{h}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="p-1 max-h-56 overflow-y-auto">
                                    {minutes.map(m => (
                                        <label key={m} className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 ${internal.mm === m ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>
                                            <input type="radio" className="hidden" name={`${uid}-mm`} checked={internal.mm === m} onChange={() => setInternal(i => ({ ...i, mm: m }))} />
                                            <span className="block">{m}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="p-1 max-h-56 overflow-y-auto">
                                    <label className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-gray-100 ${Number(internal.hh) < 12 ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>
                                        <input type="radio" className="hidden" name={`${uid}-ampm`} checked={Number(internal.hh) < 12} onChange={() => setInternal(i => ({ ...i, hh: pad((Number(i.hh) % 12)) }))} />
                                        <span className="block">AM</span>
                                    </label>
                                    <label className={`group relative flex justify-center items-center p-1.5 w-10 text-center text-sm cursor-pointer rounded-md hover:bg-gray-100 ${Number(internal.hh) >= 12 ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>
                                        <input type="radio" className="hidden" name={`${uid}-ampm`} checked={Number(internal.hh) >= 12} onChange={() => setInternal(i => ({ ...i, hh: pad((Number(i.hh) % 12) + 12) }))} />
                                        <span className="block">PM</span>
                                    </label>
                                </div>
                            </div>

                            <div className="py-2 px-3 flex flex-wrap justify-between items-center gap-2 border-t border-gray-200 dark:border-neutral-700">
                                <button type="button" onClick={handleNow} className="text-[13px] font-medium rounded-md bg-white text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-blue-700 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600">Now</button>
                                <button type="button" onClick={handleOk} className="py-1 px-2.5 text-[13px] font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-blue-500">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
