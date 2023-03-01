// class Foo extends Component {
//   constructor() {
//     this.sttate = {}
//   }

//   componentDidMount() {}
//   shouldComponentUpdate() {}

//   render() {
//     return <div></div>
//   }
// }

// function Foo() {
//   return <div></div>
// }

// function Foo() {
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     timer(0, 1000)
//       .subscribe(i => setCount(i))
//   }, [])

//   return <div>{count}</div>
// }

// ------------------

function HomePage() {
  const [productList, load] = useService('product').get()
  const [ads, loadAds] = useService('ads').get()
  const [suppestions, loadSuggs] = useService('suggestion').get()

  return <>
    <TitleBar />
    <ProductList list={productList} loadFN={load} />
    <Ads ads={ads} />
    <Suggestions list={suppestions} />
    <FootBar />
  </>
}