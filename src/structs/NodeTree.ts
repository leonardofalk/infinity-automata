import { createMachine } from '@xstate/fsm'

export class NodeTree {
  words: string[]
  cache: any = {}
  state: any = {}
  alphabet: string[] = []

  constructor() {
    this.words = []
    this.cache = {}
    this.state = {}
    this.alphabet = []
  }

  isEmpty() {
    return this.words.length === 0
  }

  getWordProps(word: string, stateKey: string = 'q0'): any {
    const [first, rest] = [word.slice(0, 1), word.slice(1).toString()]
    const currentState = this.state[stateKey]

    if (currentState) {
      const nextState = currentState.on[first]

      if (nextState) {
        if (nextState === 'ε') {
          if (rest === '') {
            return { final: true, validated: true, state: stateKey }
          }

          return { final: false, validated: false, state: stateKey }
        }

        if (rest === '') {
          if (currentState.final) {
            return { final: true, validated: true, state: stateKey }
          } else {
            return { final: false, validated: true, state: stateKey }
          }
        } else {
          return this.getWordProps(rest, nextState)
        }
      }
    }

    return { final: false, validated: false, state: stateKey }
  }

  findOrCreateNextKey(letter: string, currentState: number, final: boolean): number {
    if (final) {
      return -1
    }

    if (!this.cache[currentState]) {
      this.cache[currentState] = { letter, nextState: currentState + 1 }

      return this.cache[currentState].nextState
    } else if (this.cache[currentState] && this.cache[currentState].letter === letter) {
      return this.cache[currentState].nextState
    } else {
      return this.findOrCreateNextKey(letter, currentState + 1, final)
    }
  }

  getMachine() {
    return createMachine({
      id: 'main',
      initial: 'q0',
      states: this.getState(),
    })
  }

  addWords(...words: string[]) {
    this.words = words.sort((a, b) => b.length - a.length)

    this.initializeState()
    this.buildState()
  }

  initializeState() {
    this.state = {}
    this.cache = {}
  }

  buildState() {
    this.words.forEach(word => this.buildWordState(0, word.toString().toLowerCase()))
  }

  buildWordState(state: number, word: string) {
    const [first, rest] = [word.slice(0, 1), word.slice(1)]
    const final = rest.toString() === ''
    const nextState = this.findOrCreateNextKey(first, state, final)
    const nextStateKey = `q${nextState}`
    const prevState = this.state[`q${state}`] || { on: {} }

    this.addLetterToAlphabet(first)

    this.state[`q${state}`] = {
      ...prevState,
      on: {
        ...prevState.on,
        [first]: prevState.on[first]
          ? final
            ? [prevState.on[first], 'ε'].join(' | ')
            : nextStateKey
          : final
          ? 'ε'
          : nextStateKey,
      },
      type: final ? 'final' : undefined,
    }

    if (!final) {
      this.buildWordState(nextState, rest)
    }
  }

  getState() {
    return { ...this.state }
  }

  getCache() {
    return this.cache
  }

  addLetterToAlphabet(letter: string) {
    if (!this.alphabet.includes(letter)) {
      this.alphabet = this.alphabet.concat(letter)
    }
  }

  getAlphabet() {
    return this.alphabet.sort()
  }
}
