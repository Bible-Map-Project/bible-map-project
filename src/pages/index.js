import React, { useState } from "react"
import { graphql } from 'gatsby'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../components/index.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
})

const IndexPage = ({ data }) => {
  const [ selected, setSelected ] = useState('')
  return (
    <main>
      <MapContainer center={[31.77744415, 35.23494171]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.allGenesisCitiesCsv.nodes.map(c => (
          <Marker
            position={[c.y, c.x]}
            eventHandlers={{
              click: () => {
                setSelected(c.id)
              }
            }}
            key={c.id}
          >
            <Tooltip permanent direction="top" offset={[-15, -15]}>
              {c.name_english}
            </Tooltip>
          </Marker>
        ))}
        {/* <GeoJSON
          data={data.allGeoJson.nodes[0]}
          onEachFeature={(feature, layer) => {
            layer.bindTooltip(feature.properties['Name__English_'], { permanent: true })
            layer.on({
              click: (e) => {
                setSelected(e.target.feature.properties.Description__English_)
              }
            })
          }}
        /> */}
      </MapContainer>
      {selected && (
        <aside>
          <b>{data.allGenesisCitiesCsv.nodes.find(c => c.id === selected).name_english}</b> <i>{data.allGenesisCitiesCsv.nodes.find(c => c.id === selected).reference}</i>
          <div>
            {data.allGenesisCitiesCsv.nodes.find(c => c.id === selected).description_english}
          </div>
        </aside>
      )}
    </main>
  )
}

export const query = graphql`
  query {
    allGenesisCitiesCsv {
      nodes {
        id
        name_english
        name_arabic
        x
        y
        reference
        description_english
      }
    }
  }
`

export default IndexPage
