import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { Button } from 'evergreen-ui'

import twitter from '../../copy/twitterDynamic'

const SocialIcon = ({
  type,
  id
}) => {
  switch(type) {    
    case "Facebook": 
      return (
        <Button 
          is="a" 
          href={`http://www.facebook.com/${id}`}
          target="_blank"
          paddingLeft="5px" 
          paddingRight="5px" 
          marginRight="5px"
        > 
          <FaFacebookF size="2em" />
        </Button>        
      )    
    case "Twitter": 
      return (
        <Button 
          is="a" 
          href={`https://twitter.com/intent/tweet?text=@${id} ${encodeURI(twitter)}`}
          target="_blank"
          paddingLeft="5px" 
          paddingRight="5px" 
          marginRight="5px"
        > 
          <FaTwitter size="2em" />
        </Button>
      )
    default: {
      return null
    }
  }  
}

export default SocialIcon 