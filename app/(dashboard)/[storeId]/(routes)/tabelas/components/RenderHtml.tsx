import React from 'react';
//@ts-ignore
function RenderHTML({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

//@ts-ignore
export function extractTextFromHTML(htmlContent) {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    return div.innerText;
}
