const structure_input = document.querySelector("input#structure");
const create_button = document.querySelector("button#create");

async function createPDFFiles(){
    if(structure_input.files.length === 0){
        return false;
    }

    let documents = {};
    Array.from(structure_input.files).forEach(file => {
        if(!file.type.startsWith("image/")){return;}

        const parentFolderName = getParentFolderName(file);
        if(documents[parentFolderName]){
            documents[parentFolderName].push(file);
        }else{
            documents[parentFolderName] = [file];
        }
    });
    
    for(let name of Object.keys(documents)){
        let doc = undefined;

        const images = documents[name];
        for(let image of images){
            const img = await loadImage(image);
            const format = [img.width, img.height];
            // if width is bigger than height and orientation is set to portrait, the image won't fit the page, and vice-versa
            const orientation = img.width > img.height ? 'l' : 'p';

            if(!doc){
                doc = new jspdf.jsPDF({
                    orientation: orientation,
                    unit: "px",
                    format: format,
                    hotfixes: ["px_scaling"]
                });
            }else{
                doc.addPage(format, orientation);
            }
            
            const ext = image.type.split("image/")[1].toUpperCase();

            /* const b64 = getBase64(image); doc.addImage(b64, ext, 10, 10); */
            doc.addImage(img, ext, 1, 1, format[0], format[1]);

            URL.revokeObjectURL(img.src);
        }

        doc.save(`${name}.pdf`);
    };
}

create_button.addEventListener("click", (e) => {
    createPDFFiles();
});
