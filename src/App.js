import React, { useState } from 'react'
import Dwolla from 'react-dwolla-iav';
const App = () => {
  const [customerToken, setCustomerteken] = useState('');
  // const [customerTokens, setCustomertekens] = useState();
  const onSuccess = (data) => { /* do stuff with data */
    console.log(data)
  }
  const onError = (err) => { /* handle err */
    console.log(err)
  }

  const dwollaConfig = {
    backButton: true,
    customerToken: customerToken,
    environment: 'sandbox',
    fallbackToMicroDeposits: false,
    microDeposits: true,
    stylesheets: [],
    subscriber: () => { },
  }

  React.useEffect(() => {
    fetch('http://localhost:3000/getiavtoken', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((json) => {
        console.log({ gottoken: json.iavToken });
        setCustomerteken(json.iavToken);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(' this is useeffect component')
  }, []);

  console.log('customertoken-------------',
    customerToken
  )
  return (
    <div className="dwolla-container">
      {
        customerToken !== '' &&
        <Dwolla
          onSuccess={onSuccess}
          onError={onError}
          dwollaConfig={dwollaConfig}
        />
      }
    </div>
  )
}
export default App;