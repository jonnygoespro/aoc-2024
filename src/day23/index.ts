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

  solveForPartTwo (input: string): number {
    return input.length
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
}

export default new Day23()
