export const colorFromText = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
        
    return "#"+"00000".substring(0, 6 - c.length) + c;
}