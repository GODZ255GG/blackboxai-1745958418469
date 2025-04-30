// Sample file data
const files = [
    {
        name: "Contrato de Trabajo.pdf",
        description: "Formato estándar de contrato para nuevos colaboradores.",
        date: "2023-04-01",
        size: "1.1 MB",
        url: "https://example.com/files/contrato-trabajo.pdf"
    },
    {
        name: "Guía de Inducción.docx",
        description: "Documento con lineamientos para la inducción de personal nuevo.",
        date: "2023-03-20",
        size: "900 KB",
        url: "https://example.com/files/guia-induccion.docx"
    },
    {
        name: "Formulario de Registro.xlsx",
        description: "Formulario para el registro de datos de ingreso.",
        date: "2023-03-25",
        size: "450 KB",
        url: "https://example.com/files/formulario-registro.xlsx"
    }
];

// Function to render files in the table
function renderFiles(fileList) {
    const tbody = document.getElementById("filesTbody");
    tbody.innerHTML = "";
    fileList.forEach((file, index) => {
        const tr = document.createElement("tr");
        tr.className = index % 2 === 0 ? "bg-gray-50" : "bg-white";

        tr.innerHTML = `
            <td class="py-3 px-4 font-medium text-blue-700">${file.name}</td>
            <td class="py-3 px-4 text-gray-700">${file.description}</td>
            <td class="py-3 px-4 text-gray-600">${file.date}</td>
            <td class="py-3 px-4 text-gray-600">${file.size}</td>
            <td class="py-3 px-4 space-x-4">
                <button onclick="previewFile('${file.url}')" title="Previsualizar" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-eye"></i>
                </button>
                <a href="${file.url}" download class="text-green-600 hover:text-green-800" title="Descargar">
                    <i class="fas fa-download"></i>
                </a>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Preview file using Google Docs Viewer in a new tab
function previewFile(url) {
    const encodedUrl = encodeURIComponent(url);
    const viewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
    window.open(viewerUrl, "_blank", "width=800,height=600");
}

// Search and filter files
function filterFiles() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = files.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query)
    );
    renderFiles(filtered);
}

// Sort files
function sortFiles() {
    const sortBy = document.getElementById("sortSelect").value;
    const sorted = [...files];
    sorted.sort((a, b) => {
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
    renderFiles(sorted);
}

document.getElementById("searchInput").addEventListener("input", filterFiles);
document.getElementById("sortSelect").addEventListener("change", sortFiles);

// Initial render
renderFiles(files);
