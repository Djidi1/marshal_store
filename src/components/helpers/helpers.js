export function convertIcon(data){
    if (data !== undefined) {
        data = data.replace(/"/g, '\'');
        data = data.replace(/>\s{1,}</g, "><");
        data = data.replace(/\s{2,}/g, " ");
        data = data.replace(/333333/g, "cb2128");
        const escaped = data.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
        return `url("data:image/svg+xml,${escaped}")`;
    }
    return '';
}
