import { useState } from 'react'
import { Table, Avatar, Text, Pane, Dialog, Paragraph } from 'evergreen-ui'

import SocialIcon from './SocialIcon'
import email from '../../copy/emailDynamic'

const conversion = (e:any):any => {
  window.analytics.track('Link Clicked', e)
}

const Row = ({
  name,
  office,
  photoUrl,
  phones,
  emails, 
  urls,
  channels
}) => {  
  const [isShown, setIsShown] = useState(false)
  return (
    <Pane>
      <Pane>
        <Dialog
          isShown={isShown}
          title={name}
          onCloseComplete={() => setIsShown(false)}
          onConfirm={() => setIsShown(false)}
          onCancel={() => setIsShown(false)}
          confirmLabel="Done"
          hasCancel={false}
        >
          <Paragraph>Office: {office}</Paragraph>
          <Paragraph>
            {phones 
            ? <a onClick={() => conversion({official: name, office: office, type: 'phone', value: phones[0]})} href={`tel:+1 ${phones[0]}`} target="_blank">{phones[0]}</a>
            : null}
          </Paragraph>
          <Paragraph>
            {channels 
            ? channels.map(channel => {
              channel.name = name
              channel.office = office
              return <SocialIcon key={channel.id} {...channel} />
            })
            : null}
          </Paragraph>          
          <Paragraph>
            {urls 
            ? <a onClick={() => conversion({official: name, office: office, type: 'website', value: urls[0]})} href={urls ? urls[0]: null} target="_blank">{urls[0]}</a>
            : null}
          </Paragraph>          
          <Paragraph>
            {emails 
            ? <a onClick={() => conversion({official: name, office: office, type: 'email', value: emails[0]})} href={`mailto:${emails ? emails[0]: null}?subject=Remove Troops from US Cities&body=${encodeURI(email(name))}`} target="_blank">{emails[0]}</a>
            : 'See website for email'}
          </Paragraph>          
        </Dialog>
      </Pane>
      <Table.Row 
        key={name} 
        isSelectable
        onSelect={() => setIsShown(true)}
        >     
        <Table.Cell display="flex" alignItems="center">
          <Avatar name={name} src={photoUrl} />        
          <Text marginLeft={8} size={300} fontWeight={500}>
            {name}
          </Text>
        </Table.Cell>
        <Table.TextCell>
          {office}
        </Table.TextCell>
        <Table.TextCell>{phones 
          ? <a onClick={() => conversion({official: name, office: office, type: 'phone', value: phones[0]})} href={`tel:+1 ${phones[0]}`} target="_blank">{phones[0]}</a>
          : null}
        </Table.TextCell>
        <Table.TextCell>{channels 
          ? channels.map(channel => {
            channel.name = name
            channel.office = office
            return <SocialIcon key={channel.id} {...channel} />
          })
          : null}
        </Table.TextCell>
        <Table.TextCell>{urls 
          ? <a onClick={() => conversion({official: name, office: office, type: 'website', value: urls[0]})} href={urls ? urls[0]: null} target="_blank">{urls[0]}</a>
          : null}
        </Table.TextCell>    
        <Table.TextCell>{emails 
          ? <a onClick={() => conversion({official: name, office: office, type: 'email', value: emails[0]})} href={`mailto:${emails ? emails[0]: null}?subject=Remove Troops from US Cities&body=${encodeURI(email(name))}`} target="_blank">{emails[0]}</a>
          : 'See website for email'}
        </Table.TextCell>                    
      </Table.Row>
    </Pane>
  )
}

export default Row