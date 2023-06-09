/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import Rete from 'rete'

import {
  MagickNode,
  MagickWorkerInputs,
  TaskOptions,
  stringSocket,
  triggerSocket,
  MagickComponent,
  API_ROOT_URL,
  WorkerData,
} from '@magickml/engine'
// import { queryGoogleSearch } from '../../functions/queryGoogle'

const info = `When the alert component is triggered, it will fire an alert with the message in the input box.`

type WorkerReturn = {
  summary: string,
  links: string[]
}

export class SearchGoogle extends MagickComponent<Promise<WorkerReturn>> {
  constructor() {
    // Name of the component
    super('Search Google', {
      outputs: {
        summary: 'output',
        links: 'output',
        trigger: 'option',
      },
    }, 'Search', info)
  }
  // the builder is used to "assemble" the node component.

  builder(node: MagickNode): MagickNode {
    // create inputs here. First argument is the name, second is the type (matched to other components sockets), and third is the socket the i/o will use
    const query = new Rete.Input('query', 'Query', stringSocket)
    const triggerIn = new Rete.Input('trigger', 'Trigger', triggerSocket, true)
    const triggerOut = new Rete.Output('trigger', 'Trigger', triggerSocket)
    const summary = new Rete.Output('summary', 'Summary', stringSocket)
    const links = new Rete.Output('links', 'Links', stringSocket)

    return node
      .addInput(triggerIn)
      .addInput(query)
      .addOutput(triggerOut)
      .addOutput(summary)
      .addOutput(links)
  }

  // the worker contains the main business logic of the node.  It will pass those results
  // to the outputs to be consumed by any connected components
  async worker(
    _node: WorkerData,
    inputs: MagickWorkerInputs,
  ) {
    const url = `${API_ROOT_URL}/google-search?query=${inputs.query[0]}`

    // write a fetch post to SERVER_URL/query_google with the parameter query in the body
    const response = await fetch(url)

    const json = await response.json()

    console.log('json', json)

    const { summary, links } = json

    return {
      summary,
      links,
    }
  }
}
