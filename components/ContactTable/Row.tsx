import SocialIcon from './SocialIcon'
import { Table, Avatar, Text, IconButton } from 'evergreen-ui'

const Row = ({
  name,
  photoUrl,
  phones,
  emails, 
  urls,
  channels
}) => {
  return (
    <Table.Row key={name}>
      <Table.Cell display="flex" alignItems="center">
        <Avatar name={name} src={photoUrl} />        
        <Text marginLeft={8} size={300} fontWeight={500}>
          {name}
        </Text>
      </Table.Cell>
      <Table.TextCell>{phones 
        ? <a href={`tel:+1 ${phones[0]}`} target="_blank">{phones[0]}</a>
        : null}
      </Table.TextCell>
      <Table.TextCell>{emails 
        ? <a href={`mailto:${emails ? emails[0]: null}?subject=Demand for action&body=Do%20something%20better!`} target="_blank">{emails[0]}</a>
        : 'See website for email' }
      </Table.TextCell>
      <Table.TextCell>{urls 
        ? <a href={urls ? urls[0]: null} target="_blank">{urls[0]}</a>
        : null}
      </Table.TextCell>      
      <Table.TextCell>{channels 
        ? channels.map(channel => {
          console.log(channel)
          return <SocialIcon key={channel.id} {...channel} />
        })
        : null}
      </Table.TextCell>      
    </Table.Row>
  )
}

export default Row