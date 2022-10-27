import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip, LayersControl, LayerGroup } from 'react-leaflet'
import Search from '../components/Search'
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
      <MapContainer center={[31.77744415, 35.23494171]} zoom={10} scrollWheelZoom={false} doubleClickZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl collapsed={false}>
          <LayersControl.Overlay checked name="Cities in Genesis">
            <LayerGroup>
              {data.allCitiesInGenesisCsv.nodes.map(c => (
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
            </LayerGroup>
          </LayersControl.Overlay>
          {data.allGeoJson.nodes.map(g => (
            <LayersControl.Overlay checked name={g.name} key={g.id}>
              <LayerGroup>
                {g.features.map((f, i) => {
                  if (f.geometry.type !== 'MultiPolygon') {
                    f.geometry.coordinates = f.geometry.coordinates[0]
                  }
                  return (
                    <GeoJSON
                      data={f}
                      pathOptions={{
                        weight: f.properties.weight || 1,
                        color: f.properties.color || 'black',
                      }}
                      key={`${g.id}_${i}`}
                    >
                      {f.properties.name && (
                        <Popup>{f.properties.name}</Popup>
                      )}
                    </GeoJSON>
                  )
                })}
              </LayerGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
        <Search data={data.allCitiesInGenesisCsv.nodes} setSelected={setSelected} />
      </MapContainer>
      {selected && (
        <aside>
          <b>{data.allCitiesInGenesisCsv.nodes.find(c => c.id === selected).name_english}</b> <i>{data.allCitiesInGenesisCsv.nodes.find(c => c.id === selected).reference}</i>
          <hr/>
          <div>
            {data.allCitiesInGenesisCsv.nodes.find(c => c.id === selected).description_english}
          </div>
        </aside>
      )}
    </main>
  )
}

export const query = graphql`
  query {
    allCitiesInGenesisCsv {
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
    allGeoJson {
      nodes {
        id
        features {
          geometry {
            type
            coordinates
          }
          type
          properties {
            id
            name
            weight
            color
          }
        }
        name
        type
      }
    }
  }
`

export default IndexPage
