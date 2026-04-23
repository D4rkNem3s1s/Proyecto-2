/**
 * 
 * @param {} elementId 
 * @param {} filePath 
 * @returns 
 * 
 * 
 */
async function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            element.innerHTML = content;

            // Tras cargar el sidebar, resalta el enlace activo
            if (elementId === 'main-sidebar') {
                highlightActiveLink();
            }
        } else {
            console.error(`Error al cargar el componente: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error al cargar el componente ${filePath}:`, error);
    }
}
/**
 * 
 * 
 * 
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href) && href !== '#') {
            item.classList.add('active');
        } else if (currentPath.endsWith('/') && href === 'home.html') {
            // Caso por defecto de la página de inicio
            item.classList.add('active');
        }
    });
}

function initLayout(){
    const componentPathPrefix = './components/';

    loadComponent('main-header', componentPathPrefix + 'header.html');
    loadComponent('main-sidebar', componentPathPrefix + 'sidebar.html');

    /*dropdawn*/
    document.addEventListener("click", (ev) => {
        const trigger = ev.target.closest(".dropdown-trigger");
        const dropdown = ev.target.closest(".user-menu");

        if(trigger && dropdown){
            dropdown.classList.toggle("active");
            document.querySelectorAll(".user-menu").forEach(i => {
                if(i !== dropdown){
                    i.classList.remove("active");
                }
            });
            return;
        }
        if(!dropdown){
            document.querySelectorAll(".user-menu").forEach(i => i.classList.remove("active"));
        }
    });
}



if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initLayout);
}else{
    initLayout();
}


