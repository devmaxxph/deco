// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type { Event, EventData, EventPatch, EventQuery } from './events.schema'
import { app } from '../../app'

export type EventParams = KnexAdapterParams<EventQuery>

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class EventService<
  ServiceParams extends Params = EventParams
> extends KnexService<Event, EventData, ServiceParams, EventPatch> {

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  async create(data: EventData): Promise<any> {
    return data
  }

  async remove(id: string): Promise<any> {
    const vectordb = app.get('vectordb')
    const r = vectordb.delete(id)
    return r
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async find(params?: ServiceParams) {
    if (params.query.embedding) {
      const blob = atob(params.query.embedding)
      const ary_buf = new ArrayBuffer(blob.length)
      const dv = new DataView(ary_buf)
      for (let i = 0; i < blob.length; i++) dv.setUint8(i, blob.charCodeAt(i))
      const f32_ary = new Float32Array(ary_buf)
      const vectordb = app.get('vectordb')
      const query = f32_ary as unknown as number[]
      const results = vectordb.search(query, params?.query?.$limit)
      if (results) {
        return { events: results }
      }
    }
    const vectordb = app.get('vectordb')
    const { $limit: _, ...param } = params.query
    const r = vectordb.searchData(
      param as unknown as number[],
      params?.query?.$limit
    )
    return { events: r }
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('dbClient'),
    name: 'events',
  }
}
