/* eslint-disable no-console */
/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Rete from 'rete'

import { MagickComponent } from '../../engine'
import { anySocket, triggerSocket } from '../../sockets'
import {
  MagickNode,
  MagickWorkerInputs, WorkerData
} from '../../types'

const info =
  'Is Variable true checks if input is true - string or boolean are checked as true or false, numbers are checked as 0 or 1, undifined or null are checked as false'
export class IsVariableTrue extends MagickComponent<void> {
  constructor() {
    super('Is Variable True', {
      outputs: { true: 'option', false: 'option' },
    }, 'Boolean', info)
  }

  builder(node: MagickNode) {
    const inp = new Rete.Input('input', 'Input', anySocket)
    const dataInput = new Rete.Input('trigger', 'Trigger', triggerSocket, true)
    const isTrue = new Rete.Output('true', 'True', triggerSocket)
    const isFalse = new Rete.Output('false', 'False', triggerSocket)

    return node
      .addInput(inp)
      .addInput(dataInput)
      .addOutput(isTrue)
      .addOutput(isFalse)
  }

  async worker(_node: WorkerData, inputs: MagickWorkerInputs) {
    const action = inputs['input'][0]
    const type = typeof action
    let is = false
    if (type === 'string') {
      is = action === 'true'
    } else if (type === 'boolean') {
      is = action === true
    } else if (type === 'number') {
      is = action === 1
    }

    this._task.closed = is ? ['false'] : ['true']
  }
}
