// Sample file data
const files = [
    {
        name: "Reclutamiento de Personal por Obra y Tiempo Determinado (Eventual)",
        description: "Procedimiento para el Recutamiento de Personal por Obra y Tiempo Determinado (Eventual).",
        date: "2025-03-03",
        url: "documentos_Ingreso/PI_01_1_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/Em7yW5s6jjNPjhPUpVlC-CUB2YlMvh2n_u7dIO3cbee2uw?e=morZIp"
    },
    {
        name: "Reclutamiento y selección de Personal de Confianza (Interino por Persona)",
        description: "Procedimiento para el Reclutamiento y selección de Personal de Confianza (Interino por Persona).",
        date: "2025-03-13",
        url: "documentos_Ingreso/PI_01_2_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/ErkSYxDRjKNOjis4effrvXIBpQsB5IVeYgxRLp_N6JEdmg?e=hR46NI"
    },
    {
        name: "Reclutamiento y selección del personal de confianza (Planta)",
        description: "Procedimiento para el Reclutamiento y selección del personal de confianza (Planta).",
        date: "2025-03-03",
        url: "documentos_Ingreso/PI_01_3_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EmPNP5fNoC5GqooOcTdZ7_4B0ji-3tGs-YOcJ9F0n5G04g?e=3kpYVJ"
    },
    {
        name: "Movimiento de Alta de Mandos Medios y Superiores",
        description: "Procedimiento para el Movimiento de Alta de Mandos Medios y Superiores.",
        date: "2025-03-20",
        url: "documentos_Ingreso/PI_02_1_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EuWyltPBbQ5AjJnQlzxnxSMBKrDlMxeZVaVwb5dXYHwDmg?e=XPakbB"
    },
    {
        name: "Movimiento de Alta de personal de Confianza",
        description: "Procedimiento para el Movimiento de Alta de personal de Confianza.",
        date: "2025-03-07",
        url: "documentos_Ingreso/PI_02_3_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/ElhVPpGiTrJKhYLXsFfQPQIBh4WhN2xYryfPI7BdKp3YOg?e=4rELpb"
    },
    {
        name: "Movimiento de Alta de personal Académico",
        description: "Procedimiento para el Movimiento de Alta de personal Académico.",
        date: "2025-03-13",
        url: "documentos_Ingreso/PI_02_4_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/ElzVN6IjPY1MupfXwCtU1O0B6RzCulAkRcaB4XdMQO3HdA?e=Ku0UVi"
    },
    {
        name: "Movimiento de Alta de personal por Obra y Tiempo Determinado (Eventual)",
        description: "Procedimiento para el Movimiento de Alta de personal por Obra y Tiempo Determinado (Eventual).",
        date: "2025-03-13",
        url: "documentos_Ingreso/PI_02_5_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EiziM-zwEqtMl6XE_m23-GcBKA0wvK0aPH5VeN3Cfy5epQ?e=xpWz4K"
    },
    {
        name: "Movimiento de Alta de Becas",
        description: "Procedimiento para el Movimiento de Alta de Becas.",
        date: "2025-03-12",
        url: "documentos_Ingreso/PI_02_6_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EqlJO-jS1r9Agl5KKKdnvGEBWLCHLoZs7T6CJ41DZUrYhA?e=KkudmT"
    },
    {
        name: "Integración y/o Actualización de Expediente Físico de Personal",
        description: "Procedimiento de Integración y/o Actualización de Expediente Físico de Personal.",
        date: "2025-03-14",
        url: "documentos_Ingreso/PI_03_1_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EgYya-wh1B1Oq7asixSE7MgBoa26RxCilcwHl867TuIuGw?e=CBI1Eb"
    },
    {
        name: "Integración y/o Actualización de Expediente Electrónico de Personal",
        description: "Procedimiento de Integración y/o Actualización de Expediente Electrónico de Personal.",
        date: "2025-03-14",
        url: "documentos_Ingreso/PI_03_2_Documento.pdf",
        url_folder:"https://uvmx-my.sharepoint.com/:f:/g/personal/zs20015709_estudiantes_uv_mx/EuGGjsH_xCdJntpJVE8S7wwBWzsXRPMK6DBRDNgcV4vbFQ?e=K8iWGE"
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
