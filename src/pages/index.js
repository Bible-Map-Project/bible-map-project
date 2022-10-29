import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip, LayersControl, LayerGroup } from 'react-leaflet'
import Search from '../components/Search'
import Map from '../components/Map'
import 'leaflet/dist/leaflet.css'
import '../components/index.css'

const IndexPage = ({ data }) => {
  const [ selected, setSelected ] = useState('')
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
      iconUrl: require("leaflet/dist/images/marker-icon.png").default,
      shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
    })
  }, [])
  if (typeof window === 'undefined') return null
  return (
    <main>
      <MapContainer center={[31.77744415, 35.23494171]} zoom={10}>
        <Map files={data.allFile.nodes} setSelected={setSelected} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Search
          data={data.allFile.nodes.find(n => n.childrenCitiesInGenesisCsv.length).childrenCitiesInGenesisCsv}
          setSelected={setSelected}
        />
      </MapContainer>
      {selected && (
        <aside>
          <b>{selected.name_english}</b> <i>{selected.reference}</i>
          <hr/>
          <div>
            {selected.description_english}
          </div>
        </aside>
      )}
    </main>
  )
}

export const query = graphql`
  query {
    allFile(filter: {extension: {in: ["csv", "geojson"]}}) {
      nodes {
        relativePath
        childrenCitiesInGenesisCsv {
          id
          name_english
          name_arabic
          x
          y
          reference
          description_english
        }
        childrenGeoJson {
          name
          type
          features {
            type
            geometry {
              type
              coordinates
            }
            properties {
              id
              name
              weight
              color
            }
          }
        }
      }
    }
  }
`

export default IndexPage
