import getRefs from './get-refs';


const refs = getRefs();


export default function onAddRemovDataBtn(ev) {
    console.log(ev.target.textContent)
    const elem = ev.target;
    if (elem.classList.contains("btn-add-watched")) {
        dataBtn(elem, "delete watced", "btn-del-watched", "btn-add-watched");
    }
    else if(elem.classList.contains("btn-del-watched")) {
        dataBtn(elem, "add to Watched", "btn-add-watched", "btn-del-watched");
    }
    else if (elem.classList.contains("btn-add-queue")) {
        dataBtn(elem, "delete queue", "btn-del-queue", "btn-add-queue");
    }
    else if(elem.classList.contains("btn-del-queue")) {
        dataBtn(elem, "add to queue", "btn-add-queue", "btn-del-queue");
    }
    
}

function dataBtn(elem, btnText, newCls, oldCls) {
    elem.textContent = btnText;
    elem.classList.replace(oldCls, newCls);
    console.log(elem.textContent)
}