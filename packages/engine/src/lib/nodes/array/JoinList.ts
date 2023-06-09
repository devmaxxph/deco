import Rete from 'rete'
import { InputControl } from '../../dataControls/InputControl'
import { MagickComponent } from '../../engine'
import { arraySocket, stringSocket } from '../../sockets'
import { MagickNode, MagickWorkerInputs, WorkerData } from '../../types'

const info = `The Join List component takes in an array, and will join each item in the array together with a seperator, defined in the components input field.`

type WorkerReturn = {
  text: string
}

export class JoinListComponent extends MagickComponent<WorkerReturn> {
  constructor() {
    // Name of the component
    super(
      'Join List',
      {
        outputs: {
          text: 'output',
          trigger: 'option',
        },
      },
      'Array',
      info
    )
  }

  // the builder is used to "assemble" the node component.

  builder(node: MagickNode) {
    // create inputs here. First argument is the name, second is the type (matched to other components sockets), and third is the socket the i/o will use
    const inputList = new Rete.Input('list', 'List', arraySocket)

    const out = new Rete.Output('text', 'String', stringSocket)

    // Handle default value if data is present
    const separator = node.data.separator
      ? (node.data.separator as string)
      : ' '

    // controls are the internals of the node itself
    // This default control sample has a text field.
    const input = new InputControl({
      name: 'Separator',
      dataKey: 'separator',
      defaultValue: separator,
    })
    node.inspector.add(input)

    return node.addOutput(out).addInput(inputList)
  }

  // the worker contains the main business logic of the node.  It will pass those results
  // to the outputs to be consumed by any connected components
  worker(node: WorkerData, inputs: MagickWorkerInputs & { list: [string][] }) {
    return {
      text: inputs.list[0].join(node.data.separator as string),
    }
  }
}
