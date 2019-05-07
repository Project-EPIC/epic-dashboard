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

export const contrastColorForText = (text) => {
    let hex = colorFromText(text);
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);
    let o = Math.round(((r * 299) + (g * 587) +(b * 114)) / 1000);
    debugger;
    return (o > 125) ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)';
}