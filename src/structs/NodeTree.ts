import _ from 'lodash'

export class NodeTree {
  children: NodeTree[]
  letters: string[]
  level: number
  last: boolean

  private _childrenIndex: any

  constructor(options: any = {}) {
    this.level = options.level || 0
    this.last = false
    this.children = []
    this.letters = []
    this._childrenIndex = {}
  }

  insertWord(word: string) {
    if (word === '') {
      this.last = true

      return
    }

    this.letters = _.uniq([...this.letters, word[0]])

    const rest = word.slice(1)
    const index = this._childrenIndex[word[0]]

    if (index) {
      const nextNode = this.children[index]

      nextNode.insertWord(rest)

      this.children[this._childrenIndex[word[0]]] = nextNode
    } else {
      const nextNode = new NodeTree({ level: this.getNextLevel() })

      nextNode.insertWord(rest)

      this._childrenIndex[word[0]] = this.children.push(nextNode) - 1
    }
  }

  getNextLevel(): number {
    return this.level + 1
  }

  buildEdges(): any[] {
    const { letters: label, level: from } = this

    if (!label) {
      return []
    }

    const self = _.map(this.children, ({ level: to }) => ({ label, route: `${from}|${to}` }))
    const children = this.children.flatMap(c => c.buildEdges())

    return [...self, ...children]
  }

  getEdges(): any[] {
    return _.map(_.groupBy(this.buildEdges(), 'route'), (edges, route) => {
      const [from, to] = route.split('|')
      const label = _.join(_.uniq(_.map(edges, 'label')), '|')

      return { from, to, label }
    })
  }

  getNodes(): any[] {
    const { level, last, letters } = this
    const children = this.children.flatMap(c => c.getNodes())

    if (!letters) {
      return []
    }

    return [{ label: `q${level}${last ? '*' : ''}`, id: level, last }, ...children]
  }
}
