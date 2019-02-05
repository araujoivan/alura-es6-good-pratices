class Bind {

    // contructors can return any type of data
    // ... rest parameter similar to args in java
    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(model, props, (model) => view.update(model))

        view.update(model)

        return proxy

    }
}