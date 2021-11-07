// function withInfo (Com) {
//   return class extends React.Component {
//     state = {
//       info: []
//     };
  
//     componentDidMount () {
//       ;(async () => {
//         const res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());
  
//         this.setState({
//           info: res
//         });
//       })();
//     }

//     render () {
//       return <Com {...this.state}></Com>;
//     }
//   }
// }

// export { withInfo };

const { useState, useEffect } = React;

function useInfo () {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    ;(async () => {
      const res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());

      setInfo(res);
    })();
  }, []);

  return info;
}

export { useInfo };