import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.control.layers.tree'
import 'leaflet.control.layers.tree/L.Control.Layers.Tree.css'

const Map = ({ files, setSelected }) => {
  const map = useMap()
  useEffect(() => {
    const children = Object.values(files.reduce((acc, curr) => {
      const name = curr.relativePath.split('.')[0]
      const [first, second] = name.split('/')
      if (curr.childrenCitiesInGenesisCsv.length) {
        return {
          ...acc,
          [first]: {
            label: first,
            layer: L.featureGroup(curr.childrenCitiesInGenesisCsv.map(c => {
              const marker = L.marker([c.y, c.x])
              marker.name_english = c.name_english
              marker.reference = c.reference
              marker.description_english = c.description_english
              marker.bindTooltip(c.name_english, { permanent: true })
              marker.on('click', () => setSelected(c))
              return marker
            })).addTo(map)
          }
        }
      }
      const { features = [] } = curr.childrenGeoJson[0] || {}
      const f = features.map(f => {
        if (f.geometry.type !== 'MultiPolygon') {
          f.geometry.coordinates = f.geometry.coordinates[0]
        }
        return f
      })
      const layer = L.geoJSON(f, {
        style: f => ({
          weight: f.properties.weight || 2,
          color: f.properties.color || 'black',
        })
      }).bindPopup(name)
        .addTo(map)
      return second
        ? { ...acc, [first]: {
          label: first,
          selectAllCheckbox: true,
          children: [ ...acc[first] || [], { label: second, layer } ]
        } }
        : { ...acc, [first]: { label: first, layer } }
    }, {}))
    L.control.layers.tree(undefined, children, {
      collapsed: false,
      openedSymbol: '📂',
      closedSymbol: '📁',
    }).addTo(map)
  }, [])
  return (
    <pre></pre>
  )
}

export default Map