import Rete from 'rete'
import { InputsData } from 'rete/types/core/data'

import { DataControl } from '../plugins/inspectorPlugin'
import * as sockets from '../sockets'
import { DataSocketType, InputComponentData } from '../types'

export class InputGeneratorControl extends DataControl {
  socketType: sockets.SocketType
  declare options: {
    dataKey: string
    name: string
    component: string
    icon: string
    data: InputComponentData
  }
  constructor({
    socketType = 'anySocket',
    taskType = 'output',
    ignored = [],
    icon = 'properties',
  }: InputComponentData) {
    const options = {
      dataKey: 'inputs',
      name: 'Data Inputs',
      component: 'inputGenerator',
      icon,
      data: {
        ignored,
        socketType,
        taskType,
      },
    }

    super(options)
    this.socketType = socketType
  }

  onData(inputs: InputsData & DataSocketType[]) {
    if (!inputs) return

    if (this.node === null) return console.error('Node is null')
    this.node.data.inputs = inputs

    const existingInputs: string[] = []
    // const ignored = this?.control?.data?.ignored.map(input => input.name) || []

    this.node.inputs.forEach(out => {
      existingInputs.push(out.key)
    })

    // Any inputs existing on the current node that arent incoming have been deleted
    // and need to be removed.
    existingInputs
      // .filter(existing => !inputs.some(incoming => incoming.name === existing))
      // .filter(existing => ignored.some(input => input !== existing))
      .forEach(key => {
        if (this.node === null) return console.error('Node is null')
        const input = this.node.inputs.get(key)

        this.node
          .getConnections()
          .filter(con => con.input.key === key)
          .forEach(con => {
            if (this.editor === null) return console.error('Editor is null')
            this.editor.removeConnection(con)
          })

        if (input === undefined) return
        this.node.removeInput(input)
      })

    // any incoming inputs not already on the node are new and will be added.
    const newInputs = inputs.filter(
      input => !existingInputs.includes(input.name)
    )

    // From these new inputs, we iterate and add an input socket to the node
    newInputs.forEach(input => {
      const newInput = new Rete.Input(
        input.name,
        input.name,
        sockets[input.socketType]
      )
      if (this.node === null) return console.error('Node is null')
      this.node.addInput(newInput)
    })

    this.node.update()
  }
}
