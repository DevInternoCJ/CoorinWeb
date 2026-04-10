// Función para inicializar los colapsables del sidebar
export function initSidebarCollapse() {
  document.addEventListener('click', function(e) {
    // Verificar si el clic fue en un elemento con data-collapse
    const collapseToggle = e.target.closest('[data-collapse]');
    if (!collapseToggle) return;

    e.preventDefault();
    
    const targetId = collapseToggle.getAttribute('data-collapse');
    const targetElement = document.querySelector(targetId);
    
    if (!targetElement) return;

    // Alternar la clase 'hidden' y 'collapse-open'
    targetElement.classList.toggle('hidden');
    collapseToggle.classList.toggle('collapse-open');
    
    // Rotar la flecha (opcional)
    const chevron = collapseToggle.querySelector('.icon-[tabler--chevron-down]');
    if (chevron) {
      chevron.classList.toggle('rotate-180');
    }
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarCollapse);
} else {
  initSidebarCollapse();
}