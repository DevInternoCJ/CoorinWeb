import dataSidebar from "./DataSidebar";

/**
 * Busca recursivamente un item por su ID en los submenús y retorna el path completo
 * @param {Array} subMenus - Array de submenús a buscar
 * @param {string} targetId - ID del item a buscar
 * @param {Array} currentPath - Path acumulado hasta ahora
 * @returns {Array|null} - Array con los títulos del path o null si no se encuentra
 */
function findPathInSubMenus(subMenus, targetId, currentPath = []) {
    for (const item of subMenus) {
        // Verificar si este item es el que buscamos
        if (item.id === targetId) {
            return [...currentPath, item.title];
        }

        // Buscar en submenús anidados (subMenus, subMenus2, subMenus3, etc.)
        for (const key of Object.keys(item)) {
            if (key.startsWith("subMenus") && Array.isArray(item[key])) {
                const found = findPathInSubMenus(item[key], targetId, [...currentPath, item.title]);
                if (found) return found;
            }
        }
    }
    return null;
}

/**
 * Obtiene el path completo de un item del sidebar basándose en su ID
 * El path incluye: divider/titulo/subtitulo (según la jerarquía)
 * @param {string} menuId - ID del menú (ej: "2ZZZ", "1CCC")
 * @returns {string} - Path completo para la URL (ej: "Procesos/Visitas/Captura")
 */
export function getSidebarPathById(menuId) {
    // Recorrer todas las secciones del sidebar
    for (const indiceKey of Object.keys(dataSidebar)) {
        const indiceArr = dataSidebar[indiceKey];

        for (const section of indiceArr) {
            const divider = section.divider || "";

            if (section.Menu) {
                for (const menu of section.Menu) {
                    if (menu.subMenus) {
                        const pathInSubMenus = findPathInSubMenus(menu.subMenus, menuId, []);
                        if (pathInSubMenus) {
                            // Combinar divider + path encontrado
                            return [divider, ...pathInSubMenus].filter(Boolean).join("/");
                        }
                    }
                }
            }
        }
    }

    // Si no se encontró, retornar el ID como fallback
    return menuId;
}

/**
 * Obtiene el path del sidebar basándose en el título del menú
 * Útil cuando solo tenemos el título pero no el ID
 * @param {string} menuTitle - Título del menú (ej: "Captura", "Comentarios")
 * @returns {string} - Path completo para la URL
 */
export function getSidebarPathByTitle(menuTitle) {
    // Recorrer todas las secciones del sidebar
    for (const indiceKey of Object.keys(dataSidebar)) {
        const indiceArr = dataSidebar[indiceKey];

        for (const section of indiceArr) {
            const divider = section.divider || "";

            if (section.Menu) {
                for (const menu of section.Menu) {
                    if (menu.subMenus) {
                        const pathInSubMenus = findPathByTitle(menu.subMenus, menuTitle, []);
                        if (pathInSubMenus) {
                            return [divider, ...pathInSubMenus].filter(Boolean).join("/");
                        }
                    }
                }
            }
        }
    }

    return menuTitle;
}

/**
 * Busca recursivamente un item por su título en los submenús
 */
function findPathByTitle(subMenus, targetTitle, currentPath = []) {
    for (const item of subMenus) {
        if (item.title === targetTitle) {
            return [...currentPath, item.title];
        }

        for (const key of Object.keys(item)) {
            if (key.startsWith("subMenus") && Array.isArray(item[key])) {
                const found = findPathByTitle(item[key], targetTitle, [...currentPath, item.title]);
                if (found) return found;
            }
        }
    }
    return null;
}
