class MessageView  extends GenericView {

    // Unnecessary for this case, but elegant
    /* constructor(element) {
        super(element)
    } */
    
    template(model) {
        // alert alert-info is a bootstrap class
        return !!model.text ? `<p class="alert alert-info">${model.text}</p>` : `<p></p>`
    }

}