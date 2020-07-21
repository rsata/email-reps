import Row from './Row'
import { Table } from 'evergreen-ui'

const buildOfficeLookup = offices => {
  let map = {}
  offices.forEach(office => {
    office.officialIndices.forEach(i => {
      map[i] = office.name
    }) 
  })
  return map
}

const ContactTable = ({data}) => {
  if (!data) return null;
  const profiles = data.officials
  const officeLookup = buildOfficeLookup(data.offices)

  return (
    <>
      <Table 
        width="75em" 
        margin="auto"
      >
        <Table.Head>
          <Table.TextHeaderCell>
            Name
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Office
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Phone
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Social
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Website
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Email
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height="auto">  
          {profiles.map((profile, i) => {
            profile.office = officeLookup[i]
            return <Row key={profile.name} {...profile} />
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default ContactTable