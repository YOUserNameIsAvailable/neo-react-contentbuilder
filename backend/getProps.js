const { JSDOM } = require('jsdom');

const getProps = async  (html)=>{
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const elements = document.querySelectorAll('[data-component]');
    const customProps={}
    elements.forEach((element , i ) => {
        const componentType = element.getAttribute('data-component')||"type-error";
        customProps[componentType+""+i]={}
        const  editableNodes=  element.querySelectorAll('[data-propsname]');
        editableNodes.forEach((node  )=>{
            const propsName = node.getAttribute('data-propsname')||"propsname-error"
            try{
                const fields = JSON.parse(propsName)
                Object.entries(fields).forEach(field=>{
                    const propsName=field[0]
                    const propSource = field[1]
                    customProps[componentType+""+i][propsName]=node[propSource]
                })
            } catch(e){
                console.log(e)
            }
            // Object.entries()
            // if(componentType&&propsName&&source){
            //     customProps[componentType+""+i][propsName] = node[source]
            // }
        })
    });
    console.log(customProps)
    return customProps
}


module.exports = getProps
