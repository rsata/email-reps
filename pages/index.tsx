import { useState } from 'react'
import { TextInputField, Pane, IconButton, majorScale, toaster, Spinner } from 'evergreen-ui'
import ContactTable from '../components/ContactTable'

const Home = () => {
  const [address, setAddress] = useState('')
  const [isAddressInvalid, setIsAddressInvalid] = useState(false)
  const [lookupResults, setLookupResults] = useState()
  const [isLoading, setLoadingState] = useState(false)

  const validate = (address: string | undefined): string => {
    if (address.length < 5) {
      setIsAddressInvalid(true)
    } else {
      setIsAddressInvalid(false)      
    }    
    return address
  }

  const lookup = async (address: string) => {
    try {
      let res = await fetch('/api/lookup', {
        method: 'post',
        body: address
      })
      if (res.status === 200) {
        let results = await res.json()      
        setLookupResults(results)
        setLoadingState(false)
        window.analytics.track('Lookup Successful')
      } else {
        let error = await res.json()
        toaster.danger(error.message)
      }
    } 
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = e => {
    lookup(address)
    setLoadingState(true)
    e.preventDefault()
  }

  return (
    <>
      <Pane
        display="flex"
        alignItems="center" 
        flexDirection="column"
        width="100%"
      >

        <Pane 
          display="flex"
          justifyContent="center" 
          alignItems="center" 
          flexDirection="row"
          marginTop={majorScale(5)}
        >
          <form onSubmit={handleSubmit}>
            <TextInputField 
              onChange={e => setAddress(validate(e.target.value || ''))}
              isInvalid={isAddressInvalid}
              label="Address or Zip Code"
              placeholder="123 Street"
              width="70vw"
            />
          </form>
          <IconButton icon="search" intent="success" onClick={handleSubmit} marginLeft={majorScale(1)}/>
        </Pane>        
        {isLoading 
          ?  <Spinner size={24} />
          : <Pane width="90vw"><ContactTable data={lookupResults} /></Pane>
        }          
      </Pane>        
    </>
  )
}

export default Home