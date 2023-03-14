class ComponentsLoader {
  private static inst: ComponentsLoader = new ComponentsLoader()

  static get() {
    return ComponentsLoader.inst
  }
}

// const editor = useContext(RednerContext)

// const singleton = () => {
//   const obj = new ...
//   return () => {
//     ...
//   }
// }
