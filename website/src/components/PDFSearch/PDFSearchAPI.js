import { pdfs, searchableKeys } from './data'

const pdfContains = (pdf, query) => {
  for (const key of searchableKeys)
    if (pdf[key].toLowerCase().includes(query)) return true

  return false
}

const comparePDFs = (field, sortOrder = 'asc') => (a, b) => {
  const result = a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
  return sortOrder === 'asc' ? result : result * -1
}

class PDFSearchAPI {
  search = async stateQuery => {
    const {
      queryString: query,
      sortBy,
      sortOrder,
      filters,
      page,
      size
    } = stateQuery
    // Filter fields that don't contain query
    let results = pdfs.filter(pdf => pdfContains(pdf, query.toLowerCase()))
    // Filter pdfs that don't contain the selected tags
    if (filters.length > 0)
      results = results.filter(pdf =>
        filters.every(([_, tag]) => pdf.tags.includes(tag))
      )

    const tag_counts = {}
    for (const pdf of results) {
      for (const tag of pdf['tags']) {
        tag_counts[tag] = tag_counts[tag] ? (tag_counts[tag] += 1) : 1
      }
    }

    const aggregations = {
      tags_aggregation: {
        buckets: []
      }
    }

    for (const tag of Object.keys(tag_counts).sort()) {
      aggregations['tags_aggregation']['buckets'].push({
        key: tag,
        doc_count: tag_counts[tag]
      })
    }

    // Sort pdfs
    results.sort(comparePDFs(sortBy, sortOrder))
    const stateResults = {
      hits: results.slice((page - 1) * size, page * size),
      total: results.length,
      aggregations
    }

    return stateResults
  }
}

export default PDFSearchAPI
