import { Day } from '../day'

type Graph = {
  nodes: string[]
  edges: Record<string, string[]>
}

class Day23 extends Day {
  constructor () {
    super(23)
  }

  solveForPartOne (input: string): number {
    const graph = this.createGraph(input)
    const triangles = this.findTriangles(graph)
    const filteredTriangles = triangles.filter(triangle => triangle.some(node => node.match(/^t/)))
    return filteredTriangles.length
  }

  solveForPartTwo (input: string): string {
    const graph = this.createGraph(input)
    const largestClique = this.findLargestClique(graph)
    return [...largestClique].sort().join(',')
  }

  createGraph (input: string): Graph {
    const nodes = input.split('\n').map(line => line.split('-')).flat()
    const edges: Record<string, string[]> = {}

    input.split('\n').forEach(line => {
      const [from, to] = line.split('-')

      if (!edges[from]) {
        edges[from] = []
      }

      if (!edges[to]) {
        edges[to] = []
      }

      edges[from].push(to)
      edges[to].push(from)
    })

    return {
      nodes: [...new Set(nodes)],
      edges
    }
  }

  findTriangles (graph: Graph): string[][] {
    const triangles: string[][] = []
    const visited = new Set<string>()

    for (let i = 0; i < graph.nodes.length; i++) {
      for (let j = i + 1; j < graph.nodes.length; j++) {
        for (let k = j + 1; k < graph.nodes.length; k++) {
          const nodeA = graph.nodes[i]
          const nodeB = graph.nodes[j]
          const nodeC = graph.nodes[k]

          const sortedNodes = [nodeA, nodeB, nodeC].sort()
          const uniqueKey = sortedNodes.join('-')

          if (visited.has(uniqueKey)) {
            continue
          }

          if (
            graph.edges[nodeA]?.includes(nodeB) &&
              graph.edges[nodeA]?.includes(nodeC) &&
              graph.edges[nodeB]?.includes(nodeC)
          ) {
            triangles.push(sortedNodes)
            visited.add(uniqueKey)
          }
        }
      }
    }

    return triangles
  }

  bronKerbosch (
    R: Set<string>,
    P: Set<string>,
    X: Set<string>,
    graph: Graph,
    cliques: Set<string>[]
  ): void {
    if (P.size === 0 && X.size === 0) {
      cliques.push(new Set(R))
      return
    }

    const pivot = P.size > 0 ? [...P][0] : undefined
    const neighbors = pivot ? new Set(graph.edges[pivot]) : new Set<string>()

    for (const v of [...P].filter(v => !neighbors.has(v))) {
      const neighborsV = new Set(graph.edges[v])
      this.bronKerbosch(
        new Set([...R, v]),
        new Set([...P].filter(n => neighborsV.has(n))),
        new Set([...X].filter(n => neighborsV.has(n))),
        graph,
        cliques
      )
      P.delete(v)
      X.add(v)
    }
  }

  findLargestClique (graph: Graph): Set<string> {
    const allCliques: Set<string>[] = []
    const R: Set<string> = new Set()
    const P: Set<string> = new Set(graph.nodes)
    const X: Set<string> = new Set()

    this.bronKerbosch(R, P, X, graph, allCliques)

    return allCliques.reduce((largest, clique) =>
      clique.size > largest.size ? clique : largest, new Set()
    )
  }
}

export default new Day23()
