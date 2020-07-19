import Row from './Row'
import { Table } from 'evergreen-ui'

const ContactTable = ({data}) => {
  if (!data) return null;
  return (
    <>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>
            Name
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Phone
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Email
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Website
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Social
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height="auto">  
          {data.map(profile => {
            return <Row {...profile} />
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default ContactTable