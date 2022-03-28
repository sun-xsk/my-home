class newsdiv extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });

        let news = document.querySelector('#news');
        let contents = news.content.cloneNode(true);

        let father = document.querySelector('news-div')
        let age = father.getAttribute('age');
        let span = document.createElement('span');
        span.innerText = age;

        let style = document.createElement('style');
        style.textContent = `
            .father{
                width:200px;
                height:60px;
                background-color: skyblue;
                display:flex;
                flex-direction: column;
                margin-top: 10px;
            }
            
            .author{
                color:gray;
                font-size:16px;
            }

            .text{
                color:red;
                font-size:20px;
            }
        `
        shadow.appendChild(style);
        shadow.appendChild(contents);
        shadow.appendChild(span)

    }
}
customElements.define('news-div', newsdiv);



