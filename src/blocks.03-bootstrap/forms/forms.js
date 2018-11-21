const Instances = [];
const ClassName = {
    BLOCK: 'form',
    INVALID: 'is-invalid',
    NEED_VALIDATION: 'needs-validation',
};
const Events = {
    SUBMIT: 'submit.form',
};
class Form {
    constructor(elem) {
        Instances.push(this);
        // Bind functions;
        this.validation = this.validation.bind(this);
        this.addValidation = this.addValidation.bind(this);

        this.block = elem;
        if (this.block.classList.contains(ClassName.NEED_VALIDATION)) {
            this.addValidation();
        }
    }
    addValidation (event) {
        this.block.addEventListener(Events.SUBMIT, this.validation);
    }
    validation() {
        if (this.block.checkValidity() === false || this.block.getElementsByClassName(className.INVALID).length) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.block.classList.add('was-validated');
    }
    static getAllInstances () {
        return Instances;
    }
    static getAllBlocks () {
        return Array.from(document.getElementsByTagName(ClassName.BLOCK));
    }
    static initAllBlocks () {
        let Instances = Form.getAllInstances();
        let Blocks = Form.getAllBlocks();
        let BlocksInited = Instances.map((ins) => ins.block);
        let BlockNoInited = Blocks.filter((block) => BlocksInited.indexOf(block) < 0);
        BlockNoInited.forEach((item) => new Form(item));
        return Instances;
    }
}
// Инициашизация;
Form.initAllBlocks();

// Экспорт;
window.Block = window.Block ? window.Block : {};
window.Block.Form = Form;
export default Form;
