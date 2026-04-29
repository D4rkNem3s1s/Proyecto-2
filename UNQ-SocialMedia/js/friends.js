document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            contents.forEach(content => {
                content.style.display = "none";
                content.classList.remove("active");
            });

            const targetId = tab.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = "grid";
                targetContent.classList.add("active");
            }
        });
    });
});
