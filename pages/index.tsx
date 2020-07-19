import { useState } from 'react'
import { TextInputField, Pane, IconButton, majorScale, toaster } from 'evergreen-ui'
import ContactTable from '../components/ContactTable'

const Home = () => {
  const [address, setAddress] = useState('')
  const [isAddressInvalid, setIsAddressInvalid] = useState(false)
  const [lookupResults, setLookupResults] = useState()

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
      let results = await res.json()      
      setLookupResults(results)
    } 
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = e => {
    lookup(address)
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
            <TextInputField 
              onChange={e => setAddress(validate(e.target.value || ''))}
              isInvalid={isAddressInvalid}
              label="Address or Zip Code"
              placeholder="123 Street"
              maxWidth={majorScale(50)}
            />
            <IconButton icon="search" intent="success" onClick={handleSubmit} marginLeft={majorScale(1)}/>
          </Pane>        
          <Pane maxWidth="90%">
            <ContactTable data={lookupResults} />
          </Pane>
      </Pane>        
    </>
  )
}

export default Home