import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip, LayersControl, LayerGroup } from 'react-leaflet'
import Papa from 'papaparse'
import Map from '../components/Map'
import 'leaflet/dist/leaflet.css'
import '../components/index.css'

const IndexPage = ({ data }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
      iconUrl: require("leaflet/dist/images/marker-icon.png").default,
      shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
    })
  }, [])
  if (typeof window === 'undefined') return null
  const files = data.allFile.nodes.map(n => {
    if (n.relativePath.endsWith('.csv')) {
      const { data } = Papa.parse(n.internal.content, { header: true })
      return { ...n, csv: data }
    }
    return n
  })
  return (
    <main>
      <MapContainer center={[31.77744415, 35.23494171]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Map files={files} />
      </MapContainer>
      
    </main>
  )
}

export const query = graphql`
  query {
    allFile(filter: {extension: {in: ["csv", "geojson"]}}) {
      nodes {
        relativePath
        internal {
          content
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
