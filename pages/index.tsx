import { useState } from 'react'
import { TextInputField, Pane, IconButton, majorScale, toaster, Spinner, Paragraph, Text, Heading } from 'evergreen-ui'
import ReactMarkdown from 'react-markdown'

import ContactTable from '../components/ContactTable'
import instructions from '../copy/instructions'
import email from '../copy/email'
import twitter from '../copy/twitter'
import facebook from '../copy/facebook'

const Home = () => {
  const [address, setAddress] = useState('')
  const [isAddressInvalid, setIsAddressInvalid] = useState(false)
  const [lookupResults, setLookupResults] = useState()
  const [isLoading, setLoadingState] = useState(false)
  const [displayText, setDisplayText] = useState({twitter: false, facebook: false, email: false})

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
  
  const toggleText = type => {    
    setDisplayText({...displayText, [type]: !displayText[type]})
    window.analytics.track('Button Clicked', {
      section: type,
      changeTo: !displayText[type]
    })
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
          alignItems="left"
          flexDirection="column"
          width="90%"
        >
          <Heading size={600}>Instructions</Heading>
          <Paragraph>
            <ReactMarkdown source={instructions} />          
          </Paragraph> 
          <Heading size={500} display="flex" flexDirection="row" marginTop={majorScale(2)}>Twitter {
            displayText.twitter
            ?  <IconButton icon="chevron-up" marginLeft={majorScale(1)} marginTop="-4px" onClick={() => toggleText('twitter')} />
            :  <IconButton icon="chevron-down" marginLeft={majorScale(1)} marginTop="-4px" onClick={() => toggleText('twitter')} /> 
          }</Heading>
          {displayText.twitter 
            ? <Text><ReactMarkdown source={twitter} /></Text> 
            : null
          }
          <Heading size={500} display="flex" flexDirection="row" marginTop={majorScale(2)}>Facebook {
            displayText.facebook
            ?  <IconButton icon="chevron-up" marginLeft={majorScale(1)} marginTop="-4px" onClick={() => toggleText('facebook')} />
            :  <IconButton icon="chevron-down" marginLeft={majorScale(1)} marginTop="-4px" onClick={() => toggleText('facebook')} /> 
          }</Heading>
          {displayText.facebook 
            ? <Text><ReactMarkdown source={facebook} /></Text> 
            : null
          }
          <Heading size={500} display="flex" flexDirection="row" marginTop={majorScale(2)}>Email {
            displayText.email
            ?  <IconButton icon="chevron-up" marginLeft={majorScale(1)} marginTop="-4px" onClick={() => toggleText('email')} />
            :  <IconButton icon="chevron-down" marginLeft={majorScale(1)} marginTop="-4px" onClick={() => toggleText('email')} /> 
          }</Heading>
          {displayText.email 
            ? <Text><ReactMarkdown source={email} /></Text> 
            : null
          }                    
        </Pane>        
        <Pane 
          display="flex"
          justifyContent="center" 
          alignItems="center" 
          flexDirection="row"
          marginTop={majorScale(4)}
          width="100%"
        >
          <form onSubmit={handleSubmit} style={{width: '86%'}}>
            <TextInputField 
              onChange={e => setAddress(validate(e.target.value || ''))}
              isInvalid={isAddressInvalid}
              label="Address or Zip Code"
              placeholder="123 Street"
            />
          </form>
          <IconButton icon="search" intent="success" onClick={handleSubmit} marginLeft={majorScale(1)}/>
        </Pane>        
        {isLoading 
          ?  <Spinner size={24} />
          : <Pane width="100%" overflowX="scroll"><ContactTable data={lookupResults} /></Pane>
        }        
      </Pane>        
    </>
  )
}

export default Home