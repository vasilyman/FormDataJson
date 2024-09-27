import FormDataJson from "./components/form";

customElements.define("form-data-json", FormDataJson);

const template = `
<div>
    <div>Hello</div>
    <form-data-json type="form">
        <form-data-json type="input" name="name"></form-data-json>
        <form-data-json type="input" name="family"></form-data-json>
    </form-data-json>
</div>
`;

const domParse = (html: string) => {
    const el = new DOMParser().parseFromString(html, 'text/html').body.firstChild;
    if (!el) throw new Error('error template parsing');

    return el;
};

const app = domParse(template);

setTimeout(() => {
    const el = document.querySelector('form-data-json[type=form');
    console.log(el);
    
    if (el) el.addEventListener('changedata', ({ detail }: CustomEvent) => console.log(detail.value), { passive: true });  
}, 400);

export default app;