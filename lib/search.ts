import type { Product } from '@/lib/products'

const tokenize = (value: string): string[] =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .match(/[\p{L}\p{N}]+/gu) ?? []

export function searchProducts(products: Product[], query: string): Product[] {
  const queryTerms = tokenize(query)
  if (queryTerms.length === 0) return products

  const documents = products.map((product) => ({
    product,
    terms: tokenize(
      [product.name, product.category, product.description, product.material].join(' '),
    ),
  }))
  const averageLength =
    documents.reduce((total, document) => total + document.terms.length, 0) /
    Math.max(documents.length, 1)
  const documentCount = documents.length
  const k1 = 1.2
  const b = 0.75

  return documents
    .map((document) => {
      const termFrequencies = new Map<string, number>()
      for (const term of document.terms) {
        termFrequencies.set(term, (termFrequencies.get(term) ?? 0) + 1)
      }

      const score = queryTerms.reduce((total, term) => {
        const termFrequency = termFrequencies.get(term) ?? 0
        if (!termFrequency) return total

        const documentFrequency = documents.reduce(
          (count, candidate) =>
            count + (candidate.terms.includes(term) ? 1 : 0),
          0,
        )
        const inverseDocumentFrequency = Math.log(
          1 + (documentCount - documentFrequency + 0.5) / (documentFrequency + 0.5),
        )
        const lengthNormalization =
          termFrequency +
          k1 * (1 - b + b * (document.terms.length / Math.max(averageLength, 1)))

        return total + inverseDocumentFrequency * ((termFrequency * (k1 + 1)) / lengthNormalization)
      }, 0)

      return { product: document.product, score }
    })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score)
    .map((result) => result.product)
}
