export function isValidBase64String(str: string) {
    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Pattern.test(str) && str.length % 4 === 0;
}

export function isValidGridStructure(decompressedString: string) {
    if (decompressedString.length < 300 || decompressedString.length > 1000) {
        console.log(decompressedString.length, decompressedString);
        return false;
    }
    const rows = decompressedString.split(";");
    if (rows.length !== 9) {
        return false;
    }
    for (const row of rows) {
        const cells = row.split(",");
        if (cells.length !== 9) {
            
            return false;
        }

        for (const cell of cells) {
            const parts = cell.split(":");
            if (parts.length !== 4) {
                console.log(parts.length)
                return false;
            }
        }
    }

    return true;
}
