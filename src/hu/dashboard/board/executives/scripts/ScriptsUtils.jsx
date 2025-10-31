

import { useEffect, useCallback } from "react";

// ============= UTILIDADES =============

export const formatValue = (value, key) => {
  if (key === "Saldo" && typeof value === "number") {
    return `$${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return String(value).trim();
};

export const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export const createNewScript = () => ({
  idScript: 0,
  nombre: " -- Nuevo -- ",
  descripcion: "",
  script: ""
});

// ============= HOOKS PERSONALIZADOS =============

export const useScriptInitialization = (scripts, selectedScript, onScriptsUpdate) => {
  if (scripts.length > 0 && !selectedScript) {
    const nuevoScript = scripts.find((s) => s.idScript === 0);
    if (nuevoScript) return nuevoScript;
    const newScript = createNewScript();
    onScriptsUpdate?.([newScript, ...scripts]);
    return newScript;
  }
  return null;
};

export const useScriptEditor = (editedData, showPreview, renderFormattedScriptToHTML, editableRef, cursorPosition) => {
  const saveCursorPosition = useCallback(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && editableRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editableRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
    return 0;
  }, [editableRef]);

  const restoreCursorPosition = useCallback((position) => {
    if (!editableRef.current) return;
    const selection = window.getSelection();
    const range = document.createRange();
    let charCount = 0;
    let nodeStack = [editableRef.current];
    let node;
    let foundStart = false;

    while (!foundStart && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        const nextCharCount = charCount + node.length;
        if (position >= charCount && position <= nextCharCount) {
          range.setStart(node, position - charCount);
          range.setEnd(node, position - charCount);
          foundStart = true;
        }
        charCount = nextCharCount;
      } else {
        let i = node.childNodes.length;
        while (i--) nodeStack.push(node.childNodes[i]);
      }
    }
    if (foundStart) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editableRef]);

  useEffect(() => {
    if (editableRef.current && editedData.script !== undefined) {
      const rendered = renderFormattedScriptToHTML(editedData.script);
      if (editableRef.current.innerHTML !== rendered) {
        editableRef.current.innerHTML = rendered;
        if (!showPreview) restoreCursorPosition(cursorPosition);
      }
    }
  }, [editedData.script, showPreview, renderFormattedScriptToHTML, cursorPosition, restoreCursorPosition, editableRef]);

  return { saveCursorPosition, restoreCursorPosition };
};