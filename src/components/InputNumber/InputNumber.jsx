import React from 'react';

/**
 * InputNumber
 * Props:
 * - id
 * - value (number or string)
 * - onChange(newValue)
 * - min, max, step
 * - showButtons (default true)
 * - error (string) -> when provided shows red styles and icon and aria-describedby
 * - className
 */
const clamp = (v, min, max) => {
    let n = Number(v);
    if (isNaN(n)) n = '';
    if (min !== undefined && min !== null && n !== '') n = Math.max(n, Number(min));
    if (max !== undefined && max !== null && n !== '') n = Math.min(n, Number(max));
    return n;
};

export default function InputNumber({ id, value, onChange, min, max, step = 1, showButtons = true, error = '', className = '', prefix = '', onBlur, asText = false, inputClassName = '' }) {
    const inputId = id || `input-number-${Math.random().toString(36).slice(2, 9)}`;
    const helperId = `${inputId}-helper`;

    const handleChange = (raw) => {
        if (asText) {
            onChange?.(raw);
            return;
        }
        // accept empty string
        if (raw === '') {
            onChange?.('');
            return;
        }
        // allow numeric strings
        const cleaned = String(raw).replace(/[^0-9.-]/g, '');
        if (cleaned === '' || cleaned === '-' || cleaned === '.') {
            onChange?.(cleaned);
            return;
        }
        const n = Number(cleaned);
        if (isNaN(n)) return;
        const cl = clamp(n, min, max);
        onChange?.(cl);
    };

    const inc = () => {
        const cur = value === '' || value === null || value === undefined ? 0 : Number(value);
        const next = (isNaN(cur) ? 0 : cur) + Number(step);
        handleChange(next);
    };

    const dec = () => {
        const cur = value === '' || value === null || value === undefined ? 0 : Number(value);
        const next = (isNaN(cur) ? 0 : cur) - Number(step);
        handleChange(next);
    };

    return (
        // Wrapper keeps only background/rounding; border is applied on the input to avoid double outlines
        <div className={`rounded-lg bg-white ${className}`} style={{ backgroundColor: '#ffffff' }} data-hs-input-number="">
            <div className="w-full flex justify-between items-center gap-x-3">
                <div className="relative w-full">
                    <input
                        id={inputId}
                        aria-describedby={error ? helperId : undefined}
                        className={inputClassName || `block w-full rounded-lg sm:text-sm bg-white ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1'} ${prefix ? 'pl-8 py-1 pr-2' : 'px-2 py-1'} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                        style={{ MozAppearance: 'textfield', backgroundColor: '#ffffff', color: 'var(--color-jerarquia3)' }}
                        type={asText ? 'text' : 'number'}
                        value={value === null || value === undefined ? '' : String(value)}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={onBlur}
                        min={min}
                        max={max}
                        step={step}
                        aria-roledescription="Number field"
                        data-hs-input-number-input=""
                    />
                    {error && (
                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none">
                            <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" x2="12" y1="8" y2="12"></line>
                                <line x1="12" x2="12.01" y1="16" y2="16"></line>
                            </svg>
                        </div>
                    )}
                    {prefix && (
                        <div className="absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm" style={{ color: 'var(--color-jerarquia3)' }}>
                            {prefix}
                        </div>
                    )}
                </div>

                {showButtons && (
                    <div className="flex justify-end items-center gap-x-1.5">
                        <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Decrease" onClick={dec}>
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                            </svg>
                        </button>
                        <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Increase" onClick={inc}>
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-red-600 mt-2" id={helperId}>{error}</p>}
        </div>
    );
}
