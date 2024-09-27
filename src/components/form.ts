class FormDataJson extends HTMLElement {
    static observedAttributes = [
        'type',
        'name',
    ];

    _value: any;

    constructor() {
      super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const form = document.createElement('form');
        const input = document.createElement('input');

        const type = this.getAttribute('type');

        const style = document.createElement("style");
        style.textContent = `
        form {
            display: block;
            border: 1px solid;
        }
        
        input {
            display: block;
            border: 1px solid red;
            height: 1rem;
        }
        `;

        let root: Element;        
        switch (type) {
            case 'form':
                root = form;
                root.innerHTML = '<slot></slot>';

                const onInputForm = () => {
                    const data = Array.from(this.children)
                        .reduce((acc, el) => {
                            if (!(el instanceof FormDataJson)) return acc;

                            const name = el.getAttribute('name');

                            if (!name) return acc;

                            acc[name] = el._value

                            return acc;
                        }, {} as Record<string, any>);

                    const event = new CustomEvent('changedata', {
                        composed: true,
                        detail: {
                            value: data,
                        },
                    });

                    root.dispatchEvent(event);                    
                };

                root.addEventListener('input', onInputForm);
                break;
            case 'input':
                root = input;
                const onInput = ({ target }: Event) => {
                    const value = (target as HTMLInputElement).value;
                    this._value = value;
                };

                root.addEventListener('input', onInput);
                break;
         
            default:
                root = form;
                break;
        }

        shadow.appendChild(style);
        shadow.appendChild(root);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(
          `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        );
    }
}

export default FormDataJson;