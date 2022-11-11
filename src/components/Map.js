import React, { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.control.layers.tree'
import 'leaflet.control.layers.tree/L.Control.Layers.Tree.css'
import Fuse from 'fuse.js'

const Map = ({ files }) => {
  const map = useMap()
  const [ selected, setSelected ] = useState('')
  const [searchData, setSearchData] = useState([])
  const cities = files.reduce((acc, c) => [
    ...acc,
    ...c.csv || [],
  ], [])
  useEffect(() => {
    const children = Object.values(files.reduce((acc, curr) => {
      const name = curr.relativePath.split('.')[0]
      const [first, second] = name.split('/')
      if (curr.csv) {
        return {
          ...acc,
          [first]: {
            name: curr.relativePath,
            label: first,
            layer: L.featureGroup(curr.csv.map(c => {
              const marker = L.marker([c.y, c.x])
              marker.name_english = c.name_english
              marker.reference = c.reference
              marker.description_english = c.description_english
              marker.priority = c.priority || 12
              marker.bindTooltip(c.name_english, { permanent: true })
              marker.on('click', () => setSelected(c))
              return marker
            })).addTo(map).eachLayer(marker => {
              marker._icon.classList.toggle('none', map.getZoom() < marker.priority)
              marker._shadow.classList.toggle('none', map.getZoom() < marker.priority)
              marker._tooltip._container.classList.toggle('none', map.getZoom() < marker.priority)
            })
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
    map.on('zoomend', () => {
      children.forEach(c => {
        if (c.name) {
          for (const m in c.layer._layers) {
            const marker = c.layer._layers[m]
            marker._icon?.classList.toggle('none', map.getZoom() < marker.priority)
            marker._shadow?.classList.toggle('none', map.getZoom() < marker.priority)
            marker._tooltip?._container.classList.toggle('none', map.getZoom() < marker.priority)
          }
        }
      })
    })
    document.querySelectorAll('.leaflet-control-layers-selector').forEach(e => {
      e.addEventListener('click', () => {
        children.forEach(c => {
          if (c.name) {
            for (const m in c.layer._layers) {
              const marker = c.layer._layers[m]
              marker._icon?.classList.toggle('none', map.getZoom() < marker.priority)
              marker._shadow?.classList.toggle('none', map.getZoom() < marker.priority)
              marker._tooltip?._container.classList.toggle('none', map.getZoom() < marker.priority)
            }
          }
        })
      })
    })
  }, [])
  return (
    <>
      <div className='search'>
        <input
          type="search"
          onChange={(e) => {
            const fuse = new Fuse(cities, { keys: ['name_english', 'description_english', 'reference'] })
            const result = fuse.search(e.target.value)
            setSearchData(result.slice(0, 6).map(i => i.item))
          }}
          placeholder="Search"
        />
        <div className="item-container">
          {searchData.map((c) => (
            <div className="item" onClick={() => {
              map.flyTo([c.y, c.x])
              setSelected(c)
              setSearchData([])
            }} key={c.id}>
              {c.name_english}
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <aside>
          <b>{selected.name_english}</b> <i>{selected.reference}</i>
          <hr/>
          <div>
            {selected.description_english}
          </div>
        </aside>
      )}
    </>
  )
}

export default Map