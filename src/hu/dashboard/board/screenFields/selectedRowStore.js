import { create } from 'zustand';

const useSelectedRowStore = create((set, get) => ({
  // Estado
  selectedRowData: null,
  selectedRowIndex: null,
  
  // Actions
  setSelectedRow: (rowData, rowIndex) => {
    console.log('Store - Setting selected row:', { rowData, rowIndex }); // Debug
    set({ 
      selectedRowData: rowData,
      selectedRowIndex: rowIndex 
    });
  },
  
  clearSelectedRow: () => {
    set({ 
      selectedRowData: null,
      selectedRowIndex: null 
    });
  },
  
  // Getters
  getSelectedRowData: () => get().selectedRowData,
  getSelectedRowIndex: () => get().selectedRowIndex,
}));

export default useSelectedRowStore;