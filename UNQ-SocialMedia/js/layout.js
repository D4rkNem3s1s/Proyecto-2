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
            if (elementId === 'main-header') {
                if (localStorage.getItem('theme') === 'dark') {
                    const themeIcon = element.querySelector('.change-mode i');
                    if (themeIcon) {
                        themeIcon.classList.remove('fa-moon');
                        themeIcon.classList.add('fa-sun');
                    }
                }
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

function initLayout() {
    const componentPathPrefix = './components/';

    loadComponent('main-header', componentPathPrefix + 'header.html');
    loadComponent('main-sidebar', componentPathPrefix + 'sidebar.html');

    /*dropdawn*/
    document.addEventListener("click", (ev) => {
        const themeBtn = ev.target.closest(".change-mode");
        if (themeBtn) {
            document.body.classList.toggle("dark-theme");
            const icon = themeBtn.querySelector("i");
            if (document.body.classList.contains("dark-theme")) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
                localStorage.setItem("theme", "dark");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
                localStorage.setItem("theme", "light");
            }
            return;
        }

        const trigger = ev.target.closest(".dropdown-trigger");
        const dropdown = ev.target.closest(".user-menu");

        if (trigger && dropdown) {
            dropdown.classList.toggle("active");
            document.querySelectorAll(".user-menu").forEach(i => {
                if (i !== dropdown) {
                    i.classList.remove("active");
                }
            });
            return;
        }

        const badge = ev.target.closest("#dev-badge");
        const closeBtn = ev.target.closest("#roadmap-close");
        const roadmapModal = document.getElementById("roadmap-modal");

        if (badge && roadmapModal) {
            fetchRoadmap();
            roadmapModal.classList.add("active");
            return;
        }

        if (closeBtn && roadmapModal) {
            roadmapModal.classList.remove("active");
            return;
        }

        if (!dropdown && !ev.target.closest("#roadmap-modal")) {
            document.querySelectorAll(".user-menu").forEach(i => i.classList.remove("active"));
            if (roadmapModal) roadmapModal.classList.remove("active");
        }
    });
}

async function fetchRoadmap() {
    const roadmapBody = document.getElementById("roadmap-body");
    if (!roadmapBody) return;

    try {
        const response = await fetch('../theUNQ_roadmap.json');
        const data = await response.json();

        let html = '';

        html += `<div class="roadmap-section"><h4>[Sprint Actual]</h4><ul class="roadmap-list">`;
        data.sprint_actual.forEach(item => {
            const assigneeHtml = item.assignee ? `<span class="assignee-badge">${item.assignee}</span>` : '';
            html += `<li class="roadmap-item">
                <input type="checkbox" ${item.done ? 'checked' : ''} disabled>
                <span class="${item.done ? 'done' : ''}">${item.task}</span>
                ${assigneeHtml}
            </li>`;
        });
        html += `</ul></div>`;

        html += `<div class="roadmap-section"><h4>[Pendientes]</h4><ul class="roadmap-list">`;
        data.pendientes.forEach(item => {
            const assigneeHtml = item.assignee ? `<span class="assignee-badge">${item.assignee}</span>` : '';
            html += `<li class="roadmap-item">
                <input type="checkbox" ${item.done ? 'checked' : ''} disabled>
                <span class="${item.done ? 'done' : ''}">${item.task}</span>
                ${assigneeHtml}
            </li>`;
        });
        html += `</ul></div>`;

        roadmapBody.innerHTML = html;
    } catch (error) {
        roadmapBody.innerHTML = `<p style="color: #f44747; font-size: 12px;">Error al cargar roadmap.json</p>`;
        console.error("Error loading roadmap:", error);
    }
}



if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLayout);
} else {
    initLayout();
}


