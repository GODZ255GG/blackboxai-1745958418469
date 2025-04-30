// Sample file data
const files = [
    {
        name: "Capacitación para el personal Administrativo",
        description: "Procedimiento de Capacitación para el personal Administrativo.",
        date: "2025-04-24",
        url: "documentos_Permanencia/PP_01_0_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/Eoc8Mx11fxxFsVLrp1REuW8Bnugc1KpZ1UwtztPpIBzdCg?e=Fcmbaa"
    },
    {
        name: "Licencia con goce y sin goce de Sueldo",
        description: "Procedimiento de Licencia con goce y sin goce de Sueldo.",
        date: "2025-04-24",
        url: "documentos_Permanencia/PP_02_0_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EoTYQWjEFMpAkLZ5iJ-6oOgBkpL3TgHzHIGCV372RU933A?e=j6f8Gq"
    },
    {
        name: "Préstamo Personal",
        description: "Procedimiento de Préstamo Personal.",
        date: "2025-04-24",
        url: "documentos_Permanencia/PP_03_0_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EicBNKfh_cZBt7VFxxdqpAMBaYrmXKHFmDDFhPdls_CpUQ?e=vq3jIn"
    },
    {
        name: "Ayuda de Guardería, Estímulo 10 de mayo y Estímulo día del padre",
        description: "Procedimiento de Ayuda de Guardería, Estímulo 10 de mayo y Estímulo día del padre.",
        date: "2025-04-08",
        url: "documentos_Permanencia/PP_04_0_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EksARftVb6xKiwm3X2A1JjEBRYvEnYu2ux-akLv4kyiUbw?e=Cphhag"
    },
    {
        name: "Procesamiento de la nómina",
        description: "Procedimiento de Procesamiento de la nómina.",
        date: "2025-04-29",
        url: "documentos_Permanencia/PP_06_0_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/Emrr3dD5-glHmr3mhNhaTCcBYtSoyFobHPJjGNh6H2O_OA?e=y3JPTa"
    }
];

// Pagination state
let currentPage = 1;
let itemsPerPage = 5;
let filteredFiles = [...files];
let sortedFiles = [...files];

// Function to render files in the table with pagination
function renderFiles(fileList) {
    const tbody = document.getElementById("filesTbody");
    tbody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = fileList.slice(startIndex, endIndex);

    pageItems.forEach((file, index) => {
        const tr = document.createElement("tr");
        tr.className = index % 2 === 0 ? "bg-gray-50" : "bg-white";

        tr.innerHTML = `
            <td class="py-3 px-4 font-medium text-blue-700">${file.name}</td>
            <td class="py-3 px-4 text-gray-700">${file.description}</td>
            <td class="py-3 px-4 text-gray-600">${file.date}</td>
            <td class="py-3 px-4 space-x-4">
                <button onclick="previewFile('${file.url}')" title="Previsualizar" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-eye"></i>
                </button>
                <a href="${file.url}" download class="text-green-600 hover:text-green-800" title="Descargar">
                    <i class="fas fa-download"></i>
                </a>
                <button onclick="openWindow('${file.url_folder}')" title="Carpeta" class="text-brown-600 hover:text-brown-800">
                    <i class="fas fa-folder"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderPaginationControls(fileList.length);
}

function openWindow(urlFolder){
    window.open(urlFolder, "_blank");
}

// Preview file using Google Docs Viewer in a new tab, except for PDFs which open directly
function previewFile(url) {
    if (url.toLowerCase().endsWith(".pdf")) {
        // Open PDF directly in a new tab for native preview
        window.open(url, "_blank");
    } else {
        const encodedUrl = encodeURIComponent(url);
        const viewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
        window.open(viewerUrl, "_blank");
    }
}

// Search and filter files
function filterFiles() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query)
    );
    currentPage = 1;
    updateView();
}

 // Sort files
function sortFiles() {
    const sortBy = document.getElementById("sortSelect").value;
    sortedFiles = [...filteredFiles];
    sortedFiles.sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "date") {
            return new Date(b.date) - new Date(a.date);
        } else if (sortBy === "size") {
            // Convert size to KB for comparison
            const sizeToKB = sizeStr => {
                const [value, unit] = sizeStr.split(" ");
                if (unit === "MB") return parseFloat(value) * 1024;
                return parseFloat(value);
            };
            return sizeToKB(b.size) - sizeToKB(a.size);
        }
        return 0;
    });
    currentPage = 1;
    updateView();
}


document.getElementById("searchInput").addEventListener("input", filterFiles);
document.getElementById("sortSelect").addEventListener("change", sortFiles);

// Initial render
updateView();

// Render pagination controls below the table and items per page select above the table
function renderPaginationControls(totalItems) {
    const paginationContainerId = "paginationControls";
    const itemsPerPageContainerId = "itemsPerPageContainer";

    // Create or update items per page select container above the table (left aligned)
    let itemsPerPageContainer = document.getElementById(itemsPerPageContainerId);
    if (!itemsPerPageContainer) {
        itemsPerPageContainer = document.createElement("div");
        itemsPerPageContainer.id = itemsPerPageContainerId;
        itemsPerPageContainer.style.textAlign = "left";
        itemsPerPageContainer.style.marginBottom = "10px";

        const label1 = document.createElement("label1");
        label1.htmlFor = "itemsPerPageSelect";
        label1.textContent = "Mostrar ";
        label1.style.marginRight = "5px";

        const select = document.createElement("select");
        select.id = "itemsPerPageSelect";
        [5, 10, 20].forEach(num => {
            const option = document.createElement("option");
            option.value = num;
            option.textContent = num;
            if (num === itemsPerPage) option.selected = true;
            select.appendChild(option);
        });

        const label = document.createElement("label");
        label.htmlFor = "itemsPerPageSelect";
        label.textContent = " documentos ";
        label.style.marginRight = "5px";
        select.addEventListener("change", () => {
            itemsPerPage = parseInt(select.value, 10);
            currentPage = 1; // Reset to first page
            updateView();
        });

        itemsPerPageContainer.appendChild(label1);
        itemsPerPageContainer.appendChild(select);
        itemsPerPageContainer.appendChild(label);


        const table = document.getElementById("filesTable");
        table.parentNode.insertBefore(itemsPerPageContainer, table);
    }

    // Create or update pagination buttons container below the table (centered)
    let container = document.getElementById(paginationContainerId);
    if (!container) {
        container = document.createElement("div");
        container.id = paginationContainerId;
        container.style.textAlign = "center";
        container.style.marginTop = "10px";

        // Previous button with left arrow
        const prevBtn = document.createElement("button");
        prevBtn.id = "prevPageBtn";
        prevBtn.innerHTML = "&#8592;"; // Left arrow
        prevBtn.style.marginRight = "10px";
        prevBtn.disabled = currentPage === 1;
        prevBtn.title = "Anterior";
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                updateView();
            }
        });

        // Next button with right arrow
        const nextBtn = document.createElement("button");
        nextBtn.id = "nextPageBtn";
        nextBtn.innerHTML = "&#8594;"; // Right arrow
        nextBtn.style.marginLeft = "10px";
        nextBtn.disabled = currentPage >= Math.ceil(totalItems / itemsPerPage);
        nextBtn.title = "Siguiente";
        nextBtn.addEventListener("click", () => {
            if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
                currentPage++;
                updateView();
            }
        });

        container.appendChild(prevBtn);
        container.appendChild(nextBtn);

        const table = document.getElementById("filesTable");
        table.parentNode.insertBefore(container, table.nextSibling);
    } else {
        // Update buttons disabled state
        const prevBtn = document.getElementById("prevPageBtn");
        const nextBtn = document.getElementById("nextPageBtn");
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage >= Math.ceil(totalItems / itemsPerPage);
    }
}

// Update the view after pagination, filtering, or sorting changes
function updateView() {
    let listToRender = filteredFiles.length !== files.length ? filteredFiles : sortedFiles;
    renderFiles(listToRender);
}
