import Rete from 'rete'

import axios from 'axios'
import { API_ROOT_URL } from '../../config'
import { MagickComponent } from '../../engine'
import { arraySocket, triggerSocket } from '../../sockets'
import { MagickNode, MagickWorkerInputs, WorkerData } from '../../types'
import _ from 'lodash'
const info = `Join an array of events into a conversation formatted for prompt injection.`


export class EventDelete extends MagickComponent<Promise<void>> {
  constructor() {
    // Name of the component
    super('Event Delete', {
      outputs: {
        conversation: 'output',
        trigger: 'option',
      },
    }, 'Event', info)
  }

  // the builder is used to "assemble" the node component.

  builder(node: MagickNode) {
    // create inputs here. First argument is the name, second is the type (matched to other components sockets), and third is the socket the i/o will use
    const dataInput = new Rete.Input('trigger', 'Trigger', triggerSocket, true)
    const dataOutput = new Rete.Output('trigger', 'Trigger', triggerSocket)
    const inputList = new Rete.Input('events', 'Events', arraySocket)

    return node.addInput(inputList).addInput(dataInput).addOutput(dataOutput)
  }

  // the worker contains the main business logic of the node.  It will pass those results
  // to the outputs to be consumed by any connected components
  async worker(node: WorkerData, inputs: MagickWorkerInputs & { events: unknown[] }) {
    try {
      const events = inputs.events[0];
      //Events.rows when the data is fetched using embedding
      if (Array.isArray(events)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (events.rows) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          events.rows.forEach(async (event) => {
            await axios.delete(`${API_ROOT_URL}/events/${event.id}`)
          });
        }
        //Events when the data is fetched using query
        if (events) events.forEach(async (event) => {
          await axios.delete(`${API_ROOT_URL}/events/${event.id}`)
        });
      } else {
        const id:string|null = _.get(events, 'id', null)
        if(id===null) throw new Error('Event ID not found')
        await axios.delete(`${API_ROOT_URL}/events/${id}`)
      }
    } catch (e) {
      console.log("Error: ", e)
    }
  }
}
